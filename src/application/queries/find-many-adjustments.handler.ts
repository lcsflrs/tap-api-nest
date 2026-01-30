import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindManyAdjustmentsQuery } from "./dtos/find-many-adjustments.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(FindManyAdjustmentsQuery)
export class FindManyAdjustmentsHandler implements IQueryHandler<FindManyAdjustmentsQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(
    query: FindManyAdjustmentsQuery,
  ): Promise<FindManyAdjustmentsResult> {
    const { page, limit } = query;
    const take = Math.max(limit, 1);
    const skip = (Math.max(page, 1) - 1) * take;

    const [adjustments, total] = await Promise.all([
      this.prisma.adjustment.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      this.prisma.adjustment.count(),
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      adjustments,
      totalPages,
      total,
    };
  }
}

interface AdjustmentType {
  id: string;
  valueInCents: number;
  reason: string;
  type: string;
  attachment: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface FindManyAdjustmentsResult {
  adjustments: AdjustmentType[];
  totalPages: number;
  total: number;
}
