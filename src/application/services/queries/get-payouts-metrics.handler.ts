import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { GetPayoutsMetricsQuery } from "./dtos/get-payouts-metrics.query";

@QueryHandler(GetPayoutsMetricsQuery)
export class GetPayoutsMetricsHandler
  implements IQueryHandler<GetPayoutsMetricsQuery>
{
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(_: GetPayoutsMetricsQuery): Promise<PayoutsMetricsResult> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [byStatus, dueToday] = await Promise.all([
      this.prisma.payout.groupBy({
        by: ["status"],
        where: { status: { in: ["PENDING", "PAID"] } },
        _sum: { netInCents: true, feeInCents: true },
        _count: { _all: true },
      }),
      this.prisma.payout.aggregate({
        where: {
          status: "PENDING",
          payoutDate: { gte: today },
        },
        _sum: { netInCents: true },
        _count: { _all: true },
      }),
    ]);

    const map = new Map(
      byStatus.map((row) => [
        row.status,
        {
          netSum: row._sum.netInCents ?? 0,
          feeSum: row._sum.feeInCents ?? 0,
          count: row._count._all,
        },
      ]),
    );

    const pending = map.get("PENDING") ?? { netSum: 0, feeSum: 0, count: 0 };
    const paid = map.get("PAID") ?? { netSum: 0, feeSum: 0, count: 0 };

    return {
      totalDueTodayInCents: dueToday._sum.netInCents ?? 0,
      totalDueTodayCount: dueToday._count._all,
      totalPendingInCents: pending.netSum,
      totalPendingCount: pending.count,
      totalPaidInCents: paid.netSum,
      totalPaidCount: paid.count,
      totalFeeInCents: pending.feeSum + paid.feeSum,
    };
  }
}

interface PayoutsMetricsResult {
  totalDueTodayInCents: number;
  totalDueTodayCount: number;
  totalPendingInCents: number;
  totalPendingCount: number;
  totalPaidInCents: number;
  totalPaidCount: number;
  totalFeeInCents: number;
}
