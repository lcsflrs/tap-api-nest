import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindManyAdjustmentsQuery } from "./dtos/find-many-adjustments.query";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@QueryHandler(FindManyAdjustmentsQuery)
export class FindManyAdjustmentsHandler
  implements IQueryHandler<FindManyAdjustmentsQuery>
{
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(
    query: FindManyAdjustmentsQuery,
  ): Promise<FindManyAdjustmentsResult> {
    const { page, limit, clientId } = query;
    const take = Math.max(limit, 1);
    const skip = (Math.max(page, 1) - 1) * take;

    const where = clientId ? { clientId: clientId } : undefined;

    const [adjustments, total] = await Promise.all([
      this.prisma.adjustment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      this.prisma.adjustment.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      adjustments,
      totalPages,
    };
  }
}

interface AdjustmentType {
  clientId: string;
  id: string;
  valueInCents: number;
  reason: string;
  attachment: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface FindManyAdjustmentsResult {
  adjustments: AdjustmentType[];
  totalPages: number;
}
