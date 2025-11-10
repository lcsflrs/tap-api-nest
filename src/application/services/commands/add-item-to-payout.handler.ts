import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { AddItemToPayoutCommand } from "./dtos/add-item-to-payout.command";
import { IPayoutRepository } from "../../../infrastructure/repositories/interfaces/payout-repository.interface";
import { PayoutItem } from "../../../domain/payout/payout-item.entity";
import { Money } from "../../../domain/@shared/value-objects/money.value";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";
import { PayoutMapper } from "../@shared/payout.mapper";

@CommandHandler(AddItemToPayoutCommand)
export class AddItemToPayoutHandler
  implements ICommandHandler<AddItemToPayoutCommand, { id: string }>
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

    const payoutEntity = PayoutMapper.toDomain(payout);

    const payoutItem = PayoutItem.create(
      new Uuid(payout.id),
      new Money(command.amountInCents),
      new Uuid(command.consumptionId),
    );

    payoutEntity.addItem(payoutItem);

    await this.payoutRepository.update(payoutEntity);

    return {
      id: payoutEntity.id.getValue(),
    };
  }
}
