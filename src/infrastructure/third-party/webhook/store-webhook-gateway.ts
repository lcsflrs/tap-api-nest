import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import type { IStoreWebhookGateway } from "@domain/@shared/store-webhook-gateway/store-webhook-gateway.interface";

@Injectable()
export class StoreWebhookGateway implements IStoreWebhookGateway {
  private readonly logger = new Logger(StoreWebhookGateway.name);

  async notify(
    webhookUrl: string,
    payload: {
      transactionId: string;
      referenceId: string;
      amountInCents: number;
      status: "paid";
      paidAt: string;
      signConfirm: string;
      ioSellerId: string;
    },
  ): Promise<void> {
    try {
      await axios.post(webhookUrl, payload);
    } catch (err: any) {
      this.logger.error(
        `[StoreWebhookGateway] Failed to notify: ${err.message}`,
      );
      throw new Error("Failed to notify store webhook");
    }
  }
}
