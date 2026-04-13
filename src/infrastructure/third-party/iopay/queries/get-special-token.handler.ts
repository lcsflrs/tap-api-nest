import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetSpecialTokenQuery } from "./dtos/get-special-token.query";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import type { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@QueryHandler(GetSpecialTokenQuery)
export class GetSpecialTokenHandler implements IQueryHandler<
  GetSpecialTokenQuery,
  string
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(): Promise<string> {
    try {
      const response = await this.paymentGateway.getSpecialToken();
      return response.data.access_token;
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
