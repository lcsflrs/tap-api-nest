import { Command } from "@nestjs/cqrs";

export class AddBalanceCommand extends Command<void> {
  constructor(
    public readonly customerId: number,
    public readonly amountInCents: number,
    public readonly transactionId: string,
    public readonly referenceId: string,
    public readonly description?: string,
  ) {
    super();
  }
}
