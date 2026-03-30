import { Query } from "@nestjs/cqrs";

export class GetInvitesDataQuery extends Query<{
  amountOfInvitesSend: number;
  amountOfUsersRegistered: number;
  amountOfUsersThatBoughtIngress: number;
  bonusInCents: number | null;
  listOfInvites: {
    id: number;
    name: string | null;
    status: string;
    boughtIngress: boolean;
  }[];
}> {
  constructor(
    public readonly customerId: number,
    public readonly partyId: number,
  ) {
    super();
  }
}
