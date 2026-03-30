import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as QRCode from "qrcode";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";
import { CreatePaymentTokenCommand } from "./dtos/create-payment-token.command";
import {
  PaymentTokenDocument,
  PaymentTokenSchemaClass,
} from "@infrastructure/mongodb/schemas/payment-token.schema";

@CommandHandler(CreatePaymentTokenCommand)
export class CreatePaymentTokenHandler implements ICommandHandler<CreatePaymentTokenCommand> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
    @InjectModel(PaymentTokenSchemaClass.name)
    private readonly paymentTokenModel: Model<PaymentTokenDocument>,
  ) {}

  async execute(command: CreatePaymentTokenCommand): Promise<{
    qrCode: string;
    paymentTokenId: string;
  }> {
    const { customerId, partyId, products, installments } = command;

    if (products.length === 0) {
      throw new Error("Products not found");
    }

    const [customer, party] = await Promise.all([
      this.prisma.customer.findUnique({
        where: { id: customerId },
      }),
      this.prisma.party.findUnique({
        where: { id: partyId },
      }),
    ]);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!party) {
      throw new Error("Party not found");
    }

    if (!customer.ioCustomerId) {
      throw new Error("Customer has no payment customer id");
    }

    if (!customer.defaultCardId) {
      throw new Error("Customer has no default card");
    }

    const partyShops = await this.prisma.partyShop.findMany({
      where: {
        partyId,
        isActive: true,
      },
      select: {
        shopId: true,
      },
    });

    const shopIds = partyShops.map((item) => item.shopId);
    const requestedProductIds = products.map((product) => Number(product.code));

    const availableProducts = await this.prisma.shopProduct.findMany({
      where: {
        id: { in: requestedProductIds },
        shopId: { in: shopIds },
        isActive: true,
      },
      select: {
        id: true,
      },
    });

    const availableProductIds = new Set(
      availableProducts.map((item) => item.id),
    );

    if (
      products.some((product) => !availableProductIds.has(Number(product.code)))
    ) {
      throw new Error("One or more products are not available");
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

    const paymentToken = new this.paymentTokenModel({
      qrcode: "waiting_insertion",
      cardId: "teste",
      createdAt: new Date(),
      installments,
      amount: totalAmount,
      party: {
        id: party.id,
        name: party.name,
        address: party.address ?? undefined,
      },
      partyId: party.id,
      products: formattedProducts,
      paymentStatus: "waiting_payment",
      user: {
        customerId: customer.ioCustomerId,
        name: customer.name,
        id: customer.id,
      },
      cardToken: customer.defaultCardId,
    });

    const signedToken = await this.jwtService.sign({
      paymentTokenId: String(paymentToken.id),
      userId: customer.id,
      partyId,
    });

    const qrCode = await QRCode.toString(signedToken, { type: "svg" });

    paymentToken.qrcode = qrCode;
    await paymentToken.save();

    return {
      qrCode,
      paymentTokenId: String(paymentToken.id),
    };
  }
}
