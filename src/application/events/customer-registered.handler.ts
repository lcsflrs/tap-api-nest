import { EventsHandler, IEventHandler, CommandBus } from "@nestjs/cqrs";
import { Inject, Logger } from "@nestjs/common";
import { CustomerRegisteredEvent } from "@domain/customer/events/customer-registered.event";
import type { ICustomerRepository } from "@infrastructure/repositories/interfaces/customer-repository.interface";
import {
  CreateCustomerCommand,
  CreateCustomerResult,
} from "@infrastructure/third-party/iopay/commands/dtos/create-customer.command";

@EventsHandler(CustomerRegisteredEvent)
export class PaymentCustomerEventHandler implements IEventHandler<CustomerRegisteredEvent> {
  private readonly logger = new Logger(PaymentCustomerEventHandler.name);

  constructor(
    @Inject("CustomerRepository")
    private readonly customerRepository: ICustomerRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: CustomerRegisteredEvent): Promise<void> {
    try {
      const { ioCustomerId } = await this.commandBus.execute<
        CreateCustomerCommand,
        CreateCustomerResult
      >(
        new CreateCustomerCommand(
          event.name,
          event.email,
          event.phone,
          event.document,
        ),
      );

      await this.customerRepository.updateIoCustomerId(
        event.customerId,
        ioCustomerId,
      );
    } catch (err: any) {
      this.logger.error(
        `[PaymentCustomerEventHandler] Fatal error: ${err.message}`,
      );
    }
  }
}
