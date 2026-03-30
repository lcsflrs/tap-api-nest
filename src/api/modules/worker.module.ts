import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { WorkerController } from "@api/controllers/worker.controller";

@Module({
  imports: [ApplicationModule],
  controllers: [WorkerController],
})
export class WorkerModule {}
