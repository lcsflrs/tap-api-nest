import { Customer } from "@domain/customer/customer.aggregate";
import { CustomerID } from "@domain/customer/customer-id.value";
import { Email } from "@domain/@shared/value-objects/email.value";
import { Phone } from "@domain/@shared/value-objects/phone.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";
import { CustomerWallet } from "@domain/customer/customer-wallet.entity";
import { CreditCard } from "@domain/customer/credit-card.entity";

export class CustomerMapper {
  static toDomain(customer: any): Customer {
    return new Customer(
      new CustomerID(customer.id),
      customer.name,
      Email.create(customer.email),
      customer.phone ? Phone.create(customer.phone) : undefined,
      customer.document ? Cpf.create(customer.document) : undefined,
      customer.wallet
        ? CustomerWallet.fromJSON({
            customerId: customer.wallet.customerId,
            balance: customer.wallet.balance,
            defaultCreditCardId: customer.wallet.defaultCreditCardId,
            defaultPaymentMethod: customer.wallet.defaultPaymentMethod,
          })
        : undefined,
      customer.creditCards?.map((card: any) =>
        CreditCard.fromJSON({
          ...card,
          createdAt: card.createdAt,
          updatedAt: card.updatedAt,
        }),
      ) ?? [],
      customer.ioCustomerId ?? undefined,
    );
  }

  static toPersistence(customer: Customer) {
    return {
      id: customer.getId().getValue(),
      name: customer.name,
      email: customer.email.getValue(),
      phone: customer.phone?.getValue(),
      document: customer.document?.getValue(),
      ioCustomerId: customer.ioCustomerId ?? null,
      wallet: customer.wallet
        ? {
            customerId: customer.wallet.customerId.getValue(),
            balance: customer.wallet.balance.getValue(),
            defaultCreditCardId: customer.wallet.defaultCreditCardId ?? null,
            defaultPaymentMethod:
              customer.wallet.defaultPaymentMethod?.getValue() ?? null,
          }
        : null,
      creditCards: customer.creditCards.map((card) => card.toJSON()),
    };
  }
}
