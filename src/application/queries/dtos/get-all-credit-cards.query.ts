import { Query } from "@nestjs/cqrs";

export class GetAllCreditCardsQuery extends Query<{
  defaultCardId: string;
  creditCards: {
    id: number;
    customerId: number;
    first4Digits: string;
    last4Digits: string;
    expirationMonth: string;
    expirationYear: string;
    cardToken: string;
    cardId: string;
    cardBrand: string;
    holderName: string;
  }[];
}> {
  constructor(public readonly customerId: number) {
    super();
  }
}
