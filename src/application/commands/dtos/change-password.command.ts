import { Command } from "@nestjs/cqrs";

export class ChangePasswordCommand extends Command<void> {
  constructor(
    public readonly accessUserId: number,
    public readonly newPassword: string,
  ) {
    super();
  }
}
