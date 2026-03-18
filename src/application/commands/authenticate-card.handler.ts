import { CommandHandler, ICommandHandler, CommandBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AuthenticateCardCommand } from "./dtos/authenticate-card.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { RefundTransactionCommand } from "@infrastructure/third-party/iopay/commands/dtos/refund-transaction.command";

@CommandHandler(AuthenticateCardCommand)
export class AuthenticateCardHandler implements ICommandHandler<AuthenticateCardCommand> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: AuthenticateCardCommand): Promise<void> {
    const { customerId, creditCardId, centsAmount } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.ioCustomerId) {
      throw new Error("Customer has no ioCustomerId");
    }

    const creditCard = customer.creditCards.find(
      (c) => c.getId().getValue() === creditCardId,
    );

    if (!creditCard) {
      throw new Error("Credit card not found");
    }

    creditCard.confirmAuthentication(centsAmount);

    if (!creditCard.authTransactionId) {
      throw new Error("Credit card has no auth transaction id");
    }

    await this.commandBus.execute(
      new RefundTransactionCommand(creditCard.authTransactionId, centsAmount),
    );

    const authResponse = await this.paymentGateway.getAuthToken();
    const authToken: string = authResponse.data.access_token;

    await this.paymentGateway.updateCustomerEmail(
      customer.ioCustomerId,
      customer.email.getValue(),
      authToken,
    );

    await this.customerRepository.save(customer);
  }
}
