import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  ListAllTransfersQuery,
  ListAllTransfersResult,
  TransferItem,
} from "./dtos/list-all-transfers.query";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@QueryHandler(ListAllTransfersQuery)
export class ListAllTransfersHandler implements IQueryHandler<
  ListAllTransfersQuery,
  ListAllTransfersResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(query: ListAllTransfersQuery): Promise<ListAllTransfersResult> {
    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const response = await this.paymentGateway.listAllTransfers(
        query.ioSellerId,
        authToken,
      );

      const transfers: TransferItem[] = response.data.transfers.map(
        (t: any) => ({
          id: t.id,
          amount: t.amount,
          description: t.description,
          statementDescriptor: t.statement_descriptor,
        }),
      );

      return { transfers };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
