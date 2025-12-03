import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AddItemToPayoutHandler } from "./services/commands/add-item-to-payout.handler";
import { CreateAdjustmentHandler } from "./services/commands/create-adjustment.handler";
import { CreatePayoutHandler } from "./services/commands/create-payout.handler";
import { MarkPayoutPaidHandler } from "./services/commands/mark-payout-paid.handler";
import { FindAdjustmentByIdHandler } from "./services/queries/find-adjustment-by-id.handler";
import { FindManyAdjustmentsHandler } from "./services/queries/find-many-adjustments.handler";
import { FindPayoutByIdHandler } from "./services/queries/find-payout-by-id.handler";
import { FindManyPayoutsHandler } from "./services/queries/find-many-payouts.handler";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";

const PayoutCommandHandlers = [
  AddItemToPayoutHandler,
  CreateAdjustmentHandler,
  CreatePayoutHandler,
  MarkPayoutPaidHandler,
];

const PayoutQueryHandlers = [
  FindAdjustmentByIdHandler,
  FindManyAdjustmentsHandler,
  FindPayoutByIdHandler,
  FindManyPayoutsHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...PayoutCommandHandlers, ...PayoutQueryHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
