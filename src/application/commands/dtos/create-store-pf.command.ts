import { Command } from "@nestjs/cqrs";

export class CreateStorePFCommand extends Command<void> {
  constructor(
    public readonly name: string,
    public readonly ownerDocument: string,
    public readonly statementDescriptor: string,
    public readonly mcc: number,
    public readonly email?: string,
    public readonly phone?: string,
  ) {
    super();
  }
}
