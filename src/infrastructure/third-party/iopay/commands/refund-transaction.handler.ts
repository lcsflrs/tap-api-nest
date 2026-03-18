import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  RefundTransactionCommand,
  RefundTransactionResult,
} from "./dtos/refund-transaction.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@CommandHandler(RefundTransactionCommand)
export class RefundTransactionHandler implements ICommandHandler<
  RefundTransactionCommand,
  RefundTransactionResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(
    command: RefundTransactionCommand,
  ): Promise<RefundTransactionResult> {
    const { transactionId, valueInCents } = command;

    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      await this.paymentGateway.refundTransaction(
        transactionId,
        { amount: valueInCents },
        authToken,
      );

      return {
        refundedAt: new Date(),
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
