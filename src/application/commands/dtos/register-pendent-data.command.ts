import { Command } from "@nestjs/cqrs";

export class RegisterPendentDataCommand extends Command<{
  partiesInvited: number[];
}> {
  constructor(
    public readonly customerId: number,
    public readonly document: string,
    public readonly phone: string,
  ) {
    super();
  }
}
