import { IQuery } from "@nestjs/cqrs";

export interface GetTransactionResult {
  status: string;
}

export class GetTransactionQuery implements IQuery {
  constructor(public readonly transactionId: string) {}
}
