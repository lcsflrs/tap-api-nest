import { Command } from "@nestjs/cqrs";
import { BankAccountType } from "@domain/store/store-bank-account-type.value";

export class AddStoreBankAccountCommand extends Command<{
  storeId: number;
  bankCode: string;
  accountNumber: string;
  routingNumber: string;
  holderName: string;
  document: string;
  type: string;
}> {
  constructor(
    public readonly storeId: number,
    public readonly bankCode: string,
    public readonly accountNumber: string,
    public readonly routingNumber: string,
    public readonly holderName: string,
    public readonly document: string,
    public readonly type: BankAccountType,
  ) {
    super();
  }
}
