import { Command } from "@nestjs/cqrs";

export class PurchaseOrderCommand extends Command<{
  orderId: string;
  transactionId: string;
}> {
  constructor(
    public readonly orderId: string,
    public readonly workerId: number,
  ) {
    super();
  }
}
