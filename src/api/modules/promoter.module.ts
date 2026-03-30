import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { PromoterController } from "../controllers/promoter.controller";
import { CustomerGuard } from "@api/guards/customer.guard";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [PromoterController],
  providers: [CustomerGuard],
})
export class PromoterModule {}
