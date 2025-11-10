import { Module } from "@nestjs/common";
import { AdjustmentController } from "../controllers/adjustment.controller";
import { ApplicationModule } from "../../application/application.module";

@Module({
  imports: [ApplicationModule],
  controllers: [AdjustmentController],
})
export class AdjustmentModule {}
