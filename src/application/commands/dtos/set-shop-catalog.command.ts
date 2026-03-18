import { Command } from "@nestjs/cqrs";

export class SetShopCatalogCommand extends Command<void> {
  constructor(
    public readonly shopId: number,
    public readonly productsList: {
      productId: number;
      priceInCents: number;
    }[],
  ) {
    super();
  }
}
