import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  CreateCustomerCommand,
  CreateCustomerResult,
} from "./dtos/create-customer.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import type { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { BodyCreateCustomerDTO } from "@domain/@shared/payment-gateway/payment-gateway.dto";
import { formatPhoneForIopay } from "src/utils/third-party/format-phone-for-iopay";

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<
  CreateCustomerCommand,
  CreateCustomerResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<CreateCustomerResult> {
    const { name, email, phone, document } = command;

    try {
      const authResponse = await this.paymentGateway.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const customerPayload: BodyCreateCustomerDTO = {
        token: authToken,
        customer: {
          first_name: name,
          email,
          taxpayer_id: document ?? "",
          phone_number: phone ? formatPhoneForIopay(phone) : "",
          // TODO: endereço deve ser dinâmico quando Iopay exigir
          address: {
            line1: "Rua Orobo",
            line2: "109",
            line3: "-------",
            neighborhood: "Alto de Pinheiros",
            city: "São Paulo",
            state: "SP",
            postal_code: "05466-030",
          },
        },
      };

      const customerResponse =
        await this.paymentGateway.createCustomer(customerPayload);

      return {
        ioCustomerId: customerResponse.data.success.id,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
