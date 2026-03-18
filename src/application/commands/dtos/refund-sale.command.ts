import { Command } from "@nestjs/cqrs";

export class RefundSaleCommand extends Command<void> {
  constructor(public readonly saleId: number) {
    super();
  }
}
