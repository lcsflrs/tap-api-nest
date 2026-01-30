import { Query } from "@nestjs/cqrs";

export class FindPendingPayoutsQuery extends Query<{
  stores: {
    storeId: number;
    storeName: string;
    totalGrossInCents: number;
    totalFeeInCents: number;
    totalNetInCents: number;
    salesCount: number;
    sales: {
      id: number;
      orderId: string;
      grossInCents: number;
      feeInCents: number;
      netInCents: number;
      paidAt: Date;
    }[];
  }[];
  totalStores: number;
  currentPage: number;
  totalPages: number;
}> {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
    public readonly storeName?: string,
  ) {
    super();
  }
}
