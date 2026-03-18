import { Command } from "@nestjs/cqrs";

export interface ProcessPaymentTokenResult {
  transactionId: string;
}

export class ProcessPaymentTokenCommand extends Command<ProcessPaymentTokenResult> {
  constructor(public readonly paymentTokenJwt: string) {
    super();
  }
}
