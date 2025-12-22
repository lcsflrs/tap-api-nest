import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import type { IPayoutRepository } from "./interfaces/payout-repository.interface";
import { Payout } from "../../domain/payout/payout.aggregate";
import { Uuid } from "../../domain/@shared/interfaces/uuid";

@Injectable()
export class PayoutRepository implements IPayoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(payout: Payout): Promise<void> {
    await this.prisma.payout.create({
      data: {
        id: payout.id.getValue(),
        clientId: payout.clientId.getValue(),
        grossInCents: payout.grossInCents,
        feeInCents: payout.feeInCents,
        netInCents: payout.netInCents,
        status: payout.status.getValue(),
        paidAt: payout.paidAt,
        proofFileUrl: payout.proofFileUrl,
        createdAt: payout.createdAt,
        payoutDate: payout.payoutDate,
        updatedAt: payout.updatedAt,
        items: {
          create: payout.items.map((item) => ({
            id: item.id.getValue(),
            amountInCents: item.amountInCents.getValue(),
            consumptionId: item.consumptionId.getValue(),
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
          status: payout.status.getValue(),
          paidAt: payout.paidAt,
          proofFileUrl: payout.proofFileUrl,
          updatedAt: payout.updatedAt,
          payoutDate: payout.payoutDate,
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
            amountInCents: item.amountInCents.getValue(),
            consumptionId: item.consumptionId.getValue(),
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
