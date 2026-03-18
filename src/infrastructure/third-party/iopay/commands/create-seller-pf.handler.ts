import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  CreateSellerPFCommand,
  CreateSellerPFResult,
} from "./dtos/create-seller-pf.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { BodyCreateSellerPFDTO } from "@domain/@shared/payment-gateway/payment-gateway.dto";
import { formatPhoneForIopay } from "src/utils/third-party/format-phone-for-iopay";

@CommandHandler(CreateSellerPFCommand)
export class CreateSellerPFHandler implements ICommandHandler<
  CreateSellerPFCommand,
  CreateSellerPFResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: CreateSellerPFCommand): Promise<CreateSellerPFResult> {
    const { owner, store } = command;

    if (!store.isPF()) {
      throw new Error(
        "[IOPAY_GATEWAY] Store must be PF to register as individual seller",
      );
    }

    if (!owner.document) {
      throw new Error(
        "[IOPAY_GATEWAY] Owner document is required for PF seller registration",
      );
    }

    if (!owner.birthdate) {
      throw new Error(
        "[IOPAY_GATEWAY] Owner birthdate is required for PF seller registration",
      );
    }

    if (store.mcc === null) {
      throw new Error(
        "[IOPAY_GATEWAY] Store MCC is required for seller registration",
      );
    }

    if (!store.statementDescriptor) {
      throw new Error(
        "[IOPAY_GATEWAY] Store statement descriptor is required for seller registration",
      );
    }

    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const body: BodyCreateSellerPFDTO = {
        cpf: owner.document.getValue(),
        birthdate: owner.birthdate.toISOString().split("T")[0],
        email: owner.email.getValue(),
        phone_number: formatPhoneForIopay(owner.phone.getValue()),
        statement_descriptor: store.statementDescriptor,
        mcc: store.mcc,
        first_name: owner.name,
        last_name: owner.lastName,
        send_welcome_email: false,
        address: {
          city: owner.address.city,
          state: owner.address.state,
          country_code: owner.address.countryCode,
          line1: owner.address.line1,
          line2: owner.address.line2,
          zip_code: owner.address.zipCode,
          neighborhood: owner.address.neighborhood,
          line3: owner.address.line3,
        },
      };

      const response = await this.paymentGateway.createSellerPF(
        body,
        authToken,
      );

      return {
        ioSellerId: response.data.io_seller_id,
        taxpayerId: response.data.taxpayer_id,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
