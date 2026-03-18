import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  AssociateBankAccountCommand,
  AssociateBankAccountResult,
} from "./dtos/associate-bank-account.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import {
  BodyAssociateTokenizedBankAccountDTO,
  BodyTokenizeBankAccountDTO,
} from "@domain/@shared/payment-gateway/payment-gateway.dto";

@CommandHandler(AssociateBankAccountCommand)
export class AssociateBankAccountHandler implements ICommandHandler<
  AssociateBankAccountCommand,
  AssociateBankAccountResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(
    command: AssociateBankAccountCommand,
  ): Promise<AssociateBankAccountResult> {
    const {
      holderName,
      bankCode,
      routingNumber,
      accountNumber,
      type,
      ioSellerId,
      document,
    } = command;

    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const isCnpj = document.replace(/\D/g, "").length > 11;

      const tokenizationBody: BodyTokenizeBankAccountDTO = {
        holder_name: holderName,
        bank_code: bankCode,
        routing_number: routingNumber,
        account_number: accountNumber,
        type,
        ein: isCnpj ? document : undefined,
        taxpayer_id: !isCnpj ? document : undefined,
      };

      const tokenizationResponse =
        await this.paymentGateway.tokenizeBankAccount(
          ioSellerId,
          tokenizationBody,
          authToken,
        );

      const bankAccountToken: string = tokenizationResponse.data.id;
      const platformSellerId = this.paymentGateway.getPaymentIoSellerId();

      const associationBody: BodyAssociateTokenizedBankAccountDTO = {
        token: bankAccountToken,
        io_seller_id: platformSellerId,
      };

      const associationResponse =
        await this.paymentGateway.associateTokenizedBankAccount(
          associationBody,
          authToken,
        );

      return {
        bankAccountToken,
        integrationSuccessful: associationResponse.status === 200,
        bankName: tokenizationResponse.data.bank_account.bank_name,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
