import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  CreateTransferToBankAccountCommand,
  CreateTransferToBankAccountResult,
} from "./dtos/create-transfer-to-bank-account.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";

@CommandHandler(CreateTransferToBankAccountCommand)
export class CreateTransferToBankAccountHandler implements ICommandHandler<
  CreateTransferToBankAccountCommand,
  CreateTransferToBankAccountResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(
    command: CreateTransferToBankAccountCommand,
  ): Promise<CreateTransferToBankAccountResult> {
    const { amount, description, statementDescriptor, bankAccountId } = command;

    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const transferResponse =
        await this.paymentGateway.createTransferToBankAccount(
          {
            amount,
            description,
            statement_descriptor: statementDescriptor,
          },
          this.paymentGateway.getPaymentIoSellerId(),
          bankAccountId,
          authToken,
        );

      return {
        transferId: transferResponse.data.success.id,
        amount: transferResponse.data.success.amount,
        bankAccountId: transferResponse.data.success.bank_account_id,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
