import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateAdjustmentCommand } from "./dtos/create-adjustment.command";
import { IAdjustmentRepository } from "../../../infrastructure/repositories/interfaces/adjustment-repository.interface";
import { Adjustment } from "../../../domain/adjustment/adjustment.aggregate";
import { Money } from "../../../domain/@shared/value-objects/money.value";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

@CommandHandler(CreateAdjustmentCommand)
export class CreateAdjustmentHandler
  implements ICommandHandler<CreateAdjustmentCommand>
{
  constructor(
    @Inject("AdjustmentRepository")
    private readonly adjustmentRepository: IAdjustmentRepository,
  ) {}

  async execute(command: CreateAdjustmentCommand): Promise<{ id: string }> {
    const adjustment = Adjustment.create(
      new Uuid(command.clientId),
      new Money(command.valueInCents),
      command.reason,
      command.attachment,
    );

    await this.adjustmentRepository.save(adjustment);

    return {
      id: adjustment.getId().getValue(),
    };
  }
}
