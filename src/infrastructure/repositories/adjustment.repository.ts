import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { IAdjustmentRepository } from "./interfaces/adjustment-repository.interface";
import { Adjustment } from "@domain/adjustment/adjustment.aggregate";
import { Uuid } from "@domain/@shared/interfaces/uuid";
import { AdjustmentMapper } from "@infrastructure/mappers/adjustment.mapper";

@Injectable()
export class AdjustmentRepository implements IAdjustmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(adjustment: Adjustment): Promise<void> {
    await this.prisma.adjustment.create({
      data: AdjustmentMapper.toPersistence(adjustment),
    });
  }

  async update(adjustment: Adjustment): Promise<void> {
    await this.prisma.adjustment.update({
      where: { id: adjustment.getId().getValue() },
      data: AdjustmentMapper.toPersistence(adjustment),
    });
  }

  async findById(id: Uuid): Promise<Adjustment | null> {
    const adjustment = await this.prisma.adjustment.findUnique({
      where: { id: id.getValue() },
    });

    if (!adjustment) {
      return null;
    }

    return AdjustmentMapper.toDomain(adjustment);
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

    return adjustments.map((adj) => AdjustmentMapper.toDomain(adj));
  }

  async findAll(): Promise<Adjustment[]> {
    const adjustments = await this.prisma.adjustment.findMany({
      orderBy: { createdAt: "desc" },
    });

    return adjustments.map((adj) => AdjustmentMapper.toDomain(adj));
  }
}
