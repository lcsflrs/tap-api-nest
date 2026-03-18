import { IQuery } from "@nestjs/cqrs";

export interface BankAccountItem {
  id: number;
  accountNumber: string;
  bankCode: string;
  holderName: string;
  type: string;
}

export interface ListAllBankAccountsResult {
  bankAccounts: BankAccountItem[];
}

export class ListAllBankAccountsQuery implements IQuery {
  constructor(public readonly ioSellerId: string) {}
}
