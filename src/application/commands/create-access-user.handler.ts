import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateAccessUserCommand } from "./dtos/create-access-user.command";
import type { IAccessUserRepository } from "@infrastructure/repositories/interfaces/access-user-repository.interface";
import type { IHashAdapter } from "@infrastructure/adapters/bcrypt/hash-adapter.interface";
import { AccessUser } from "@domain/access-user/access-user.aggregate";
import { AccessUserID } from "@domain/access-user/access-user-id.value";
import { Email } from "@domain/@shared/value-objects/email.value";
import { Phone } from "@domain/@shared/value-objects/phone.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";

@CommandHandler(CreateAccessUserCommand)
export class CreateAccessUserHandler implements ICommandHandler<
  CreateAccessUserCommand,
  { id: number }
> {
  constructor(
    @Inject("AccessUserRepository")
    private readonly accessUserRepository: IAccessUserRepository,
    @Inject("HashAdapter")
    private readonly hashAdapter: IHashAdapter,
  ) {}

  async execute(command: CreateAccessUserCommand): Promise<{ id: number }> {
    const { name, document, email, phone, password } = command;

    const existing = await this.accessUserRepository.findByEmail(email);

    if (existing) {
      throw new Error("AccessUser already exists");
    }

    const hashedPassword = await this.hashAdapter.hash(password);

    const accessUser = AccessUser.create(
      new AccessUserID(0),
      new Email(email),
      name,
      phone ? new Phone(phone) : undefined,
      new Cpf(document),
    );

    accessUser.changePassword(hashedPassword);
    await this.accessUserRepository.save(accessUser);

    return { id: accessUser.getId().getValue() };
  }
}
