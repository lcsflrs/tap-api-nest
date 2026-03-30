import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { CustomerController } from "@api/controllers/customer.controller";
import { CustomerGuard } from "@api/guards/customer.guard";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [CustomerController],
  providers: [CustomerGuard],
})
export class CustomerModule {}
