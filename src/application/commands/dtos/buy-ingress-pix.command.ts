import { Command } from "@nestjs/cqrs";

export interface BuyIngressPixResult {
  ingressId: number;
}

export class BuyIngressPixCommand extends Command<BuyIngressPixResult> {
  constructor(
    public readonly document: string,
    public readonly partyId: number,
  ) {
    super();
  }
}
