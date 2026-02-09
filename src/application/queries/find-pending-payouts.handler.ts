import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindPendingPayoutsQuery } from "./dtos/find-pending-payouts.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(FindPendingPayoutsQuery)
export class FindPendingPayoutsHandler implements IQueryHandler<FindPendingPayoutsQuery> {
  private static readonly TAP_FEE = 0.03;
  private static readonly PAYOUT_DAYS = 2;

  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: FindPendingPayoutsQuery) {
    const { storeName, page, limit } = query;

    const pendingSales = await this.prisma.store_sales.findMany({
      where: {
        payment_method_id: 4,
        status: "paid",
        payout_items: null,
        ...(storeName && {
          store: {
            name: {
              contains: storeName,
            },
          },
        }),
      },
      include: {
        shop: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        paid_at: "asc",
      },
    });

    const groupedByStoreAndDate = pendingSales.reduce(
      (acc, sale) => {
        const storeId = sale.shop_id;
        const paidAtDate = sale.paid_at
          ? new Date(sale.paid_at).toISOString().split("T")[0]
          : "unknown";

        const key = `${storeId}-${paidAtDate}`;

        if (!acc[key]) {
          const saleDate = sale.paid_at ? new Date(sale.paid_at) : new Date();
          const payoutDate = new Date(saleDate);
          payoutDate.setDate(
            payoutDate.getDate() + FindPendingPayoutsHandler.PAYOUT_DAYS,
          );

          acc[key] = {
            storeId: sale.shop.id,
            storeName: sale.shop.name,
            date: new Date(saleDate.toISOString().split("T")[0]),
            payoutDate,
            sales: [],
            totalGrossInCents: 0,
            totalFeeInCents: 0,
            totalNetInCents: 0,
            salesCount: 0,
          };
        }

        const grossInCents = sale.total_in_cents;
        const feeInCents = Math.floor(
          grossInCents * FindPendingPayoutsHandler.TAP_FEE,
        );
        const netInCents = grossInCents - feeInCents;

        acc[key].sales.push({
          id: sale.id,
          orderId: sale.order_id,
          grossInCents,
          feeInCents,
          netInCents,
          paidAt: sale.paid_at!,
        });

        acc[key].totalGrossInCents += grossInCents;
        acc[key].totalFeeInCents += feeInCents;
        acc[key].totalNetInCents += netInCents;
        acc[key].salesCount += 1;

        return acc;
      },
      {} as Record<string, any>,
    );

    const allStores = Object.values(groupedByStoreAndDate).sort((a, b) => {
      const nameCompare = a.storeName.localeCompare(b.storeName);
      if (nameCompare !== 0) return nameCompare;
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const totalStores = allStores.length;

    const currentPage = Math.max(page, 1);
    const take = Math.max(limit, 1);
    const skip = (currentPage - 1) * take;
    const totalPages = Math.ceil(totalStores / take);

    const stores = allStores.slice(skip, skip + take);

    return {
      stores,
      totalStores,
      currentPage,
      totalPages,
    };
  }
}
