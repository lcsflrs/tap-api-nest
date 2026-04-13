import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  GetTransactionQuery,
  GetTransactionResult,
} from "./dtos/get-transaction.query";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import type { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@QueryHandler(GetTransactionQuery)
export class GetTransactionHandler implements IQueryHandler<
  GetTransactionQuery,
  GetTransactionResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(query: GetTransactionQuery): Promise<GetTransactionResult> {
    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const response = await this.paymentGateway.getTransaction(
        query.transactionId,
        authToken,
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ?? "No response data from transaction",
        );
      }

      return {
        status: response.data.success.status,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
