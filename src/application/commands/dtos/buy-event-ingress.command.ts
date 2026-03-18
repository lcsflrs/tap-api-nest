import { Command } from "@nestjs/cqrs";

export interface BuyEventIngressResult {
  ingressId: number;
  transactionId: string;
}

export class BuyEventIngressCommand extends Command<BuyEventIngressResult> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
    public readonly ingressBatchId: number,
  ) {
    super();
  }
}
