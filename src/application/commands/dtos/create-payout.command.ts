import { Command } from "@nestjs/cqrs";

export class CreatePayoutCommand extends Command<{
  id: string;
}> {
  constructor(
    public readonly shopId: number,
    public readonly shopName: string,
    public readonly storeSaleIds: number[],
    public readonly proofFileUrl: string,
    public readonly date: string,
  ) {
    super();
  }
}
