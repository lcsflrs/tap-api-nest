import { Command } from "@nestjs/cqrs";

export class CreateFreeIngressCommand extends Command<{
  ingressId: number;
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
  ) {
    super();
  }
}
