import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPartyBatchesQuery } from "./dtos/get-party-batches.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetPartyBatchesQuery)
export class GetPartyBatchesHandler implements IQueryHandler<GetPartyBatchesQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetPartyBatchesQuery) {
    const { partyId } = query;

    const party = await this.prisma.party.findUnique({
      where: { id: partyId },
      include: { batches: true },
    });

    if (!party) {
      throw new Error("Party not found");
    }

    return { ingressBatches: party.batches };
  }
}
