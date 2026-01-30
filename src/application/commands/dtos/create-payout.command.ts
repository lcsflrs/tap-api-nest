import { Command } from "@nestjs/cqrs";

export class CreatePayoutCommand extends Command<{
  id: string;
}> {
  constructor(
    public readonly storeId: number,
    public readonly storeName: string,
    public readonly storeSaleIds: number[],
    public readonly proofFileUrl: string,
  ) {
    super();
  }
}
