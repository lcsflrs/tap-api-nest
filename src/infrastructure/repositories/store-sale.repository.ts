import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { IStoreSaleRepository } from "./interfaces/store-sale-repository.interface";

@Injectable()
export class StoreSaleRepository implements IStoreSaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findSalesForPayout(
    shopId: number,
    saleIds: number[],
    date: string,
  ): Promise<{
    storeId: number;
    shopName: string;
    sales: Array<{ id: number; orderId: string; totalInCents: number }>;
  }> {
    const sales = await this.prisma.store_sales.findMany({
      where: {
        id: { in: saleIds },
        shop_id: shopId,
        payment_method_id: 4,
        status: "paid",
        payout_items: null,
        paid_at: {
          gte: new Date(`${date}T00:00:00-03:00`),
          lte: new Date(`${date}T23:59:59-03:00`),
        },
      },
      select: {
        id: true,
        order_id: true,
        total_in_cents: true,
        store_id: true,
        shop: {
          select: {
            name: true,
          },
        },
      },
    });

    if (sales.length === 0) {
      throw new Error("Nenhuma venda encontrada");
    }

    return {
      storeId: sales[0].store_id,
      shopName: sales[0].shop.name,
      sales: sales.map((sale) => ({
        id: sale.id,
        orderId: sale.order_id,
        totalInCents: sale.total_in_cents,
      })),
    };
  }
}
