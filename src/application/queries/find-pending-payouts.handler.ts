import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FindPendingPayoutsQuery } from "./dtos/find-pending-payouts.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(FindPendingPayoutsQuery)
export class FindPendingPayoutsHandler implements IQueryHandler<FindPendingPayoutsQuery> {
  private static readonly TAP_FEE = 0.03;

  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: FindPendingPayoutsQuery) {
    const { storeName, page, limit } = query;

    const pendingSales = await this.prisma.store_sales.findMany({
      where: {
        payment_method_id: 4,
        status: "paid",
        payout_items: { is: null },
        ...(storeName && {
          store: {
            name: {
              contains: storeName,
            },
          },
        }),
      },
      include: {
        store: {
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

    const groupedByStore = pendingSales.reduce(
      (acc, sale) => {
        const storeId = sale.store_id;

        if (!acc[storeId]) {
          acc[storeId] = {
            storeId: sale.store.id,
            storeName: sale.store.name,
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

        acc[storeId].sales.push({
          id: sale.id,
          orderId: sale.order_id,
          grossInCents,
          feeInCents,
          netInCents,
          paidAt: sale.paid_at!,
        });

        acc[storeId].totalGrossInCents += grossInCents;
        acc[storeId].totalFeeInCents += feeInCents;
        acc[storeId].totalNetInCents += netInCents;
        acc[storeId].salesCount += 1;

        return acc;
      },
      {} as Record<number, any>,
    );

    const allStores = Object.values(groupedByStore);
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
