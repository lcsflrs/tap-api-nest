import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  GeneratePixTransactionCommand,
  GeneratePixTransactionResult,
} from "./dtos/generate-pix-transaction.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import type { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { BodyGeneratePixTransactionDTO } from "@domain/@shared/payment-gateway/payment-gateway.dto";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";

@CommandHandler(GeneratePixTransactionCommand)
export class GeneratePixTransactionHandler implements ICommandHandler<
  GeneratePixTransactionCommand,
  GeneratePixTransactionResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(
    command: GeneratePixTransactionCommand,
  ): Promise<GeneratePixTransactionResult> {
    const {
      customerId,
      referenceId,
      amountInCents,
      description,
      statementDescriptor,
    } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("[IOPAY_GATEWAY] Customer not found");
    }

    if (!customer.ioCustomerId) {
      throw new Error("[IOPAY_GATEWAY] Customer does not have an ioCustomerId");
    }

    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const body: BodyGeneratePixTransactionDTO = {
        amount: amountInCents,
        currency: "BRL",
        payment_type: "pix",
        io_seller_id: this.paymentGateway.getPaymentIoSellerId(),
        reference_id: referenceId,
        description,
        statement_descriptor: statementDescriptor,
      };

      const response = await this.paymentGateway.generatePixTransaction(
        customer.ioCustomerId,
        body,
        authToken,
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ?? "No response data from PIX transaction",
        );
      }

      const { success } = response.data;

      return {
        transactionId: success.id,
        pixKey: success.payment_method.key.value,
        pixQrCode: success.pix_qrcode_url,
        pixEmv: success.payment_method.qr_code.emv,
        expirationDate: success.payment_method.expiration_date,
        status: success.status,
        amountInCents: Math.round(parseFloat(success.amount) * 100),
        description: success.description,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
