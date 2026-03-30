import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SearchDocumentDataQuery } from "./dtos/search-document-data.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(SearchDocumentDataQuery)
export class SearchDocumentDataHandler implements IQueryHandler<SearchDocumentDataQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: SearchDocumentDataQuery) {
    const sanitizedDocument = query.document.replace(/\D/g, "");

    const customer = await this.prisma.customer.findFirst({
      where: { document: sanitizedDocument },
    });

    if (!customer) {
      throw new Error("User not found");
    }

    const party = await this.prisma.party.findUnique({
      where: { id: query.partyId },
    });

    if (!party) {
      throw new Error("Party not found");
    }

    const ingress = await this.prisma.ingress.findFirst({
      where: { customerId: customer.id, partyId: query.partyId },
    });

    if (!ingress) {
      throw new Error("Ingress not found");
    }

    if (ingress.braceletNumber) {
      throw new Error("Document already got a bracelet");
    }

    const pendentData: string[] = ["bracelet"];

    if (!customer.birthdate) {
      pendentData.push("birthdate");
    }

    return { pendentData };
  }
}
