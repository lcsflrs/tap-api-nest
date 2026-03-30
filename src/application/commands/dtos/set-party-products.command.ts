import { Command } from "@nestjs/cqrs";

export class SetPartyProductsCommand extends Command<{
  products: { id: number; name: string; isActive: boolean }[];
}> {
  constructor(
    public readonly partyId: number,
    public readonly productsAvailableId: number[],
  ) {
    super();
  }
}
