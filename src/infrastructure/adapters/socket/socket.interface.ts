export interface ISocketService {
  emitOrderUpdate(
    orderId: string,
    status: "processing" | "paid" | "error_payment",
  ): void;
  emitPaymentTokenStatus(socketId: string, status: string): void;
  emitToParty(channel: string, data: unknown): void;
  emitPaymentTokenUpdate(paymentTokenId: string, status: string): void;
}
