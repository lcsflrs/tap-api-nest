import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPartyInfoQuery } from "./dtos/get-party-info.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetPartyInfoQuery)
export class GetPartyInfoHandler implements IQueryHandler<GetPartyInfoQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetPartyInfoQuery) {
    const { partyId } = query;

    const party = await this.prisma.party.findUnique({
      where: { id: partyId },
      include: {
        batches: { where: { isActive: true } },
      },
    });

    if (!party) {
      throw new Error("Party not found");
    }

    return {
      id: party.id,
      name: party.name,
      date: party.date.toISOString(),
      time: party.time.toISOString(),
      address: party.address,
      ingressBatches: party.batches,
    };
  }
}
