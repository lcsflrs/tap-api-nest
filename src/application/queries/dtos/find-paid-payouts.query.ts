import { Query } from "@nestjs/cqrs";

export class FindPaidPayoutsQuery extends Query<{
  payouts: {
    id: string;
    storeId: number;
    storeName: string;
    grossInCents: number;
    feeInCents: number;
    netInCents: number;
    status: string;
    proofFileUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: {
      id: string;
      payoutId: string;
      storeSaleId: number;
      orderId: string;
      saleGrossInCents: number;
      saleFeeInCents: number;
      saleNetInCents: number;
      createdAt: Date;
    }[];
  }[];
  totalPayouts: number;
  currentPage: number;
  totalPages: number;
}> {
  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 10,
    public readonly storeName?: string,
    public readonly status?: string,
  ) {
    super();
  }
}
