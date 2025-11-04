import { Module } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import { PayoutRepository } from "../../application/repositories/payout.repository";
import { AdjustmentRepository } from "../../application/repositories/adjustment.repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: "AdjustmentRepository",
      useClass: AdjustmentRepository,
    },
    {
      provide: "PayoutRepository",
      useClass: PayoutRepository,
    },
  ],
  exports: [PrismaService, "PayoutRepository", "AdjustmentRepository"],
})
export class InfrastructureModule {}
