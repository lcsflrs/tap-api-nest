import { Injectable, Inject } from "@nestjs/common";
import type { IAdjustmentRepository } from "../repositories/interfaces/adjustment-repository.interface";
import type {
  CreateAdjustmentInput,
  CreateAdjustmentOutput,
  FindAdjustmentByIdInput,
  FindAdjustmentByIdOutput,
  FindManyAdjustmentsInput,
  FindManyAdjustmentOutput,
} from "../dtos/adjustment-dtos";
import { Adjustment } from "../../domain/adjustment/adjustment.aggregate";
import { Money } from "../../domain/@shared/value-objects/money.value";
import { Uuid } from "../../domain/@shared/interfaces/uuid";

@Injectable()
export class AdjustmentService {
  constructor(
    @Inject("AdjustmentRepository")
    private readonly adjustmentRepository: IAdjustmentRepository,
  ) {}

  async createAdjustment(
    input: CreateAdjustmentInput,
  ): Promise<CreateAdjustmentOutput> {
    const adjustment = Adjustment.create(
      new Uuid(input.clientId),
      new Money(input.valueInCents),
      input.reason,
      input.attachment,
    );

    await this.adjustmentRepository.save(adjustment);

    return {
      id: adjustment.getId().getValue(),
    };
  }

  async findAdjustmentById(
    input: FindAdjustmentByIdInput,
  ): Promise<FindAdjustmentByIdOutput> {
    const adjustment = await this.adjustmentRepository.findById(
      new Uuid(input.id),
    );

    if (!adjustment) {
      throw new Error("Adjustment not found");
    }

    return {
      id: adjustment.getId().getValue(),
      clientId: adjustment.clientId.getValue(),
      valueInCents: adjustment.valueInCents.getValue(),
      reason: adjustment.reason,
      attachment: adjustment.attachment,
    };
  }

  async findManyAdjustments(
    input: FindManyAdjustmentsInput,
  ): Promise<FindManyAdjustmentOutput> {
    const clientId = input.clientId ? new Uuid(input.clientId) : undefined;
    const adjustments = await this.adjustmentRepository.findMany(clientId);

    return {
      adjustments: adjustments.map((adjustment) => ({
        id: adjustment.getId().getValue(),
        clientId: adjustment.clientId.getValue(),
        valueInCents: adjustment.valueInCents.getValue(),
        reason: adjustment.reason,
        attachment: adjustment.attachment,
      })),
    };
  }
}
