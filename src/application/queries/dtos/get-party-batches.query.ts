import { Query } from "@nestjs/cqrs";
import { IngressBatch } from "@infrastructure/prisma/generated/prisma";

export class GetPartyBatchesQuery extends Query<{
  ingressBatches: IngressBatch[];
}> {
  constructor(public readonly partyId: number) {
    super();
  }
}
