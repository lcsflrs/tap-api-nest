import { IQuery } from "@nestjs/cqrs";

export interface GetBankAccountResult {
  id: number;
  accountNumber: string;
  bankCode: string;
  holderName: string;
  type: string;
}

export class GetBankAccountQuery implements IQuery {
  constructor(
    public readonly ioSellerId: string,
    public readonly bankAccountId: number,
  ) {}
}
