import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateTransferCommand } from "./dtos/create-transfer.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

const TRANSFER_DESCRIPTION = "Transferência para conta bancária";
const TRANSFER_STATEMENT_DESCRIPTOR = "Transferência";

@CommandHandler(CreateTransferCommand)
export class CreateTransferHandler implements ICommandHandler<
  CreateTransferCommand,
  { transferId: number; amountInCents: number; bankAccountId: number }
> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: CreateTransferCommand) {
    const { storeId, amountInCents } = command;

    const store = await this.storeRepository.findById(storeId);

    if (!store) {
      throw new Error("Store not found");
    }

    if (!store.paymentData?.ioSellerId) {
      throw new Error("Store has no payment gateway account");
    }

    const bankAccount =
      await this.storeRepository.findBankAccountByStoreId(storeId);

    if (!bankAccount) {
      throw new Error("Bank account not found");
    }

    const authResponse = await this.paymentGateway.getAuthToken();
    const authToken: string = authResponse.data.access_token;

    const gatewayResult = await this.paymentGateway.createTransferToBankAccount(
      {
        amount: amountInCents,
        description: TRANSFER_DESCRIPTION,
        statement_descriptor: TRANSFER_STATEMENT_DESCRIPTOR,
      },
      store.paymentData.ioSellerId,
      bankAccount.getId().getValue(),
      authToken,
    );

    return await this.storeRepository.createTransfer(
      bankAccount.getId().getValue(),
      gatewayResult.amount,
      storeId,
      TRANSFER_DESCRIPTION,
      TRANSFER_STATEMENT_DESCRIPTOR,
    );
  }
}
