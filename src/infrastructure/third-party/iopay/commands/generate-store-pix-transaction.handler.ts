import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  GenerateStorePixTransactionCommand,
  GenerateStorePixTransactionResult,
} from "./dtos/generate-store-pix-transaction.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { BodyGeneratePixTransactionDTO } from "@domain/@shared/payment-gateway/payment-gateway.dto";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";

@CommandHandler(GenerateStorePixTransactionCommand)
export class GenerateStorePixTransactionHandler implements ICommandHandler<
  GenerateStorePixTransactionCommand,
  GenerateStorePixTransactionResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(
    command: GenerateStorePixTransactionCommand,
  ): Promise<GenerateStorePixTransactionResult> {
    const {
      storeId,
      referenceId,
      amountInCents,
      description,
      statementDescriptor,
    } = command;

    const storeData =
      await this.storeRepository.findByIdWithOwnerIoCustomerId(storeId);

    if (!storeData) {
      throw new Error("Store not found");
    }

    if (!storeData.ownerIoCustomerId) {
      throw new Error("Owner does not have an ioCustomerId");
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
        storeData.ownerIoCustomerId,
        body,
        authToken,
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ??
            "No response data from PIX store transaction",
        );
      }

      const { success } = response.data;

      return {
        storeId,
        referenceId,
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
