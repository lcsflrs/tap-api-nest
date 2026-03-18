import { Command } from "@nestjs/cqrs";

export class ConfirmPixPaymentCommand extends Command<void> {
  constructor(
    public readonly transactionId: string,
    public readonly referenceId: string,
    public readonly signConfirm: string,
    public readonly ioSellerId: string,
  ) {
    super();
  }
}
