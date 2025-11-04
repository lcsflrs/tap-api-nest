import { Module } from "@nestjs/common";
import { PayoutController } from "../controllers/payout.controller";
import { PayoutService } from "../../application/services/payout.service";
import { InfrastructureModule } from "./infrastructure.module";

@Module({
  imports: [InfrastructureModule],
  controllers: [PayoutController],
  providers: [PayoutService],
  exports: [PayoutService],
})
export class PayoutModule {}
