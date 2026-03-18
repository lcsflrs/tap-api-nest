import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetShopSalesHistoryQuery } from "./dtos/get-shop-sales-history.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetShopSalesHistoryQuery)
export class GetShopSalesHistoryHandler implements IQueryHandler<GetShopSalesHistoryQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetShopSalesHistoryQuery) {
    const sales = await this.prisma.storeSale.findMany({
      where: { shopId: query.shopId },
      include: {
        saleProducts: {
          include: {
            shopProduct: {
              include: { product: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return {
      sales: sales.map((sale) => ({
        id: sale.id,
        storeId: sale.storeId,
        shopId: sale.shopId,
        paymentMethodId: sale.paymentMethodId,
        orderId: sale.orderId,
        status: sale.status,
        totalInCents: sale.totalInCents,
        installments: sale.installments ?? 0,
        interestInCents: sale.interestInCents ?? undefined,
        paidAt: sale.paidAt ?? undefined,
        refundedAt: sale.refundedAt ?? undefined,
        transactionId: sale.transactionId ?? undefined,
        createdAt: sale.createdAt,
        updatedAt: sale.updatedAt,
        products: sale.saleProducts.map((sp) => ({
          id: sp.id,
          name: sp.shopProduct.product?.name ?? "",
          storeSalesId: sp.storeSaleId,
          shopProductId: sp.shopProductId,
          productId: sp.shopProduct.productId ?? 0,
          quantity: sp.quantity,
          priceInCents: sp.priceInCents,
          totalInCents: sp.totalInCents,
        })),
      })),
    };
  }
}
