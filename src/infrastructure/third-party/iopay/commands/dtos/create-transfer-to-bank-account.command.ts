import { Command } from "@nestjs/cqrs";

export interface CreateTransferToBankAccountResult {
  transferId: number;
  amount: number;
  bankAccountId: number;
}

export class CreateTransferToBankAccountCommand extends Command<CreateTransferToBankAccountResult> {
  constructor(
    public readonly amount: number,
    public readonly description: string,
    public readonly statementDescriptor: string,
    public readonly bankAccountId: number,
  ) {
    super();
  }
}
