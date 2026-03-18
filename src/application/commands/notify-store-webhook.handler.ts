import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { NotifyStoreWebhookCommand } from "./dtos/notify-store-webhook.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import type { IPixTransactionRepository } from "@infrastructure/repositories/interfaces/pix-transaction-repository.interface";
import { STORE_WEBHOOK_GATEWAY_TOKEN } from "@domain/@shared/store-webhook-gateway/store-webhook-gateway.token";
import type { IStoreWebhookGateway } from "@domain/@shared/store-webhook-gateway/store-webhook-gateway.interface";

@CommandHandler(NotifyStoreWebhookCommand)
export class NotifyStoreWebhookHandler implements ICommandHandler<
  NotifyStoreWebhookCommand,
  void
> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
    @Inject("PixTransactionRepository")
    private readonly pixTransactionRepository: IPixTransactionRepository,
    @Inject(STORE_WEBHOOK_GATEWAY_TOKEN)
    private readonly storeWebhookGateway: IStoreWebhookGateway,
  ) {}

  async execute(command: NotifyStoreWebhookCommand): Promise<void> {
    const {
      storeId,
      transactionId,
      referenceId,
      amountInCents,
      signConfirm,
      ioSellerId,
    } = command;

    const webhookUrl = await this.storeRepository.findWebhookById(storeId);

    if (!webhookUrl) {
      throw new Error("Webhook URL not configured");
    }

    await this.storeWebhookGateway.notify(webhookUrl, {
      transactionId,
      referenceId,
      amountInCents,
      status: "paid",
      paidAt: new Date().toISOString(),
      signConfirm,
      ioSellerId,
    });

    await this.pixTransactionRepository.updatePixTransactionStatus(
      transactionId,
      "paid",
    );
  }
}
