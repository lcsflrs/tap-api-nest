import { Command } from "@nestjs/cqrs";

export class SellProductTicketCommand extends Command<void> {
  constructor(
    public readonly shopId: number,
    public readonly paymentMethod:
      | "credit-card"
      | "debit-card"
      | "pix"
      | "money",
    public readonly products: { shopProductId: number; quantity: number }[],
    public readonly workerId: number,
    public readonly braceletNumber?: string,
  ) {
    super();
  }
}
