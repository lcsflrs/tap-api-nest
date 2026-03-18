import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import {
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult,
} from "./dtos/execute-credit-transaction.command";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { BodyCreateCreditTransactionWithSplitDTO } from "@domain/@shared/payment-gateway/payment-gateway.dto";

@CommandHandler(ExecuteCreditTransactionCommand)
export class ExecuteCreditTransactionHandler implements ICommandHandler<
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult
> {
  constructor(
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(
    command: ExecuteCreditTransactionCommand,
  ): Promise<ExecuteCreditTransactionResult> {
    const {
      ioCustomerId,
      cardId,
      totalInCents,
      installments,
      orderId,
      description,
      statementDescriptor,
      products,
    } = command;

    try {
      const specialTokenResponse = await this.paymentGateway.getSpecialToken();
      const specialToken: string = specialTokenResponse.data.access_token;

      const productsMapped = products.map((product) => ({
        code: product.id,
        name: product.name,
        amount: product.priceInCents,
        quantity: product.quantity,
      }));

      // TODO: implementar split_rules quando ioSellerId estiver disponível
      const splitRules = undefined;

      const body: BodyCreateCreditTransactionWithSplitDTO = {
        amount: totalInCents,
        id_card: cardId,
        installment_plan: {
          number_installments: installments,
        },
        products: productsMapped,
        capture: 1,
        currency: "BRL",
        payment_type: "credit",
        description,
        statement_descriptor: statementDescriptor,
        io_seller_id: this.paymentGateway.getPaymentIoSellerId(),
        reference_id: orderId,
        split_rules: splitRules,
        // split_rules: [
        //   {
        //     receiver: storeIoSellerId,
        //     split_type: 'percentage',
        //     receiver_fee_type: 'free',
        //     split_value: 92,
        //   },
        // ],
      };

      const response =
        await this.paymentGateway.createCreditTransactionWithSplit(
          ioCustomerId,
          body,
          specialToken,
        );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ?? "No response data from credit transaction",
        );
      }

      return {
        transactionId: response.data.success.id,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }
}
