import { Command } from "@nestjs/cqrs";

export class AuthenticateCardCommand extends Command<void> {
  constructor(
    public readonly customerId: number,
    public readonly creditCardId: number,
    public readonly centsAmount: number,
  ) {
    super();
  }
}
