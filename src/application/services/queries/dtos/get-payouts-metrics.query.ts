import { Query } from "@nestjs/cqrs";

export class GetPayoutsMetricsQuery extends Query<{
  totalDueTodayInCents: number;
  totalDueTodayCount: number;
  totalPendingInCents: number;
  totalPendingCount: number;
  totalPaidInCents: number;
  totalPaidCount: number;
  totalFeeInCents: number;
}> {
  constructor() {
    super();
  }
}
