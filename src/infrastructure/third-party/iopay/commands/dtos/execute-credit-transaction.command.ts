import { Command } from "@nestjs/cqrs";

export interface ExecuteCreditTransactionResult {
  transactionId: string;
}

export class ExecuteCreditTransactionCommand extends Command<ExecuteCreditTransactionResult> {
  constructor(
    public readonly ioCustomerId: string,
    public readonly cardId: string,
    public readonly totalInCents: number,
    public readonly installments: number,
    public readonly orderId: string,
    public readonly description: string,
    public readonly statementDescriptor: string,
    public readonly products: {
      name: string;
      id: string;
      priceInCents: number;
      quantity: number;
    }[],
    public readonly storeIoSellerId?: string,
  ) {
    super();
  }
}
