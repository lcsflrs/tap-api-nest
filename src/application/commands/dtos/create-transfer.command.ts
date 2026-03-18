import { Command } from "@nestjs/cqrs";

export class CreateTransferCommand extends Command<{
  transferId: number;
  amountInCents: number;
  bankAccountId: number;
}> {
  constructor(
    public readonly storeId: number,
    public readonly amountInCents: number,
  ) {
    super();
  }
}
