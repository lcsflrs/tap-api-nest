import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AddBalanceCommand } from "./dtos/add-balance.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import { Cents } from "@domain/@shared/value-objects/cents.value";

@CommandHandler(AddBalanceCommand)
export class AddBalanceHandler implements ICommandHandler<AddBalanceCommand> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(command: AddBalanceCommand): Promise<void> {
    const {
      customerId,
      amountInCents,
      transactionId,
      referenceId,
      description,
    } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (!customer.wallet) {
      throw new Error("Customer wallet not found");
    }

    customer.wallet.credit(Cents.create(amountInCents));
    await this.customerRepository.save(customer);

    await this.customerRepository.registerWalletTransaction(
      customerId,
      amountInCents,
      "in",
      transactionId,
      referenceId,
      customer.wallet.balance.getValue(),
      description ?? "Saldo adicionado via PIX",
    );
  }
}
