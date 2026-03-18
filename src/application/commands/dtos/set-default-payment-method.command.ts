import { Command } from "@nestjs/cqrs";

export class SetDefaultPaymentMethodCommand extends Command<{
  message: string;
  cardId?: string;
  paymentMethod: string;
}> {
  constructor(
    public readonly customerId: number,
    public readonly paymentMethod: string,
    public readonly cardId?: string,
  ) {
    super();
  }
}
