import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { RegisterWalletCommand } from "./dtos/register-wallet.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";

@CommandHandler(RegisterWalletCommand)
export class RegisterWalletHandler implements ICommandHandler<RegisterWalletCommand> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(command: RegisterWalletCommand): Promise<void> {
    const { customerId } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    if (customer.wallet) {
      return;
    }

    customer.registerWallet();

    await this.customerRepository.saveWallet(customer);
  }
}
