import { IQuery } from "@nestjs/cqrs";

export interface GetBalanceResult {
  currentBalance: string;
  accountBalance: string;
}

export class GetBalanceQuery implements IQuery {
  constructor(public readonly ioSellerId: string) {}
}
