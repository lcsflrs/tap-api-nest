import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetPartyAnalysisQuery } from "./dtos/get-party-analysis.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetPartyAnalysisQuery)
export class GetPartyAnalysisHandler implements IQueryHandler<GetPartyAnalysisQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetPartyAnalysisQuery) {
    const { partyId } = query;

    const [ingressAmount, braceletsCount] = await Promise.all([
      this.prisma.ingress.count({ where: { partyId } }),
      this.prisma.ingress.count({
        where: { partyId, braceletNumber: { not: null } },
      }),
    ]);

    return { ingressAmount, braceletsCount };
  }
}
