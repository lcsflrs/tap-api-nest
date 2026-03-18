import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CustomerSalesHistoryQuery } from "./dtos/customer-sales-history.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(CustomerSalesHistoryQuery)
export class CustomerSalesHistoryHandler implements IQueryHandler<CustomerSalesHistoryQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: CustomerSalesHistoryQuery) {
    const { customerId, page, limit } = query;

    const take = Math.max(limit, 1);
    const skip = (Math.max(page, 1) - 1) * take;

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const [sales, totalCount] = await Promise.all([
      this.prisma.storeSale.findMany({
        where: { customerId },
        orderBy: { createdAt: "desc" },
        take,
        skip,
        include: {
          saleProducts: {
            include: {
              shopProduct: {
                include: { product: true },
              },
            },
          },
        },
      }),
      this.prisma.storeSale.count({ where: { customerId } }),
    ]);

    return {
      totalCount,
      sales: sales.map((sale) => ({
        id: sale.id,
        storeId: sale.storeId,
        shopId: sale.shopId,
        paymentMethodId: sale.paymentMethodId,
        status: sale.status,
        totalInCents: sale.totalInCents,
        installments: sale.installments ?? 0,
        interestInCents: sale.interestInCents ?? undefined,
        paidAt: sale.paidAt,
        refundedAt: sale.refundedAt ?? undefined,
        transactionId: sale.transactionId ?? undefined,
        products: sale.saleProducts.map((sp) => ({
          id: sp.id,
          name: sp.shopProduct.product?.name ?? "",
          productId: sp.shopProduct.productId ?? 0,
          quantity: sp.quantity,
          priceInCents: sp.priceInCents,
          totalInCents: sp.priceInCents * sp.quantity,
        })),
      })),
    };
  }
}
