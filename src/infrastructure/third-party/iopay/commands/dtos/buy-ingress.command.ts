import { Command } from "@nestjs/cqrs";

export type BuyIngressResult = {
  ingressId: number;
  customerId: number;
  partyId: number;
  ingressBatchId: number;
  transactionId: string;
};

export class BuyIngressCommand extends Command<BuyIngressResult> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
    public readonly ingressBatchId: number,
  ) {
    super();
  }
}
