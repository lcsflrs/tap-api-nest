import { CommandHandler, ICommandHandler, EventBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { RegisterPendentDataCommand } from "./dtos/register-pendent-data.command";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import type { IPartyRepository } from "@infrastructure/repositories/interfaces/party-repository.interface";
import { CustomerRegisteredEvent } from "@domain/customer/events/customer-registered.event";

@CommandHandler(RegisterPendentDataCommand)
export class RegisterPendentDataHandler implements ICommandHandler<RegisterPendentDataCommand> {
  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    @Inject("PartyRepository")
    private readonly partyRepository: IPartyRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RegisterPendentDataCommand) {
    const { customerId, document, phone } = command;

    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new Error("Customer not found");
    }

    const cleanDocument = document.replace(/\D/g, "");
    const cleanPhone = phone.replace(/\D/g, "");

    customer.updatePendentData(cleanDocument, cleanPhone);

    await this.customerRepository.update(customer);

    this.eventBus.publish(
      new CustomerRegisteredEvent(
        customerId,
        customer.name,
        customer.email.getValue(),
        cleanPhone,
        cleanDocument,
      ),
    );

    const partiesInvited = await this.partyRepository.linkInvitesByPhone(
      cleanPhone,
      customerId,
    );

    return { partiesInvited };
  }
}
