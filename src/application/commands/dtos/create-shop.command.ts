import { Command } from "@nestjs/cqrs";

export class CreateShopCommand extends Command<void> {
  constructor(
    public readonly storeId: number,
    public readonly name: string,
  ) {
    super();
  }
}
