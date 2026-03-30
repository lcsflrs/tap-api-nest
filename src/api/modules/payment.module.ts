import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PaymentController } from "../controllers/payment.controller";
import { CustomerGuard } from "@api/guards/customer.guard";
import { WorkerGuard } from "@api/guards/worker.guard";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [PaymentController],
  providers: [CustomerGuard, WorkerGuard],
})
export class PaymentModule {}
