import { Module } from "@nestjs/common";
import { AdjustmentController } from "../controllers/adjustment.controller";
import { AdjustmentService } from "../../application/services/adjustment.service";
import { InfrastructureModule } from "./infrastructure.module";

@Module({
  imports: [InfrastructureModule],
  controllers: [AdjustmentController],
  providers: [AdjustmentService],
  exports: [AdjustmentService],
})
export class AdjustmentModule {}
