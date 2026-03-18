import { Query } from "@nestjs/cqrs";
import { SalesStatus } from "@domain/store/store-sales.entity";

export class GetShopSalesHistoryQuery extends Query<{
  sales: {
    id: number;
    storeId: number;
    shopId: number;
    paymentMethodId: number;
    orderId: string;
    status: SalesStatus;
    totalInCents: number;
    installments: number;
    interestInCents?: number;
    paidAt?: Date;
    refundedAt?: Date;
    transactionId?: string;
    createdAt: Date;
    updatedAt: Date;
    products: {
      id: number;
      name: string;
      storeSalesId: number;
      shopProductId: number;
      productId: number;
      quantity: number;
      priceInCents: number;
      totalInCents: number;
    }[];
  }[];
}> {
  constructor(public readonly shopId: number) {
    super();
  }
}
