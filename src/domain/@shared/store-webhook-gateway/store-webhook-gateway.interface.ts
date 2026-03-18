export interface IStoreWebhookGateway {
  notify(
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
  ): Promise<void>;
}
