import { Command } from "@nestjs/cqrs";

export class CreateIngressPixTransactionCommand extends Command<{
  customerId: number;
  transactionId: string;
  referenceId: string;
  status: string;
  expirationDate: string;
  pixEmv: string;
  priceInCents: number;
  description: string;
  pixType: string;
  partyId?: number;
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
  ) {
    super();
  }
}
