import { EventsHandler, IEventHandler, CommandBus } from "@nestjs/cqrs";
import { Inject, Logger } from "@nestjs/common";
import { OwnerRegisteredEvent } from "@domain/owner/events/owner-registered.event";
import type { IOwnerRepository } from "@infrastructure/repositories/interfaces/owner-repository.interface";
import {
  CreateCustomerCommand,
  CreateCustomerResult,
} from "@infrastructure/third-party/iopay/commands/dtos/create-customer.command";

@EventsHandler(OwnerRegisteredEvent)
export class PaymentOwnerEventHandler implements IEventHandler<OwnerRegisteredEvent> {
  private readonly logger = new Logger(PaymentOwnerEventHandler.name);

  constructor(
    @Inject("OwnerRepository")
    private readonly ownerRepository: IOwnerRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async handle(event: OwnerRegisteredEvent): Promise<void> {
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

      await this.ownerRepository.updateIoCustomerId(
        event.ownerId,
        ioCustomerId,
      );
    } catch (err: any) {
      this.logger.error(
        `[PaymentOwnerEventHandler] Fatal error: ${err.message}`,
      );
    }
  }
}
