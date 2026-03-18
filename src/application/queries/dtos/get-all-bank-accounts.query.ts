import { Query } from "@nestjs/cqrs";

export class GetAllBankAccountsQuery extends Query<{
  bankAccounts: {
    accountNumber: string;
    routingNumber: string;
    holderName: string;
    type: string;
    bankCode: string;
    document: string;
  }[];
}> {
  constructor(public readonly storeId: number) {
    super();
  }
}
