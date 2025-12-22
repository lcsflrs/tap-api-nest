import { Command } from "@nestjs/cqrs";

export class CreateAdjustmentCommand extends Command<{
  id: string;
}> {
  constructor(
    public readonly clientId: string,
    public readonly valueInCents: number,
    public readonly reason: string,
    public readonly type: string,
    public readonly attachment?: string,
  ) {
    super();
  }
}
