import { Command } from "@nestjs/cqrs";

export class GoogleSignInCommand extends Command<{
  customer: { id: number; name: string; email: string };
  status: "pendent" | "ready";
  pendent: string[];
  token: string;
  hasCreditCard: boolean;
  hasIngressForPartiesIds: number[];
  partyPromoterIds: number[];
  wasInvitedToPartiesIds: number[];
}> {
  constructor(
    public readonly fullName: string,
    public readonly email: string,
  ) {
    super();
  }
}
