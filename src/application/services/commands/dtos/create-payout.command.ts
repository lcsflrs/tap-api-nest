import { Command } from "@nestjs/cqrs";

export class CreatePayoutCommand extends Command<{
  id: string;
}> {
  constructor(
    public readonly clientId: string,
    public readonly items: Array<{
      amountInCents: number;
      consumptionId: string;
    }>,
  ) {
    super();
  }
}
