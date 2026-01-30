import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreatePayoutCommand } from "./dtos/create-payout.command";
import { IPayoutRepository } from "@infrastructure/repositories/interfaces/payout-repository.interface";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import { Payout } from "@domain/payout/payout.aggregate";
import { PayoutItem } from "@domain/payout/payout-item.entity";
import { Money } from "@domain/@shared/value-objects/money.value";

@CommandHandler(CreatePayoutCommand)
export class CreatePayoutHandler implements ICommandHandler<CreatePayoutCommand> {
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
    private readonly prisma: PrismaService,
  ) {}

  async execute(command: CreatePayoutCommand): Promise<{ id: string }> {
    const sales = await this.prisma.store_sales.findMany({
      where: {
        id: { in: command.storeSaleIds },
        store_id: command.storeId,
        payment_method_id: 4,
        status: "paid",
        payout_items: null,
      },
      select: {
        id: true,
        order_id: true,
        total_in_cents: true,
      },
    });

    const payout = Payout.create(
      command.storeId,
      command.storeName,
      command.proofFileUrl,
    );

    const items = sales.map((sale) =>
      PayoutItem.create(
        payout.id,
        sale.id,
        sale.order_id,
        Money.create(sale.total_in_cents),
      ),
    );

    payout.addItems(items);

    await this.payoutRepository.save(payout);

    return {
      id: payout.id.getValue(),
    };
  }
}
