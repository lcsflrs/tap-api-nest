import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { MarkPayoutPaidCommand } from "./dtos/mark-payout-paid.command";
import { IPayoutRepository } from "../../../infrastructure/repositories/interfaces/payout-repository.interface";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";
import { PayoutMapper } from "../@shared/payout.mapper";

@CommandHandler(MarkPayoutPaidCommand)
export class MarkPayoutPaidHandler
  implements ICommandHandler<MarkPayoutPaidCommand, { id: string }>
{
  constructor(
    @Inject("PayoutRepository")
    private readonly payoutRepository: IPayoutRepository,
  ) {}

  async execute(command: MarkPayoutPaidCommand): Promise<{ id: string }> {
    const payout = await this.payoutRepository.findById(new Uuid(command.id));

    if (!payout) {
      throw new NotFoundException("Payout not found");
    }

    const payoutEntity = PayoutMapper.toDomain(payout);
    await this.payoutRepository.update(payoutEntity);

    return { id: payoutEntity.id.getValue() };
  }
}
