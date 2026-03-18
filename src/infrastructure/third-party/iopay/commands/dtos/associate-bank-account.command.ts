import { Command } from "@nestjs/cqrs";
import { BankAccountType } from "@domain/store/store-bank-account-type.value";

export interface AssociateBankAccountResult {
  bankAccountToken: string;
  integrationSuccessful: boolean;
  bankName: string;
}

export class AssociateBankAccountCommand extends Command<AssociateBankAccountResult> {
  constructor(
    public readonly holderName: string,
    public readonly bankCode: string,
    public readonly routingNumber: string,
    public readonly accountNumber: string,
    public readonly type: BankAccountType,
    public readonly ioSellerId: string,
    public readonly document: string,
  ) {
    super();
  }
}
