import { Command } from "@nestjs/cqrs";

export interface CreateCustomerResult {
  ioCustomerId: string;
}

export class CreateCustomerCommand extends Command<CreateCustomerResult> {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone?: string,
    public readonly document?: string,
  ) {
    super();
  }
}
