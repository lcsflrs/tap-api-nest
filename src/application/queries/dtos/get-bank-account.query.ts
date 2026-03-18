import { Query } from "@nestjs/cqrs";

export class GetBankAccountQuery extends Query<{
  accountNumber: string;
  routingNumber: string;
  holderName: string;
  type: string;
  bankCode: string;
  document: string;
}> {
  constructor(public readonly storeId: number) {
    super();
  }
}
