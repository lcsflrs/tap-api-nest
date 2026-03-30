import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateInviteCommand } from "./dtos/create-invite.command";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

const DOCUMENT_BLACK_LIST = ["05103273543"];

@CommandHandler(CreateInviteCommand)
export class CreateInviteHandler implements ICommandHandler<CreateInviteCommand> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(command: CreateInviteCommand) {
    const { customerId, partyId, document, name } = command;

    const sanitizedDocument = document.replace(/\D/g, "");

    if (DOCUMENT_BLACK_LIST.includes(sanitizedDocument)) {
      throw new Error("Invalid document");
    }

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

    const existingInvite = await this.prisma.invite.findFirst({
      where: { partyId, document: sanitizedDocument },
    });

    if (existingInvite) {
      throw new Error("Invite already exists");
    }

    const invite = await this.prisma.invite.create({
      data: {
        invitedByCustomerId: customerId,
        partyId,
        document: sanitizedDocument,
        name,
      },
    });

    return {
      id: invite.id,
      partyId: invite.partyId,
      invitedByCustomerId: invite.invitedByCustomerId,
      document: invite.document!,
      name: invite.name!,
    };
  }
}
