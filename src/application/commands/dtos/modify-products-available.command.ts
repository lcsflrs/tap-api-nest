import { Command } from "@nestjs/cqrs";

export class ModifyProductsAvailableCommand extends Command<void> {
  constructor(
    public readonly shopId: number,
    public readonly productsAvailableId: number[],
  ) {
    super();
  }
}
