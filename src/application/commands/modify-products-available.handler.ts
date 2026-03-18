import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { ModifyProductsAvailableCommand } from "./dtos/modify-products-available.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";

@CommandHandler(ModifyProductsAvailableCommand)
export class ModifyProductsAvailableHandler implements ICommandHandler<ModifyProductsAvailableCommand> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(command: ModifyProductsAvailableCommand): Promise<void> {
    const { shopId, productsAvailableId } = command;

    const shop = await this.storeRepository.findShopById(shopId);

    if (!shop) {
      throw new Error("Shop not found");
    }

    await this.storeRepository.modifyProductsAvailable(
      shopId,
      productsAvailableId,
    );
  }
}
