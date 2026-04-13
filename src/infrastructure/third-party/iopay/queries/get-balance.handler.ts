import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetBalanceQuery, GetBalanceResult } from "./dtos/get-balance.query";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import type { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@QueryHandler(GetBalanceQuery)
export class GetBalanceHandler implements IQueryHandler<
  GetBalanceQuery,
  GetBalanceResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(query: GetBalanceQuery): Promise<GetBalanceResult> {
    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const response = await this.paymentGateway.getBalance(
        query.ioSellerId,
        authToken,
      );

      const { items } = response.data;

      return {
        currentBalance: items.current_balance,
        accountBalance: items.account_balance ?? "0.0000",
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
