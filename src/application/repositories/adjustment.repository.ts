import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import type { IAdjustmentRepository } from "./interfaces/adjustment-repository.interface";
import { Adjustment } from "../../domain/adjustment/adjustment.aggregate";
import { Money } from "../../domain/@shared/value-objects/money.value";
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

  async findById(id: Uuid): Promise<Adjustment | null> {
    const adjustmentData = await this.prisma.adjustment.findUnique({
      where: { id: id.getValue() },
    });

    if (!adjustmentData) {
      return null;
    }

    return this.toDomainEntity(adjustmentData);
  }

  async findMany(clientId?: Uuid): Promise<Adjustment[]> {
    const adjustmentsData = await this.prisma.adjustment.findMany({
      where: clientId ? { clientId: clientId.getValue() } : undefined,
      orderBy: { createdAt: "desc" },
    });

    return adjustmentsData.map((data) => this.toDomainEntity(data));
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

  private toDomainEntity(adjustmentData: AdjustmentData): Adjustment {
    return new Adjustment(
      new Uuid(adjustmentData.id),
      new Uuid(adjustmentData.clientId),
      new Money(adjustmentData.valueInCents),
      adjustmentData.reason,
      adjustmentData.createdAt,
      adjustmentData.attachment || undefined,
    );
  }
}

interface AdjustmentData {
  id: string;
  clientId: string;
  valueInCents: number;
  reason: string;
  attachment: string | null;
  createdAt: Date;
}
