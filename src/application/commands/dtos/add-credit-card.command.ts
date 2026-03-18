import { Command } from "@nestjs/cqrs";

export class AddCreditCardCommand extends Command<{
  creditCardId: number;
  customerId: number;
  cardId: string;
  cardBrand: string;
  first4Digits: string;
  last4Digits: string;
  expirationMonth: string;
  expirationYear: string;
  holderName: string;
}> {
  constructor(
    public readonly customerId: number,
    public readonly first4Digits: string,
    public readonly last4Digits: string,
    public readonly expirationMonth: string,
    public readonly expirationYear: string,
    public readonly cardId: string,
    public readonly cardToken: string,
    public readonly cardBrand: string,
    public readonly holderName: string,
  ) {
    super();
  }
}
