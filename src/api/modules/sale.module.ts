import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { SaleController } from "../controllers/sale.controller";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [SaleController],
})
export class SaleModule {}
