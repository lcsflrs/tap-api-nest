import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IPayoutRepository } from "./interfaces/payout-repository.interface";
import { Payout } from "@domain/payout/payout.aggregate";
import { Uuid } from "@domain/@shared/interfaces/uuid";
import { PayoutMapper } from "@infrastructure/mappers/payout.mapper";
import { PayoutStatus } from "@infrastructure/prisma/generated/prisma";

@Injectable()
export class PayoutRepository implements IPayoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(payout: Payout): Promise<void> {
    const data = PayoutMapper.toPersistence(payout);
    const payoutId = payout.getId().getValue();

    await this.prisma.payout.create({
      data: {
        id: data.id,
        storeId: data.storeId,
        storeName: data.storeName,
        grossInCents: data.grossInCents,
        feeInCents: data.feeInCents,
        netInCents: data.netInCents,
        status: data.status as PayoutStatus,
        proofFileUrl: data.proofFileUrl,
        items: {
          create: payout.items.map((item) =>
            PayoutMapper.itemToPersistence(item, payoutId),
          ),
        },
      },
    });
  }

  async update(payout: Payout): Promise<void> {
    const data = PayoutMapper.toPersistence(payout);
    const payoutId = payout.getId().getValue();

    await this.prisma.$transaction(async (tx) => {
      await tx.payout.update({
        where: { id: payoutId },
        data: {
          grossInCents: data.grossInCents,
          feeInCents: data.feeInCents,
          netInCents: data.netInCents,
          status: data.status as PayoutStatus,
          proofFileUrl: data.proofFileUrl,
        },
      });

      await tx.payoutItem.deleteMany({ where: { payoutId } });

      if (payout.items.length > 0) {
        await tx.payoutItem.createMany({
          data: payout.items.map((item) =>
            PayoutMapper.itemToPersistence(item, payoutId),
          ),
        });
      }
    });
  }

  async findById(id: Uuid): Promise<Payout | null> {
    const Payout = await this.prisma.payout.findUnique({
      where: { id: id.getValue() },
      include: { items: true },
    });

    if (!Payout) {
      return null;
    }

    return PayoutMapper.toDomain(Payout);
  }
}
