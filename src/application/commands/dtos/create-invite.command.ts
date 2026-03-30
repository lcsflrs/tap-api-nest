import { Command } from "@nestjs/cqrs";

export class CreateInviteCommand extends Command<{
  id: number;
  partyId: number;
  invitedByCustomerId: number;
  document: string;
  name: string;
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
    public readonly document: string,
    public readonly name: string,
  ) {
    super();
  }
}
