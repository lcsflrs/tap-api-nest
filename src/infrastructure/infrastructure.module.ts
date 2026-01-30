import { Module } from "@nestjs/common";
import { PayoutRepository } from "@infrastructure/repositories/payout.repository";
import { AdjustmentRepository } from "@infrastructure/repositories/adjustment.repository";
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
  ],
  exports: [PrismaService, "PayoutRepository", "AdjustmentRepository"],
})
export class InfrastructureModule {}
