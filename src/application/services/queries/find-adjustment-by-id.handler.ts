import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { FindAdjustmentByIdQuery } from "./dtos/find-adjustment-by-id.query";
import { IAdjustmentRepository } from "../../../infrastructure/repositories/interfaces/adjustment-repository.interface";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

@QueryHandler(FindAdjustmentByIdQuery)
export class FindAdjustmentByIdHandler
  implements IQueryHandler<FindAdjustmentByIdQuery, FindAdjustmentByIdResult>
{
  constructor(
    @Inject("AdjustmentRepository")
    private readonly adjustmentRepository: IAdjustmentRepository,
  ) {}

  async execute(
    query: FindAdjustmentByIdQuery,
  ): Promise<FindAdjustmentByIdResult> {
    const adjustment = await this.adjustmentRepository.findById(
      new Uuid(query.id),
    );

    if (!adjustment) {
      throw new NotFoundException("Adjustment not found");
    }

    return {
      id: adjustment.id,
      clientId: adjustment.clientId,
      valueInCents: adjustment.valueInCents,
      reason: adjustment.reason,
      attachment: adjustment.attachment,
    };
  }
}

interface FindAdjustmentByIdResult {
  id: string;
  clientId: string;
  valueInCents: number;
  reason: string;
  attachment: string | null;
}
