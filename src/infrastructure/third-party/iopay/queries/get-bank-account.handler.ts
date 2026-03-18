import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  GetBankAccountQuery,
  GetBankAccountResult,
} from "./dtos/get-bank-account.query";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@QueryHandler(GetBankAccountQuery)
export class GetBankAccountHandler implements IQueryHandler<
  GetBankAccountQuery,
  GetBankAccountResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(query: GetBankAccountQuery): Promise<GetBankAccountResult> {
    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const response = await this.paymentGateway.getBankAccount(
        query.bankAccountId,
        query.ioSellerId,
        authToken,
      );

      const { data } = response;

      return {
        id: data.id,
        accountNumber: data.accountNumber,
        bankCode: data.bankCode,
        holderName: data.holderName,
        type: data.type,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
