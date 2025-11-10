import { Command } from "@nestjs/cqrs";

export class AddItemToPayoutCommand extends Command<{ id: string }> {
  constructor(
    public readonly id: string,
    public readonly amountInCents: number,
    public readonly consumptionId: string,
  ) {
    super();
  }
}
