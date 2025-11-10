import { Query } from "@nestjs/cqrs";

export class FindPayoutByIdQuery extends Query<{
  id: string;
  clientId: string;
  grossInCents: number;
  feeInCents: number;
  netInCents: number;
  status: string;
  paidAt: Date | null;
  proofFileUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  items: {
    id: string;
    payoutId: string;
    amountInCents: number;
    consumptionId: string;
  }[];
}> {
  constructor(public readonly id: string) {
    super();
  }
}
