import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../infrastructure/prisma/prisma.service";
import type { IPayoutRepository } from "./interfaces/payout-repository.interface";
import { Payout } from "../../domain/payout/payout.aggregate";
import { PayoutItem } from "../../domain/payout/payout-item.entity";
import { Uuid } from "../../domain/@shared/interfaces/uuid";
import { Money } from "../../domain/@shared/value-objects/money.value";
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
            amountInCents: item.amountInCents.getValue(),
            consumptionId: item.consumptionId.getValue(),
          })),
        },
      },
    });
  }

  async findById(id: Uuid): Promise<Payout | null> {
    const payoutData = await this.prisma.payout.findUnique({
      where: { id: id.getValue() },
      include: { items: true },
    });

    if (!payoutData) {
      return null;
    }

    return this.toDomainEntity(payoutData);
  }

  async findMany(
    page: number,
    limit: number,
    clientId?: string,
    status?: PayoutStatus,
  ): Promise<{ payouts: Payout[]; totalPages: number }> {
    const where = {
      ...(clientId && { clientId }),
      ...(status && { status: status.getValue() }),
    };

    const skip = (page - 1) * limit;

    const [total, payoutsData] = await Promise.all([
      this.prisma.payout.count({ where }),
      this.prisma.payout.findMany({
        where,
        include: { items: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      payouts: payoutsData.map((data) => this.toDomainEntity(data)),
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

  private toDomainEntity(payoutData: PayoutData): Payout {
    const items = payoutData.items.map(
      (item: any) =>
        new PayoutItem(
          new Uuid(item.id),
          new Uuid(item.payoutId),
          new Money(item.amountInCents),
          new Uuid(item.consumptionId),
        ),
    );

    return new Payout(
      new Uuid(payoutData.id),
      new Uuid(payoutData.clientId),
      new Money(payoutData.grossInCents),
      new Money(payoutData.feeInCents),
      new Money(payoutData.netInCents),
      PayoutStatus.fromString(payoutData.status),
      items,
      new Date(payoutData.createdAt),
      new Date(payoutData.updatedAt),
      payoutData.paidAt ? new Date(payoutData.paidAt) : undefined,
      payoutData.proofFileUrl || undefined,
    );
  }
}

interface PayoutData {
  id: string;
  clientId: string;
  grossInCents: number;
  feeInCents: number;
  netInCents: number;
  status: string;
  items: PayoutItemData[];
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date | null;
  proofFileUrl: string | null;
}

interface PayoutItemData {
  id: string;
  payoutId: string;
  amountInCents: number;
  consumptionId: string;
}
