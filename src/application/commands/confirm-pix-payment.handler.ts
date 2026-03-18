import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { ConfirmPixPaymentCommand } from "./dtos/confirm-pix-payment.command";
import { AddBalanceCommand } from "./dtos/add-balance.command";
import { AddIngressCommand } from "./dtos/add-ingress.command";
import { NotifyStoreWebhookCommand } from "./dtos/notify-store-webhook.command";
import type { IPixTransactionRepository } from "@infrastructure/repositories/interfaces/pix-transaction-repository.interface";

@CommandHandler(ConfirmPixPaymentCommand)
export class ConfirmPixPaymentHandler implements ICommandHandler<ConfirmPixPaymentCommand> {
  constructor(
    @Inject("PixTransactionRepository")
    private readonly pixTransactionRepository: IPixTransactionRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: ConfirmPixPaymentCommand): Promise<void> {
    const { transactionId, referenceId, signConfirm, ioSellerId } = command;

    const pix =
      await this.pixTransactionRepository.findByReferenceId(referenceId);

    if (!pix) {
      throw new Error("Pix transaction not found");
    }

    if (pix.customerId) {
      if (pix.pixType?.isAddBalance()) {
        await this.commandBus.execute(
          new AddBalanceCommand(
            pix.customerId,
            pix.amount.getValue(),
            transactionId,
            referenceId,
          ),
        );

        pix.markAsPaid();
        await this.pixTransactionRepository.save(pix);

        return;
      }

      if (pix.pixType?.isBuyTicket()) {
        const [partyId] = pix.referenceId.split("-").map(Number);

        if (!partyId) {
          throw new Error("Could not extract partyId from referenceId");
        }

        await this.commandBus.execute(
          new AddIngressCommand(pix.customerId, partyId, transactionId),
        );

        pix.markAsPaid();
        await this.pixTransactionRepository.save(pix);

        return;
      }

      throw new Error("Pix type not supported");
    }

    await this.commandBus.execute(
      new NotifyStoreWebhookCommand(
        transactionId,
        referenceId,
        signConfirm,
        ioSellerId,
        pix.amount.getValue(),
        pix.storeId!,
      ),
    );
  }
}
