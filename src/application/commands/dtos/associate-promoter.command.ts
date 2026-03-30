import { Command } from "@nestjs/cqrs";

export class AssociatePromoterCommand extends Command<void> {
  constructor(
    public readonly userId: number,
    public readonly partyId: number,
  ) {
    super();
  }
}
