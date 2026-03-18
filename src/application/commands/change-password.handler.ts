import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { ChangePasswordCommand } from "./dtos/change-password.command";
import type { IAccessUserRepository } from "@infrastructure/repositories/interfaces/access-user-repository.interface";
import type { IHashAdapter } from "@infrastructure/adapters/bcrypt/hash-adapter.interface";
import { AccessUserID } from "@domain/access-user/access-user-id.value";

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
  constructor(
    @Inject("AccessUserRepository")
    private readonly accessUserRepository: IAccessUserRepository,
    @Inject("HashAdapter")
    private readonly hashAdapter: IHashAdapter,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<void> {
    const { accessUserId, newPassword } = command;

    const accessUser = await this.accessUserRepository.findById(
      new AccessUserID(accessUserId),
    );

    if (!accessUser) {
      throw new Error("AccessUser not found");
    }

    const hashedPassword = await this.hashAdapter.hash(newPassword);
    accessUser.changePassword(hashedPassword);

    await this.accessUserRepository.save(accessUser);
  }
}
