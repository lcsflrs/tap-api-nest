import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { BadRequestException, Inject } from "@nestjs/common";
import { CreatePayoutCommand } from "./dtos/create-payout.command";
import type { IPayoutRepository } from "@infrastructure/repositories/interfaces/payout-repository.interface";
import type { IStoreSaleRepository } from "@infrastructure/repositories/interfaces/store-sale-repository.interface";
import { Payout } from "@domain/payout/payout.aggregate";
import { PayoutItem } from "@domain/payout/payout-item.entity";
import { Money } from "@domain/@shared/value-objects/money.value";

@CommandHandler(CreatePayoutCommand)
export class CreatePayoutHandler implements ICommandHandler<CreatePayoutCommand> {
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
    @Inject("StoreSaleRepository")
    private readonly storeSaleRepository: IStoreSaleRepository,
  ) {}

  async execute(command: CreatePayoutCommand): Promise<{ id: string }> {
    const result = await this.storeSaleRepository.findSalesForPayout(
      command.shopId,
      command.storeSaleIds,
      command.date,
    );

    if (result.sales.length === 0) {
      throw new BadRequestException(
        "Nenhuma venda elegível encontrada para o payout",
      );
    }

    const payout = Payout.create(
      result.storeId,
      result.shopName,
      command.proofFileUrl,
    );

    const items = result.sales.map((sale) =>
      PayoutItem.create(
        payout.id,
        sale.id,
        sale.orderId,
        Money.create(sale.totalInCents),
      ),
    );

    payout.addItems(items);

    await this.payoutRepository.save(payout);

    return { id: payout.id.getValue() };
  }
}
