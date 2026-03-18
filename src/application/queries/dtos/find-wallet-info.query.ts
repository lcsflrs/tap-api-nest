import { Query } from "@nestjs/cqrs";

export class FindWalletInfoQuery extends Query<{
  balance: number;
  defaultPaymentMethod?: string | null;
}> {
  constructor(public readonly customerId: number) {
    super();
  }
}
