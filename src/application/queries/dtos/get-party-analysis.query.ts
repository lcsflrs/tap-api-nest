import { Query } from "@nestjs/cqrs";

export class GetPartyAnalysisQuery extends Query<{
  ingressAmount: number;
  braceletsCount: number;
}> {
  constructor(public readonly partyId: number) {
    super();
  }
}
