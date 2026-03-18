import { Command } from "@nestjs/cqrs";

export class CreateAccessUserCommand extends Command<{ id: number }> {
  constructor(
    public readonly name: string,
    public readonly document: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly password: string,
    public readonly isFirstAccess: boolean = true,
  ) {
    super();
  }
}
