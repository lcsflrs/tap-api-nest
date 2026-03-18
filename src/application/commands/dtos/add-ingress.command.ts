import { Command } from "@nestjs/cqrs";

export class AddIngressCommand extends Command<{
  ingressId: number;
  customerId: number;
  paymentMethodId: number;
  ingressStatusId: number;
  partyId: number;
  ingressBatchId?: number;
  transactionId?: string;
  valueInCents?: number;
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
    public readonly transactionId?: string,
  ) {
    super();
  }
}
