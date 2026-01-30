import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { IPayoutRepository } from "./interfaces/payout-repository.interface";
import { Payout } from "@domain/payout/payout.aggregate";
import { Uuid } from "@domain/@shared/interfaces/uuid";
import { payouts_status } from "@infrastructure/prisma/generated/prisma";

@Injectable()
export class PayoutRepository implements IPayoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(payout: Payout): Promise<void> {
    await this.prisma.payout.create({
      data: {
        id: payout.id.getValue(),
        storeId: payout.storeId,
        storeName: payout.storeName,
        grossInCents: payout.grossInCents,
        feeInCents: payout.feeInCents,
        netInCents: payout.netInCents,
        status: payout.status.getValue() as payouts_status,
        proofFileUrl: payout.proofFileUrl,
        createdAt: payout.createdAt,
        updatedAt: payout.updatedAt,
        items: {
          create: payout.items.map((item) => ({
            id: item.id.getValue(),
            storeSaleId: item.storeSaleId,
            orderId: item.orderId,
            saleGrossInCents: item.saleGrossInCents.getValue(),
            saleFeeInCents: item.saleFeeInCents.getValue(),
            saleNetInCents: item.saleNetInCents.getValue(),
            createdAt: new Date(),
          })),
        },
      },
    });
  }

  async update(payout: Payout): Promise<void> {
    await this.prisma.$transaction(async (tx) => {
      await tx.payout.update({
        where: { id: payout.id.getValue() },
        data: {
          grossInCents: payout.grossInCents,
          feeInCents: payout.feeInCents,
          netInCents: payout.netInCents,
          status: payout.status.getValue() as payouts_status,
          proofFileUrl: payout.proofFileUrl,
          updatedAt: payout.updatedAt,
        },
      });

      await tx.payoutItem.deleteMany({
        where: { payoutId: payout.id.getValue() },
      });

      if (payout.items.length > 0) {
        await tx.payoutItem.createMany({
          data: payout.items.map((item) => ({
            id: item.id.getValue(),
            payoutId: payout.id.getValue(),
            storeSaleId: item.storeSaleId,
            orderId: item.orderId,
            saleGrossInCents: item.saleGrossInCents.getValue(),
            saleFeeInCents: item.saleFeeInCents.getValue(),
            saleNetInCents: item.saleNetInCents.getValue(),
            createdAt: new Date(),
          })),
        });
      }
    });
  }

  async findById(id: Uuid): Promise<Payout | null> {
    const payout = await this.prisma.payout.findUnique({
      where: { id: id.getValue() },
      include: { items: true },
    });

    if (!payout) {
      return null;
    }

    return Payout.fromJSON(payout);
  }
}
