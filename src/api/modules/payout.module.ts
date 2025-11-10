import { Module } from "@nestjs/common";
import { PayoutController } from "../controllers/payout.controller";
import { ApplicationModule } from "../../application/application.module";

@Module({
  imports: [ApplicationModule],
  controllers: [PayoutController],
})
export class PayoutModule {}
