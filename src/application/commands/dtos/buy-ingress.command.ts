import { Command } from "@nestjs/cqrs";

export class BuyIngressCommand extends Command<{
  ingressId: number;
  customerId: number;
  partyId: number;
  ingressBatchId: number;
  transactionId: string;
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
    public readonly ingressBatchId: number,
  ) {
    super();
  }
}
