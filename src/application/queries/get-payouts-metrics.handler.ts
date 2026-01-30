import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPayoutsMetricsQuery } from "./dtos/get-payouts-metrics.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetPayoutsMetricsQuery)
export class GetPayoutsMetricsHandler implements IQueryHandler<GetPayoutsMetricsQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(_: GetPayoutsMetricsQuery): Promise<PayoutsMetricsResult> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [paidMetrics, paidToday, pendingSales] = await Promise.all([
      this.prisma.payout.aggregate({
        where: { status: "PAID" },
        _sum: { netInCents: true, feeInCents: true },
        _count: { _all: true },
      }),

      this.prisma.payout.aggregate({
        where: {
          status: "PAID",
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
        _sum: { netInCents: true },
        _count: { _all: true },
      }),

      this.prisma.$queryRaw<
        Array<{ total_in_cents: bigint; fee_in_cents: bigint; count: bigint }>
      >`
        SELECT
          SUM(ss.total_in_cents) as total_in_cents,
          SUM(FLOOR(ss.total_in_cents * 0.03)) as fee_in_cents,
          COUNT(*) as count
        FROM store_sales ss
        LEFT JOIN payout_items pi ON ss.id = pi.store_sale_id
        WHERE pi.id IS NULL
          AND ss.status = 'paid'
      `,
    ]);

    const pending = pendingSales[0] || {
      total_in_cents: BigInt(0),
      fee_in_cents: BigInt(0),
      count: BigInt(0),
    };

    const pendingNetInCents =
      Number(pending.total_in_cents) - Number(pending.fee_in_cents);
    const pendingFeeInCents = Number(pending.fee_in_cents);

    return {
      totalPaidTodayInCents: paidToday._sum.netInCents ?? 0,
      totalPaidTodayCount: paidToday._count._all,
      totalPendingInCents: pendingNetInCents,
      totalPendingCount: Number(pending.count),
      totalPaidInCents: paidMetrics._sum.netInCents ?? 0,
      totalPaidCount: paidMetrics._count._all,
      totalFeeInCents: (paidMetrics._sum.feeInCents ?? 0) + pendingFeeInCents,
    };
  }
}

interface PayoutsMetricsResult {
  totalPaidTodayInCents: number;
  totalPaidTodayCount: number;
  totalPendingInCents: number;
  totalPendingCount: number;
  totalPaidInCents: number;
  totalPaidCount: number;
  totalFeeInCents: number;
}
