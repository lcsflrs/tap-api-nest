import { Command } from "@nestjs/cqrs";

export class CreatePaymentTokenCommand extends Command<{
  qrCode: string;
  paymentTokenId: string;
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
    public readonly products: {
      code: string;
      name: string;
      amount: number;
      quantity: number;
    }[],
    public readonly amount: number,
    public readonly installments: number,
  ) {
    super();
  }
}
