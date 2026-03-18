import {
  CommandHandler,
  ICommandHandler,
  CommandBus,
  EventBus,
} from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateOwnerCommand } from "./dtos/create-owner.command";
import { CreateAccessUserCommand } from "./dtos/create-access-user.command";
import { OwnerRegisteredEvent } from "@domain/owner/events/owner-registered.event";
import type { IOwnerRepository } from "@infrastructure/repositories/interfaces/owner-repository.interface";
import { Owner } from "@domain/owner/owner.aggregate";
import { OwnerID } from "@domain/owner/owner-id.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";
import { Email } from "@domain/@shared/value-objects/email.value";
import { Phone } from "@domain/@shared/value-objects/phone.value";
import { Address } from "@domain/@shared/value-objects/address.value";

@CommandHandler(CreateOwnerCommand)
export class CreateOwnerHandler implements ICommandHandler<CreateOwnerCommand> {
  constructor(
    @Inject("OwnerRepository")
    private readonly ownerRepository: IOwnerRepository,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateOwnerCommand): Promise<void> {
    const { name, lastName, document, email, phone, birthdate, address } =
      command;

    const existing = await this.ownerRepository.findByDocument(document);

    if (existing) {
      throw new Error("Owner already exists");
    }

    const { id: accessUserId } = await this.commandBus.execute<
      CreateAccessUserCommand,
      { id: number }
    >(new CreateAccessUserCommand(name, document, email, phone, document));

    const owner = Owner.create(
      new OwnerID(accessUserId),
      name,
      lastName,
      new Cpf(document),
      new Email(email),
      new Phone(phone),
      birthdate,
      Address.create(
        address.street,
        address.number,
        address.complement,
        address.neighborhood,
        address.city,
        address.state,
        address.countryCode,
        address.zipCode,
      ),
    );

    await this.ownerRepository.save(owner);

    this.eventBus.publish(
      new OwnerRegisteredEvent(
        owner.getId().getValue(),
        owner.name,
        owner.email.getValue(),
        owner.phone.getValue(),
        owner.document?.getValue() ?? "",
      ),
    );
  }
}
