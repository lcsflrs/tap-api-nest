import { Command } from "@nestjs/cqrs";

export interface AuthorizeEntryResult {
  ingressId: number;
}

export class AuthorizeEntryCommand extends Command<AuthorizeEntryResult> {
  constructor(
    public readonly document: string,
    public readonly partyId: number,
    public readonly valueInCents: number,
  ) {
    super();
  }
}
