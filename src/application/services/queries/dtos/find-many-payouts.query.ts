import { Query } from "@nestjs/cqrs";

export class FindManyPayoutsQuery extends Query<{
  payouts: {
    id: string;
    clientId: string;
    grossInCents: number;
    feeInCents: number;
    netInCents: number;
    status: string;
    paidAt: Date | null;
    proofFileUrl: string | null;
    createdAt: Date;
    payoutDate: Date;
    updatedAt: Date;
    items: {
      id: string;
      payoutId: string;
      amountInCents: number;
      consumptionId: string;
    }[];
  }[];
  totalPages: number;
}> {
  constructor(
    public readonly page: number,
    public readonly limit: number,
    public readonly clientId?: string,
    public readonly status?: string,
  ) {
    super();
  }
}
