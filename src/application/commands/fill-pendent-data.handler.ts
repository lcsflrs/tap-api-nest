import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { FillPendentDataCommand } from "./dtos/fill-pendent-data.command";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@CommandHandler(FillPendentDataCommand)
export class FillPendentDataHandler implements ICommandHandler<FillPendentDataCommand> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(command: FillPendentDataCommand) {
    const { document, partyId, braceletNumber, birthDate } = command;

    const sanitizedDocument = document.replace(/\D/g, "");

    const customer = await this.prisma.customer.findFirst({
      where: { document: sanitizedDocument },
    });

    if (!customer) {
      throw new Error("Customer not found");
    }

    const party = await this.prisma.party.findUnique({
      where: { id: partyId },
    });

    if (!party) {
      throw new Error("Party not found");
    }

    const ingress = await this.prisma.ingress.findFirst({
      where: { customerId: customer.id, partyId },
    });

    if (!ingress) {
      throw new Error("Ingresso não encontrado");
    }

    if (ingress.braceletNumber) {
      throw new Error("Documento já recebeu uma pulseira");
    }

    if (!customer.birthdate) {
      const [day, month, year] = birthDate.split("/");
      await this.prisma.customer.update({
        where: { id: customer.id },
        data: { birthdate: new Date(`${year}-${month}-${day}`) },
      });
    }

    await this.prisma.ingress.update({
      where: { id: ingress.id },
      data: { braceletNumber: Number(braceletNumber) },
    });
  }
}
