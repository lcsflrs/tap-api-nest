import { Module } from "@nestjs/common";
import { AdjustmentModule } from "./modules/adjustment.module";
import { PayoutModule } from "./modules/payout.module";
import { InfrastructureModule } from "./modules/infrastructure.module";

@Module({
  imports: [InfrastructureModule, AdjustmentModule, PayoutModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
