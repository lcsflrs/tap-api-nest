import { Module } from "@nestjs/common";
import { AdjustmentModule } from "./modules/adjustment.module";
import { PayoutModule } from "./modules/payout.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";

@Module({
  imports: [InfrastructureModule, AdjustmentModule, PayoutModule],
})
export class AppModule {}
