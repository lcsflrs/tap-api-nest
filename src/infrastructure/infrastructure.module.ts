import { Module } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { PayoutRepository } from "src/infrastructure/repositories/payout.repository";
import { AdjustmentRepository } from "src/infrastructure/repositories/adjustment.repository";

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
