import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateShopCommand } from "./dtos/create-shop.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import { Shop } from "@domain/store/shop.entity";
import { ShopID } from "@domain/store/shop-id.value";
import { StoreID } from "@domain/store/store-id.value";

@CommandHandler(CreateShopCommand)
export class CreateShopHandler implements ICommandHandler<CreateShopCommand> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(command: CreateShopCommand): Promise<void> {
    const { storeId, name } = command;
    const store = await this.storeRepository.findById(storeId);

    if (!store) {
      throw new Error("Store not found");
    }

    const shop = Shop.create(new ShopID(0), new StoreID(storeId), name);

    await this.storeRepository.createShop(shop);
  }
}
