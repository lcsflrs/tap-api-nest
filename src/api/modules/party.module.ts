import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PartyController } from "../controllers/party.controller";
import { CustomerGuard } from "@api/guards/customer.guard";
import { WorkerGuard } from "@api/guards/worker.guard";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [PartyController],
  providers: [CustomerGuard, WorkerGuard],
})
export class PartyModule {}
