import { Query } from "@nestjs/cqrs";

export class GetLastSalesQuery extends Query<{
  paymentTokens: {
    id: string;
    transactionId: string | undefined;
    paymentStatus: string;
    amountInCents: number;
    payedAt: Date | undefined;
    products: { name: string; id: number; quantity: number }[];
  }[];
}> {
  constructor(public readonly partyId: number) {
    super();
  }
}
