import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { RefundSaleCommand } from "./dtos/refund-sale.command";
import type { IStoreSaleRepository } from "@infrastructure/repositories/interfaces/store-sale-repository.interface";
import { RefundTransactionCommand } from "@infrastructure/third-party/iopay/commands/dtos/refund-transaction.command";

@CommandHandler(RefundSaleCommand)
export class RefundSaleHandler implements ICommandHandler<
  RefundSaleCommand,
  void
> {
  constructor(
    @Inject("StoreSaleRepository")
    private readonly storeSaleRepository: IStoreSaleRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: RefundSaleCommand): Promise<void> {
    const sale = await this.storeSaleRepository.findById(command.saleId);

    if (!sale) {
      throw new Error("Sale not found");
    }

    if (!sale.transactionId) {
      throw new Error("Sale has no transaction id");
    }

    await this.commandBus.execute(
      new RefundTransactionCommand(
        sale.transactionId,
        sale.totalInCents.getValue(),
      ),
    );

    sale.refund();

    await this.storeSaleRepository.update(sale);
  }
}
