import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { IAdjustmentRepository } from "./interfaces/adjustment-repository.interface";
import { Adjustment } from "@domain/adjustment/adjustment.aggregate";
import { Uuid } from "@domain/@shared/interfaces/uuid";
import { AdjustmentType } from "@infrastructure/prisma/generated/prisma";

@Injectable()
export class AdjustmentRepository implements IAdjustmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(adjustment: Adjustment): Promise<void> {
    await this.prisma.adjustment.create({
      data: {
        id: adjustment.id.getValue(),
        valueInCents: adjustment.valueInCents.getValue(),
        reason: adjustment.reason,
        type: adjustment.type as AdjustmentType,
        attachment: adjustment.attachment,
        createdAt: adjustment.createdAt,
        updatedAt: adjustment.updatedAt,
      },
    });
  }

  async update(adjustment: Adjustment): Promise<void> {
    await this.prisma.adjustment.update({
      where: { id: adjustment.id.getValue() },
      data: {
        valueInCents: adjustment.valueInCents.getValue(),
        reason: adjustment.reason,
        type: adjustment.type as AdjustmentType,
        attachment: adjustment.attachment,
        updatedAt: adjustment.updatedAt,
      },
    });
  }

  async findById(id: Uuid): Promise<Adjustment | null> {
    const adjustment = await this.prisma.adjustment.findUnique({
      where: { id: id.getValue() },
    });

    if (!adjustment) {
      return null;
    }

    return Adjustment.fromJSON(adjustment);
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Adjustment[]> {
    const adjustments = await this.prisma.adjustment.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return adjustments.map((adj) => Adjustment.fromJSON(adj));
  }

  async findAll(): Promise<Adjustment[]> {
    const adjustments = await this.prisma.adjustment.findMany({
      orderBy: { createdAt: "desc" },
    });

    return adjustments.map((adj) => Adjustment.fromJSON(adj));
  }
}
