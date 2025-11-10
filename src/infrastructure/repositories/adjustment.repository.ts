import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import type { IAdjustmentRepository } from "./interfaces/adjustment-repository.interface";
import { Adjustment } from "../../domain/adjustment/adjustment.aggregate";
import { Uuid } from "../../domain/@shared/interfaces/uuid";

@Injectable()
export class AdjustmentRepository implements IAdjustmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(adjustment: Adjustment): Promise<void> {
    await this.prisma.adjustment.create({
      data: {
        id: adjustment.id.getValue(),
        clientId: adjustment.clientId.getValue(),
        valueInCents: adjustment.valueInCents.getValue(),
        reason: adjustment.reason,
        attachment: adjustment.attachment,
        createdAt: adjustment.createdAt,
      },
    });
  }

  async findById(id: Uuid): Promise<{
    id: string;
    clientId: string;
    valueInCents: number;
    reason: string;
    attachment: string | null;
  } | null> {
    const adjustment = await this.prisma.adjustment.findUnique({
      where: { id: id.getValue() },
    });

    if (!adjustment) {
      return null;
    }

    return adjustment;
  }

  async findMany(
    page: number,
    limit: number,
    clientId?: Uuid,
  ): Promise<{
    adjustments: {
      id: string;
      clientId: string;
      valueInCents: number;
      reason: string;
      attachment: string | null;
    }[];
    totalPages: number;
  }> {
    const take = Math.max(limit, 1);
    const skip = (Math.max(page, 1) - 1) * take;

    const where = clientId ? { clientId: clientId.getValue() } : undefined;

    const [adjustments, total] = await Promise.all([
      this.prisma.adjustment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      this.prisma.adjustment.count({ where }),
    ]);

    const totalPages = Math.ceil(total / take);

    return {
      adjustments,
      totalPages,
    };
  }

  async update(adjustment: Adjustment): Promise<void> {
    await this.prisma.adjustment.update({
      where: { id: adjustment.id.getValue() },
      data: {
        valueInCents: adjustment.valueInCents.getValue(),
        reason: adjustment.reason,
        attachment: adjustment.attachment,
      },
    });
  }
}
