import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreatePayoutCommand } from "./dtos/create-payout.command";
import { IPayoutRepository } from "../../../infrastructure/repositories/interfaces/payout-repository.interface";
import { Payout } from "../../../domain/payout/payout.aggregate";
import { PayoutItem } from "../../../domain/payout/payout-item.entity";
import { Money } from "../../../domain/@shared/value-objects/money.value";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

@CommandHandler(CreatePayoutCommand)
export class CreatePayoutHandler
  implements ICommandHandler<CreatePayoutCommand, { id: string }>
{
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
  ) {}

  async execute(command: CreatePayoutCommand): Promise<{ id: string }> {
    const gross = command.items.reduce(
      (total, item) => total + item.amountInCents,
      0,
    );

    const payout = Payout.create(new Uuid(command.clientId), new Money(gross));

    command.items.forEach((item) => {
      const payoutItem = PayoutItem.create(
        payout.id,
        new Money(item.amountInCents),
        new Uuid(item.consumptionId),
      );

      payout.addItem(payoutItem);
    });

    await this.payoutRepository.save(payout);

    return {
      id: payout.getId().getValue(),
    };
  }
}
