import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import type { IPayoutRepository } from "./interfaces/payout-repository.interface";
import { Payout } from "../../domain/payout/payout.aggregate";
import { Uuid } from "../../domain/@shared/interfaces/uuid";
import { PayoutStatus } from "../../domain/@shared/value-objects/payout-status.value";

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
        updatedAt: payout.updatedAt,
        items: {
          create: payout.items.map((item) => ({
            id: item.id.getValue(),
            payoutId: payout.id.getValue(),
            amountInCents: item.amountInCents.getValue(),
            consumptionId: item.consumptionId.getValue(),
          })),
        },
      },
    });
  }

  async findById(id: Uuid): Promise<{
    id: string;
    clientId: string;
    grossInCents: number;
    feeInCents: number;
    netInCents: number;
    status: string;
    paidAt: Date | null;
    proofFileUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: {
      id: string;
      payoutId: string;
      amountInCents: number;
      consumptionId: string;
    }[];
  } | null> {
    const payout = await this.prisma.payout.findUnique({
      where: { id: id.getValue() },
      include: { items: true },
    });

    if (!payout) {
      return null;
    }

    return payout;
  }

  async findMany(
    page: number,
    limit: number,
    clientId?: string,
    status?: PayoutStatus,
  ): Promise<{
    payouts: {
      id: string;
      clientId: string;
      grossInCents: number;
      feeInCents: number;
      netInCents: number;
      status: string;
      paidAt: Date | null;
      proofFileUrl: string | null;
      createdAt: Date;
      updatedAt: Date;
      items: {
        id: string;
        payoutId: string;
        amountInCents: number;
        consumptionId: string;
      }[];
    }[];
    totalPages: number;
  }> {
    const where = {
      ...(clientId && { clientId }),
      ...(status && { status: status.getValue() }),
    };

    const take = Math.max(limit, 1);
    const skip = (Math.max(page, 1) - 1) * take;

    const [total, payoutsData] = await Promise.all([
      this.prisma.payout.count({ where }),
      this.prisma.payout.findMany({
        where,
        include: { items: true },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      payouts: payoutsData,
      totalPages,
    };
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
}
