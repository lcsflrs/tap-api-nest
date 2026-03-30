import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetInvitesDataQuery } from "./dtos/get-invites-data.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(GetInvitesDataQuery)
export class GetInvitesDataHandler implements IQueryHandler<GetInvitesDataQuery> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(query: GetInvitesDataQuery) {
    const { customerId, partyId } = query;

    const [customer, party] = await Promise.all([
      this.prisma.customer.findUnique({ where: { id: customerId } }),
      this.prisma.party.findUnique({ where: { id: partyId } }),
    ]);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!party) {
      throw new Error("Party not found");
    }

    const promoter = await this.prisma.promoter.findFirst({
      where: { customerId, partyId },
    });

    if (!promoter) {
      throw new Error("Promoter not found");
    }

    const invites = await this.prisma.invite.findMany({
      where: { invitedByCustomerId: customerId, partyId },
    });

    const documents = invites
      .map((i) => i.document)
      .filter((d): d is string => d !== null);

    const registeredCustomers = await this.prisma.customer.findMany({
      where: { document: { in: documents } },
    });

    const documentToCustomerId = new Map<string, number>(
      registeredCustomers.map((c) => [c.document!, c.id]),
    );

    const registeredCustomerIds = registeredCustomers.map((c) => c.id);

    const ingresses = await this.prisma.ingress.findMany({
      where: { customerId: { in: registeredCustomerIds }, partyId },
    });

    const customerIdsWithIngress = new Set(ingresses.map((i) => i.customerId));

    return {
      amountOfInvitesSend: invites.length,
      amountOfUsersRegistered: registeredCustomers.length,
      amountOfUsersThatBoughtIngress: ingresses.length,
      bonusInCents: promoter.bonusInCents,
      listOfInvites: invites.map((invite) => {
        const inviteCustomerId = documentToCustomerId.get(
          invite.document ?? "",
        );

        return {
          id: invite.id,
          name: invite.name,
          status:
            inviteCustomerId !== undefined ? "registered" : "not-registered",
          boughtIngress:
            inviteCustomerId !== undefined
              ? customerIdsWithIngress.has(inviteCustomerId)
              : false,
        };
      }),
    };
  }
}
