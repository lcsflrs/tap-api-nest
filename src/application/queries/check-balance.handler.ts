import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CheckBalanceQuery } from "./dtos/check-balance.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@QueryHandler(CheckBalanceQuery)
export class CheckBalanceHandler implements IQueryHandler<CheckBalanceQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(query: CheckBalanceQuery) {
    const { storeId } = query;

    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
    });

    if (!store) {
      throw new Error("Store not found");
    }

    if (!store.ioSellerId) {
      throw new Error("Store has no payment gateway account");
    }

    const authResponse = await this.paymentGateway.getAuthToken();
    const authToken: string = authResponse.data.access_token;

    const balance = await this.paymentGateway.getBalance(
      store.ioSellerId,
      authToken,
    );

    return {
      currentBalance: balance.currentBalance,
      accountBalance: balance.accountBalance,
    };
  }
}
