import { Command } from "@nestjs/cqrs";

export class RegisterWalletCommand extends Command<void> {
  constructor(public readonly customerId: number) {
    super();
  }
}
