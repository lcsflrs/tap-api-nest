import { Module } from "@nestjs/common";
import { PayoutRepository } from "@infrastructure/repositories/payout.repository";
import { AdjustmentRepository } from "@infrastructure/repositories/adjustment.repository";
import { StoreSaleRepository } from "./repositories/store-sale.repository";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@Module({
  providers: [
    PrismaService,
    {
      provide: "PayoutRepository",
      useClass: PayoutRepository,
    },
    {
      provide: "AdjustmentRepository",
      useClass: AdjustmentRepository,
    },
    {
      provide: "StoreSaleRepository",
      useClass: StoreSaleRepository,
    },
  ],
  exports: [
    PrismaService,
    "PayoutRepository",
    "AdjustmentRepository",
    "StoreSaleRepository",
  ],
})
export class InfrastructureModule {}
