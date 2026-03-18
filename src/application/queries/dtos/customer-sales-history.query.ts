import { Query } from "@nestjs/cqrs";

export class CustomerSalesHistoryQuery extends Query<{
  totalCount: number;
  sales: {
    id: number;
    storeId: number;
    shopId: number;
    paymentMethodId: number;
    status: string;
    totalInCents: number;
    installments: number;
    interestInCents?: number;
    paidAt: Date | null;
    refundedAt?: Date;
    transactionId?: string;
    products: {
      id: number;
      name: string;
      productId: number;
      quantity: number;
      priceInCents: number;
      totalInCents: number;
    }[];
  }[];
}> {
  constructor(
    public readonly customerId: number,
    public readonly page: number = 1,
    public readonly limit: number = 5,
  ) {
    super();
  }
}
