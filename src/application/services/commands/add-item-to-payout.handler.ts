import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { AddItemToPayoutCommand } from "./dtos/add-item-to-payout.command";
import { IPayoutRepository } from "../../../infrastructure/repositories/interfaces/payout-repository.interface";
import { PayoutItem } from "../../../domain/payout/payout-item.entity";
import { Money } from "../../../domain/@shared/value-objects/money.value";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

@CommandHandler(AddItemToPayoutCommand)
export class AddItemToPayoutHandler
  implements ICommandHandler<AddItemToPayoutCommand>
{
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
  ) {}

  async execute(command: AddItemToPayoutCommand): Promise<{ id: string }> {
    const payout = await this.payoutRepository.findById(new Uuid(command.id));

    if (!payout) {
      throw new NotFoundException("Payout not found");
    }

    const payoutItem = PayoutItem.create(
      payout.id,
      new Money(command.amountInCents),
      new Uuid(command.consumptionId),
    );

    payout.addItem(payoutItem);
    await this.payoutRepository.update(payout);

    return {
      id: payout.id.getValue(),
    };
  }
}
