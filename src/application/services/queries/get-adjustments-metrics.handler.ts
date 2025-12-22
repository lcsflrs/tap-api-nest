import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { GetAdjustmentsMetricsQuery } from "./dtos/get-adjustments-metrics.query";

@QueryHandler(GetAdjustmentsMetricsQuery)
export class GetAdjustmentsMetricsHandler
  implements IQueryHandler<GetAdjustmentsMetricsQuery>
{
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(
    _: GetAdjustmentsMetricsQuery,
  ): Promise<AdjustmentsMetricsResult> {
    const [totalAdjustmentsCount, sumsByType] = await Promise.all([
      this.prisma.adjustment.count(),
      this.prisma.adjustment.groupBy({
        by: ["type"],
        _sum: { valueInCents: true },
      }),
    ]);

    const totalCreditsInCents =
      sumsByType.find((adjustment) => adjustment.type === "CREDIT")?._sum
        .valueInCents ?? 0;

    const totalDebitsInCents =
      sumsByType.find((adjustment) => adjustment.type === "DEBIT")?._sum
        .valueInCents ?? 0;

    return {
      totalAdjustmentsCount,
      totalCreditsInCents,
      totalDebitsInCents,
    };
  }
}

interface AdjustmentsMetricsResult {
  totalAdjustmentsCount: number;
  totalCreditsInCents: number;
  totalDebitsInCents: number;
}
