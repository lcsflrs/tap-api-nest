import { Command } from "@nestjs/cqrs";

export class MarkPayoutPaidCommand extends Command<{ id: string }> {
  constructor(
    public readonly id: string,
    public readonly proofFileUrl: string,
  ) {
    super();
  }
}
