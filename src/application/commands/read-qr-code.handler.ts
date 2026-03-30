import { Inject } from "@nestjs/common";
import { CommandBus, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";
import { ReadQrCodeCommand } from "./dtos/read-qr-code.command";
import { PaymentTokenSchemaClass } from "@infrastructure/mongodb/schemas/payment-token.schema";
import {
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult,
} from "@infrastructure/third-party/iopay/commands/dtos/execute-credit-transaction.command";

@CommandHandler(ReadQrCodeCommand)
export class ReadQrCodeHandler implements ICommandHandler<
  ReadQrCodeCommand,
  { transactionId: string }
> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @Inject("JwtService")
    private readonly jwtService: IJwtService,
    @InjectModel(PaymentTokenSchemaClass.name)
    private readonly paymentTokenModel: Model<PaymentTokenSchemaClass>,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: ReadQrCodeCommand,
  ): Promise<{ transactionId: string }> {
    const payload = (await this.jwtService.verify(command.paymentTokenJwt)) as {
      userId: number;
      partyId: number;
      paymentTokenId: string;
    };

    if (!payload.userId) {
      throw new Error("User not found");
    }

    const paymentToken = await this.paymentTokenModel.findById(
      payload.paymentTokenId,
    );

    if (!paymentToken) {
      throw new Error("Payment token not found");
    }

    if (paymentToken.paymentStatus === "paid") {
      throw new Error("Payment token already paid");
    }

    paymentToken.paymentStatus = "processing";
    await paymentToken.save();

    const customer = await this.prisma.customer.findUnique({
      where: { id: payload.userId },
    });

    if (!customer) {
      paymentToken.paymentStatus = "error_payment";
      await paymentToken.save();
      throw new Error("Customer not found");
    }

    if (!customer.defaultCardId) {
      paymentToken.paymentStatus = "error_payment";
      await paymentToken.save();
      throw new Error("Customer has no default card");
    }

    if (!customer.ioCustomerId) {
      paymentToken.paymentStatus = "error_payment";
      await paymentToken.save();
      throw new Error("Customer has no payment customer id");
    }

    try {
      const productsForGateway = paymentToken.products.map((product: any) => ({
        id: product.code,
        name: product.name,
        priceInCents: product.amount,
        quantity: product.quantity,
      }));

      const result = await this.commandBus.execute<
        ExecuteCreditTransactionCommand,
        ExecuteCreditTransactionResult
      >(
        new ExecuteCreditTransactionCommand(
          customer.ioCustomerId,
          customer.defaultCardId,
          paymentToken.amount,
          paymentToken.installments,
          String(paymentToken.id),
          `Compra em ${paymentToken.party.name}`,
          paymentToken.party.name,
          productsForGateway,
        ),
      );

      paymentToken.paymentStatus = "paid";
      paymentToken.payedAt = new Date();
      paymentToken.transactionId = result.transactionId;

      await paymentToken.save();

      return {
        transactionId: result.transactionId,
      };
    } catch (error) {
      paymentToken.paymentStatus = "error_payment";
      await paymentToken.save();
      throw error;
    }
  }
}
