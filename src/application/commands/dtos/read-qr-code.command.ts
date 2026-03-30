import { Command } from "@nestjs/cqrs";

export class ReadQrCodeCommand extends Command<{
  transactionId: string;
}> {
  constructor(
    public readonly paymentTokenJwt: string,
    public readonly workerId: number,
  ) {
    super();
  }
}
