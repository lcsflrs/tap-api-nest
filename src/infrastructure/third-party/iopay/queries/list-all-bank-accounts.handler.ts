import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  ListAllBankAccountsQuery,
  ListAllBankAccountsResult,
} from "./dtos/list-all-bank-accounts.query";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@QueryHandler(ListAllBankAccountsQuery)
export class ListAllBankAccountsHandler implements IQueryHandler<
  ListAllBankAccountsQuery,
  ListAllBankAccountsResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(
    query: ListAllBankAccountsQuery,
  ): Promise<ListAllBankAccountsResult> {
    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const response = await this.paymentGateway.listAllBankAccounts(
        query.ioSellerId,
        authToken,
      );

      return {
        bankAccounts: response.data,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
