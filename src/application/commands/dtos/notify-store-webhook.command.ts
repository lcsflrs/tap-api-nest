import { Command } from "@nestjs/cqrs";

export class NotifyStoreWebhookCommand extends Command<void> {
  constructor(
    public readonly transactionId: string,
    public readonly referenceId: string,
    public readonly ioSellerId: string,
    public readonly signConfirm: string,
    public readonly amountInCents: number,
    public readonly storeId: number,
  ) {
    super();
  }
}
