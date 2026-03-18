import { Command } from "@nestjs/cqrs";

export interface GeneratePixTransactionResult {
  transactionId: string;
  expirationDate: string;
  status: string;
  amountInCents: number;
  pixKey: string;
  pixQrCode: string;
  pixEmv: string;
  description?: string;
}

export class GeneratePixTransactionCommand extends Command<GeneratePixTransactionResult> {
  constructor(
    public readonly customerId: number,
    public readonly referenceId: string,
    public readonly amountInCents: number,
    public readonly description?: string,
    public readonly statementDescriptor?: string,
  ) {
    super();
  }
}
