import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IStoreSaleRepository } from "./interfaces/store-sale-repository.interface";
import { StoreSale } from "@domain/store/sale/store-sale.aggregate";
import { StoreSaleMapper } from "@infrastructure/mappers/store-sale.mapper";

@Injectable()
export class StoreSaleRepository implements IStoreSaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(sale: StoreSale): Promise<void> {
    const data = StoreSaleMapper.toPersistence(sale);

    await this.prisma.$transaction(async (tx) => {
      const created = await tx.storeSale.create({ data });

      if (sale.products.length > 0) {
        await tx.storeSaleProduct.createMany({
          data: sale.products.map((p) =>
            StoreSaleMapper.productToPersistence(p, created.id),
          ),
        });
      }
    });
  }

  async update(sale: StoreSale): Promise<void> {
    const data = StoreSaleMapper.toPersistence(sale);

    await this.prisma.storeSale.update({
      where: { id: sale.getId().getValue() },
      data: {
        status: data.status,
        refundedAt: data.refundedAt,
      },
    });
  }

  async findById(id: number): Promise<StoreSale | null> {
    const storeSale = await this.prisma.storeSale.findUnique({
      where: { id },
      include: { saleProducts: true },
    });

    if (!storeSale) {
      return null;
    }

    return StoreSaleMapper.toDomain(storeSale);
  }

  async findForPayout(
    shopId: number,
    storeSaleIds: number[],
    date: string,
  ): Promise<{
    storeId: number;
    shopName: string;
    storeSales: Array<{
      id: number;
      orderId: string;
      totalInCents: number;
    }>;
  }> {
    const storeSales = await this.prisma.storeSale.findMany({
      where: {
        id: { in: storeSaleIds },
        shopId,
        paymentMethodId: 4,
        status: "paid",
        payoutItem: null,
        paidAt: {
          gte: new Date(`${date}T00:00:00-03:00`),
          lte: new Date(`${date}T23:59:59-03:00`),
        },
      },
      select: {
        id: true,
        orderId: true,
        totalInCents: true,
        storeId: true,
        shop: { select: { name: true } },
      },
    });

    if (storeSales.length === 0) {
      throw new Error("Nenhuma venda encontrada");
    }

    return {
      storeId: storeSales[0].storeId,
      shopName: storeSales[0].shop.name,
      storeSales: storeSales.map((storeSale) => ({
        id: storeSale.id,
        orderId: storeSale.orderId,
        totalInCents: storeSale.totalInCents,
      })),
    };
  }

  async saveWithPaymentTransaction(
    sale: StoreSale,
    customerId: number,
    amountInCents: number,
  ): Promise<void> {
    const data = StoreSaleMapper.toPersistence(sale);

    await this.prisma.$transaction(async (tx) => {
      await tx.customerWallet.update({
        where: { customerId },
        data: { balance: { decrement: amountInCents } },
      });

      const created = await tx.storeSale.create({ data });

      if (sale.products.length > 0) {
        await tx.storeSaleProduct.createMany({
          data: sale.products.map((p) =>
            StoreSaleMapper.productToPersistence(p, created.id),
          ),
        });
      }
    });
  }

  async saveCardPaymentTransaction(sale: StoreSale): Promise<void> {
    const data = StoreSaleMapper.toPersistence(sale);

    await this.prisma.$transaction(async (tx) => {
      const created = await tx.storeSale.create({ data });

      if (sale.products.length > 0) {
        await tx.storeSaleProduct.createMany({
          data: sale.products.map((p) =>
            StoreSaleMapper.productToPersistence(p, created.id),
          ),
        });
      }
    });
  }
}
