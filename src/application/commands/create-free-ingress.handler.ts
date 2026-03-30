import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateFreeIngressCommand } from "./dtos/create-free-ingress.command";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

const FREE_PAYMENT_METHOD_ID = 5;
const PAID_INGRESS_STATUS_ID = 2;

@CommandHandler(CreateFreeIngressCommand)
export class CreateFreeIngressHandler implements ICommandHandler<CreateFreeIngressCommand> {
  constructor(@Inject() private readonly prisma: PrismaService) {}

  async execute(command: CreateFreeIngressCommand) {
    const { customerId, partyId } = command;

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
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

    const existing = await this.prisma.ingress.findFirst({
      where: { customerId, ingressStatusId: PAID_INGRESS_STATUS_ID },
    });

    if (existing) {
      throw new Error("Ingress already bought");
    }

    const ingress = await this.prisma.ingress.create({
      data: {
        partyId,
        customerId,
        ingressStatusId: PAID_INGRESS_STATUS_ID,
        paymentMethodId: FREE_PAYMENT_METHOD_ID,
      },
    });

    return { ingressId: ingress.id };
  }
}
