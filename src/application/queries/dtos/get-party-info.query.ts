import { Query } from "@nestjs/cqrs";
import { IngressBatch } from "@infrastructure/prisma/generated/prisma";

export class GetPartyInfoQuery extends Query<{
  id: number;
  name: string;
  date: string;
  time: string;
  address: string | null;
  ingressBatches: IngressBatch[];
}> {
  constructor(public readonly partyId: number) {
    super();
  }
}
