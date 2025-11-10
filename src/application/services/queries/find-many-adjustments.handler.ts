import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindManyAdjustmentsQuery } from "./dtos/find-many-adjustments.query";
import { IAdjustmentRepository } from "../../../infrastructure/repositories/interfaces/adjustment-repository.interface";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

@QueryHandler(FindManyAdjustmentsQuery)
export class FindManyAdjustmentsHandler
  implements IQueryHandler<FindManyAdjustmentsQuery, FindManyAdjustmentsResult>
{
  constructor(
    @Inject("AdjustmentRepository")
    private readonly adjustmentRepository: IAdjustmentRepository,
  ) {}

  async execute(query: FindManyAdjustmentsQuery) {
    const { page, limit } = query;
    const clientId = query.clientId ? new Uuid(query.clientId) : undefined;

    return await this.adjustmentRepository.findMany(page, limit, clientId);
  }
}

interface FindManyAdjustmentsResult {
  adjustments: Adjustment[];
}

interface Adjustment {
  id: string;
  clientId: string;
  valueInCents: number;
  reason: string;
  attachment: string | null;
}
