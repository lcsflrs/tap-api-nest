import { Command } from "@nestjs/cqrs";

export class CreateCashierPaymentTokenCommand extends Command<void> {
  constructor(
    public readonly workerId: number,
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
