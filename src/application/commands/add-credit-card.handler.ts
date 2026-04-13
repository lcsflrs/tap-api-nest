import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AddCreditCardCommand } from "./dtos/add-credit-card.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import { CreditCard } from "@domain/customer/credit-card.entity";
import { CreditCardID } from "@domain/customer/credit-card-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import {
  PaymentMethod,
  PaymentMethodType,
} from "@domain/@shared/value-objects/payment-method.value";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import type { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import {
  CreateCustomerCommand,
  CreateCustomerResult,
} from "@infrastructure/third-party/iopay/commands/dtos/create-customer.command";
import {
  ExecuteCreditTransactionCommand,
  ExecuteCreditTransactionResult,
} from "@infrastructure/third-party/iopay/commands/dtos/execute-credit-transaction.command";
import { RefundTransactionCommand } from "@infrastructure/third-party/iopay/commands/dtos/refund-transaction.command";

@CommandHandler(AddCreditCardCommand)
export class AddCreditCardHandler implements ICommandHandler<
  AddCreditCardCommand,
  {
    creditCardId: number;
    customerId: number;
    cardId: string;
    cardBrand: string;
    first4Digits: string;
    last4Digits: string;
    expirationMonth: string;
    expirationYear: string;
    holderName: string;
  }
> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: AddCreditCardCommand) {
    const {
      customerId,
      first4Digits,
      last4Digits,
      expirationMonth,
      expirationYear,
      cardId,
      cardToken,
      cardBrand,
      holderName,
    } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.wallet) {
      throw new Error("Customer wallet not found");
    }

    if (!customer.ioCustomerId) {
      const result = await this.commandBus.execute<
        CreateCustomerCommand,
        CreateCustomerResult
      >(
        new CreateCustomerCommand(
          customer.name,
          customer.email.getValue(),
          customer.phone?.getValue(),
          customer.document?.getValue(),
        ),
      );

      await this.customerRepository.updateIoCustomerId(
        customerId,
        result.ioCustomerId,
      );
      customer.setIoCustomerId(result.ioCustomerId);
    }

    const ioCustomerId = customer.ioCustomerId!;

    const authResponse = await this.paymentGateway.getAuthToken();
    const authToken: string = authResponse.data.access_token;

    const specialTokenResponse = await this.paymentGateway.getSpecialToken();
    const specialToken: string = specialTokenResponse.data.access_token;

    await this.paymentGateway.associateCardWithCustomer(
      ioCustomerId,
      cardToken,
      specialToken,
    );

    await this.paymentGateway.updateCustomerEmail(
      ioCustomerId,
      "fakepein@gmail.com",
      authToken,
    );

    const isProd = process.env.NODE_ENV === "production";
    const verificationAmountInCents = isProd
      ? Math.floor(Math.random() * 299) + 1
      : 100;

    const { transactionId } = await this.commandBus.execute<
      ExecuteCreditTransactionCommand,
      ExecuteCreditTransactionResult
    >(
      new ExecuteCreditTransactionCommand(
        ioCustomerId,
        cardId,
        verificationAmountInCents,
        1,
        `card-verify-${customerId}-${Date.now()}`,
        "Estorno de pagamento",
        "Verificação de cartão",
        [
          {
            id: "0",
            name: "Estorno de pagamento",
            priceInCents: verificationAmountInCents,
            quantity: 1,
          },
        ],
      ),
    );

    await this.commandBus.execute(
      new RefundTransactionCommand(transactionId, verificationAmountInCents),
    );

    const creditCard = CreditCard.create(
      new CreditCardID(0),
      new CustomerID(customerId),
      cardId,
      cardToken,
      first4Digits,
      last4Digits,
      cardBrand,
      expirationMonth,
      expirationYear,
      holderName,
    );

    creditCard.markAsAuthenticated(verificationAmountInCents, transactionId);
    customer.addCreditCard(creditCard);
    customer.wallet.setDefaultCreditCardId(cardId);
    customer.wallet.setDefaultPaymentMethod(
      PaymentMethod.create(PaymentMethodType.CREDIT_CARD),
    );

    await this.customerRepository.save(customer);

    const saved = customer.creditCards.find((c) => c.cardId === cardId)!;

    return {
      creditCardId: saved.getId().getValue(),
      customerId,
      cardId,
      cardBrand,
      first4Digits,
      last4Digits,
      expirationMonth,
      expirationYear,
      holderName,
    };
  }
}
