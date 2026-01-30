import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateAdjustmentHandler } from "./commands/create-adjustment.handler";
import { CreatePayoutHandler } from "./commands/create-payout.handler";
import { FindManyAdjustmentsHandler } from "./queries/find-many-adjustments.handler";
import { FindPendingPayoutsHandler } from "./queries/find-pending-payouts.handler";
import { FindPaidPayoutsHandler } from "./queries/find-paid-payouts.handler";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { GetPayoutsMetricsHandler } from "./queries/get-payouts-metrics.handler";
import { GetAdjustmentsMetricsHandler } from "./queries/get-adjustments-metrics.handler";

const PayoutCommandHandlers = [CreateAdjustmentHandler, CreatePayoutHandler];

const PayoutQueryHandlers = [
  FindManyAdjustmentsHandler,
  FindPendingPayoutsHandler,
  FindPaidPayoutsHandler,
  GetPayoutsMetricsHandler,
  GetAdjustmentsMetricsHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...PayoutCommandHandlers, ...PayoutQueryHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
