import { IQuery } from "@nestjs/cqrs";

export interface GetIopayBankAccountResult {
  id: number;
  accountNumber: string;
  bankCode: string;
  holderName: string;
  type: string;
}

export class GetIopayBankAccountQuery implements IQuery {
  constructor(
    public readonly ioSellerId: string,
    public readonly bankAccountId: number,
  ) {}
}
