import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SetDefaultPaymentMethodCommand } from "./dtos/set-default-payment-method.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import { PaymentMethod } from "@domain/@shared/value-objects/payment-method.value";

@CommandHandler(SetDefaultPaymentMethodCommand)
export class SetDefaultPaymentMethodHandler implements ICommandHandler<SetDefaultPaymentMethodCommand> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(command: SetDefaultPaymentMethodCommand) {
    const { customerId, paymentMethod, cardId } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("customer not found");
    }

    if (!customer.wallet) {
      throw new Error("wallet not found");
    }

    if (paymentMethod === "card") {
      if (!cardId) {
        throw new Error("cardId is required when paymentMethod is card");
      }

      const card = customer.creditCards.find((c) => c.cardId === cardId);

      if (!card) {
        throw new Error("credit card not found");
      }

      customer.wallet.setDefaultPaymentMethod(PaymentMethod.fromString("card"));
      customer.wallet.setDefaultCreditCardId(cardId);

      await this.customerRepository.saveWallet(customer);

      return {
        message: "default card updated successfully!",
        cardId,
        paymentMethod: "card",
      };
    }

    if (paymentMethod === "balance") {
      customer.wallet.setDefaultPaymentMethod(
        PaymentMethod.fromString("balance"),
      );

      await this.customerRepository.saveWallet(customer);

      return {
        message: "default balance updated successfully!",
        paymentMethod: "balance",
      };
    }

    throw new Error("invalid payment method");
  }
}
