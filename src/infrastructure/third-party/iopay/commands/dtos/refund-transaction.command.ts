import { Command } from "@nestjs/cqrs";

export interface RefundTransactionResult {
  refundedAt: Date;
}

export class RefundTransactionCommand extends Command<RefundTransactionResult> {
  constructor(
    public readonly transactionId: string,
    public readonly valueInCents: number,
  ) {
    super();
  }
}
