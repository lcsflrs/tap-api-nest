import { Command } from "@nestjs/cqrs";

export interface GenerateStorePixTransactionResult {
  storeId: number;
  transactionId: string;
  referenceId: string;
  expirationDate: string;
  pixKey: string;
  pixQrCode: string;
  pixEmv: string;
  amountInCents: number;
  status: string;
  description?: string;
}

export class GenerateStorePixTransactionCommand extends Command<GenerateStorePixTransactionResult> {
  constructor(
    public readonly storeId: number,
    public readonly referenceId: string,
    public readonly amountInCents: number,
    public readonly description?: string,
    public readonly statementDescriptor?: string,
  ) {
    super();
  }
}
