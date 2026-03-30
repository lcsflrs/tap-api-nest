import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { ManagementController } from "../controllers/management.controller";
import { WorkerGuard } from "@api/guards/worker.guard";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [ManagementController],
  providers: [WorkerGuard],
})
export class ManagementModule {}
