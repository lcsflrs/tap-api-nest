import { Query } from "@nestjs/cqrs";

export class GetAdjustmentsMetricsQuery extends Query<{
  totalAdjustmentsCount: number;
  totalCreditsInCents: number;
  totalDebitsInCents: number;
}> {
  constructor() {
    super();
  }
}
