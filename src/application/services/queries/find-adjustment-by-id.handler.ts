import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject, NotFoundException } from "@nestjs/common";
import { FindAdjustmentByIdQuery } from "./dtos/find-adjustment-by-id.query";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@QueryHandler(FindAdjustmentByIdQuery)
export class FindAdjustmentByIdHandler
  implements IQueryHandler<FindAdjustmentByIdQuery, FindAdjustmentByIdResult>
{
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(
    query: FindAdjustmentByIdQuery,
  ): Promise<FindAdjustmentByIdResult> {
    const adjustment = await this.prisma.adjustment.findUnique({
      where: { id: query.id },
    });

    if (!adjustment) {
      throw new NotFoundException("Adjustment not found");
    }

    return adjustment;
  }
}

interface FindAdjustmentByIdResult {
  id: string;
  clientId: string;
  valueInCents: number;
  reason: string;
  attachment: string | null;
}
