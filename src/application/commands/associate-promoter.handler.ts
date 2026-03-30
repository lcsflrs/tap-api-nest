import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AssociatePromoterCommand } from "./dtos/associate-promoter.command";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@CommandHandler(AssociatePromoterCommand)
export class AssociatePromoterHandler implements ICommandHandler<AssociatePromoterCommand> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(command: AssociatePromoterCommand) {
    const { userId, partyId } = command;

    const [party, customer] = await Promise.all([
      this.prisma.party.findUnique({ where: { id: partyId } }),
      this.prisma.customer.findUnique({ where: { id: userId } }),
    ]);

    if (!party) {
      throw new Error("Party not found");
    }

    if (!customer) {
      throw new Error("User not found");
    }

    const existing = await this.prisma.promoter.findFirst({
      where: { customerId: userId, partyId },
    });

    if (existing) {
      throw new Error("User is already a promoter of this party");
    }

    await this.prisma.promoter.create({
      data: { customerId: userId, partyId },
    });
  }
}
