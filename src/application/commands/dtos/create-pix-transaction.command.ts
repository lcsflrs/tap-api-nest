import { Command } from "@nestjs/cqrs";

export class CreatePixTransactionCommand extends Command<{
  customerId: number;
  transactionId: string;
  referenceId: string;
  status: string;
  expirationDate: string;
  pixKey: string;
  pixQrCode: string;
  pixEmv: string;
  amountInCents: number;
  description: string;
}> {
  constructor(
    public readonly customerId: number,
    public readonly amountInCents: number,
  ) {
    super();
  }
}
