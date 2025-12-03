import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { MarkPayoutPaidCommand } from "./dtos/mark-payout-paid.command";
import { IPayoutRepository } from "../../../infrastructure/repositories/interfaces/payout-repository.interface";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

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

    payout.markAsPaid(command.proofFileUrl);
    await this.payoutRepository.update(payout);

    return { id: payout.id.getValue() };
  }
}
