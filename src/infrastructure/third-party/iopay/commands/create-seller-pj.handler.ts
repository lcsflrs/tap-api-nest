import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  CreateSellerPJCommand,
  CreateSellerPJResult,
} from "./dtos/create-seller-pj.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { BodyCreateSellerPJDTO } from "@domain/@shared/payment-gateway/payment-gateway.dto";
import { formatPhoneForIopay } from "src/utils/third-party/format-phone-for-iopay";

@CommandHandler(CreateSellerPJCommand)
export class CreateSellerPJHandler implements ICommandHandler<
  CreateSellerPJCommand,
  CreateSellerPJResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: CreateSellerPJCommand): Promise<CreateSellerPJResult> {
    const { owner, store } = command;

    if (!store.isPJ()) {
      throw new Error(
        "[IOPAY_GATEWAY] Store must be PJ to register as business seller",
      );
    }

    if (!owner.document) {
      throw new Error(
        "[IOPAY_GATEWAY] Owner document is required for PJ seller registration",
      );
    }

    if (!owner.birthdate) {
      throw new Error(
        "[IOPAY_GATEWAY] Owner birthdate is required for PJ seller registration",
      );
    }

    if (store.mcc === null) {
      throw new Error(
        "[IOPAY_GATEWAY] Store MCC is required for PJ seller registration",
      );
    }

    if (!store.statementDescriptor) {
      throw new Error(
        "[IOPAY_GATEWAY] Store statement descriptor is required for PJ seller registration",
      );
    }

    if (!store.businessDocument) {
      throw new Error(
        "[IOPAY_GATEWAY] Store business document (CNPJ) is required for PJ seller registration",
      );
    }

    if (!store.email) {
      throw new Error(
        "[IOPAY_GATEWAY] Store email is required for PJ seller registration",
      );
    }

    if (!store.businessName) {
      throw new Error(
        "[IOPAY_GATEWAY] Store business name is required for PJ seller registration",
      );
    }

    if (!store.openDate) {
      throw new Error(
        "[IOPAY_GATEWAY] Store open date is required for PJ seller registration",
      );
    }

    if (!store.phone) {
      throw new Error(
        "[IOPAY_GATEWAY] Store phone is required for PJ seller registration",
      );
    }

    if (!store.website) {
      throw new Error(
        "[IOPAY_GATEWAY] Store website is required for PJ seller registration",
      );
    }

    if (!store.address) {
      throw new Error(
        "[IOPAY_GATEWAY] Store address is required for PJ seller registration",
      );
    }

    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const body: BodyCreateSellerPJDTO = {
        mcc: store.mcc,
        statement_descriptor: store.statementDescriptor,
        owner: {
          first_name: owner.name,
          last_name: owner.lastName,
          cpf: owner.document.getValue(),
          email: owner.email.getValue(),
          phone_number: formatPhoneForIopay(owner.phone.getValue()),
          birthdate: owner.birthdate.toISOString().split("T")[0],
        },
        owner_address: {
          city: owner.address.city,
          state: owner.address.state,
          country_code: owner.address.countryCode,
          line1: owner.address.line1,
          line2: owner.address.line2,
          line3: owner.address.line3,
          neighborhood: owner.address.neighborhood,
          zip_code: owner.address.zipCode,
        },
        business: {
          cnpj: store.businessDocument.getValue(),
          email: store.email.getValue(),
          name: store.businessName,
          opening_date: store.openDate.toISOString().split("T")[0],
          phone_number: formatPhoneForIopay(store.phone.getValue()),
          website: store.website.getValue(),
        },
        business_address: {
          city: store.address.city,
          state: store.address.state,
          country_code: store.address.countryCode,
          line1: store.address.line1,
          line2: store.address.line2,
          line3: store.address.line3,
          neighborhood: store.address.neighborhood,
          zip_code: store.address.zipCode,
        },
      };

      const response = await this.paymentGateway.createSellerPJ(
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
