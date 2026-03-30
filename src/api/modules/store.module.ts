import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { StoreController } from "../controllers/store.controller";
import { StoreOwnerGuard } from "../guards/store-owner.guard";
import { WorkerGuard } from "../guards/worker.guard";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [StoreController],
  providers: [StoreOwnerGuard, WorkerGuard],
})
export class StoreModule {}
