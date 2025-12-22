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
        type: adjustment.type,
        attachment: adjustment.attachment,
        createdAt: adjustment.createdAt,
      },
    });
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

  async findById(id: Uuid): Promise<Adjustment | null> {
    const adjustment = await this.prisma.adjustment.findUnique({
      where: { id: id.getValue() },
    });

    if (!adjustment) {
      return null;
    }

    return Adjustment.fromJSON(adjustment);
  }
}
