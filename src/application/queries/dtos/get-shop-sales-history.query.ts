import { Query } from "@nestjs/cqrs";
import { SaleStatus } from "@domain/store/sale/store-sale.aggregate";

export class GetShopSalesHistoryQuery extends Query<{
  sales: {
    id: number;
    storeId: number;
    shopId: number;
    paymentMethodId: number;
    orderId: string;
    status: SaleStatus;
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
