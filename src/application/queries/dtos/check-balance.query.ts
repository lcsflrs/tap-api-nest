import { Query } from "@nestjs/cqrs";

export class CheckBalanceQuery extends Query<{
  currentBalance: string;
  accountBalance: string;
}> {
  constructor(public readonly storeId: number) {
    super();
  }
}
