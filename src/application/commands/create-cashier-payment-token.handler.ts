import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import { CreateCashierPaymentTokenCommand } from "./dtos/create-cashier-payment-token.command";
import { CashierTokenSchemaClass } from "@infrastructure/mongodb/schemas/cashier-token.schema";

@CommandHandler(CreateCashierPaymentTokenCommand)
export class CreateCashierPaymentTokenHandler implements ICommandHandler<CreateCashierPaymentTokenCommand> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @InjectModel(CashierTokenSchemaClass.name)
    private readonly cashierPaymentTokenModel: Model<CashierTokenSchemaClass>,
  ) {}

  async execute(command: CreateCashierPaymentTokenCommand): Promise<void> {
    const { workerId, partyId, products } = command;

    if (products.length === 0) {
      throw new Error("Products not found");
    }

    const [worker, party] = await Promise.all([
      this.prisma.shopWorker.findUnique({
        where: { id: workerId },
      }),
      this.prisma.party.findUnique({
        where: { id: partyId },
      }),
    ]);

    if (!worker) {
      throw new Error("Worker not found");
    }

    if (!party) {
      throw new Error("Party not found");
    }

    const formattedProducts = products.map((product) => ({
      code: product.code,
      name: product.name,
      amount: product.amount * 100,
      quantity: product.quantity,
    }));

    const totalAmount = formattedProducts.reduce((acc, product) => {
      return acc + product.amount * product.quantity;
    }, 0);

    const cashierPaymentToken = new this.cashierPaymentTokenModel({
      createdAt: new Date(),
      amount: totalAmount,
      braceletNumber: "",
      paymentMethod: "card",
      party: {
        id: party.id,
        name: party.name,
        address: party.address ?? "",
      },
      partyId: party.id,
      products: formattedProducts,
    });

    await cashierPaymentToken.save();
  }
}
