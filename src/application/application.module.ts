import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { CreatePayoutHandler } from "./services/commands/create-payout.handler";
import { MarkPayoutPaidHandler } from "./services/commands/mark-payout-paid.handler";
import { AddItemToPayoutHandler } from "./services/commands/add-item-to-payout.handler";
import { FindPayoutByIdHandler } from "./services/queries/find-payout-by-id.handler";
import { FindManyPayoutsHandler } from "./services/queries/find-many-payouts.handler";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";

const PayoutCommandHandlers = [
  CreatePayoutHandler,
  MarkPayoutPaidHandler,
  AddItemToPayoutHandler,
];

const PayoutQueryHandlers = [FindPayoutByIdHandler, FindManyPayoutsHandler];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...PayoutCommandHandlers, ...PayoutQueryHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
