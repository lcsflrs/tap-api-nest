import { Command } from "@nestjs/cqrs";

export class CreateStorePixTransactionCommand extends Command<{
  storeId: number;
  customerId?: number | null;
  transactionId: string;
  referenceId: string;
  status: string;
  expirationDate: string;
  pixKey: string;
  pixQrCode: string;
  pixEmv: string;
  amountInCents: number;
  description: string;
  pixType: string;
}> {
  constructor(
    public readonly storeId: number,
    public readonly amountInCents: number,
  ) {
    super();
  }
}
