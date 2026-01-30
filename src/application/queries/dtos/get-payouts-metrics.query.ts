import { Query } from "@nestjs/cqrs";

export class GetPayoutsMetricsQuery extends Query<{
  totalPaidTodayInCents: number;
  totalPaidTodayCount: number;
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
