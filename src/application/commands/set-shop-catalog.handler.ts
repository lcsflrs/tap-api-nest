import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { SetShopCatalogCommand } from "./dtos/set-shop-catalog.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import { ShopID } from "@domain/store/shop-id.value";

@CommandHandler(SetShopCatalogCommand)
export class SetShopCatalogHandler implements ICommandHandler<SetShopCatalogCommand> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(command: SetShopCatalogCommand): Promise<void> {
    const { shopId, productsList } = command;

    const shop = await this.storeRepository.findShopById(shopId);

    if (!shop) {
      throw new Error("shop not found");
    }

    await this.storeRepository.setShopCatalog(
      new ShopID(shopId),
      productsList.map((p) => ({
        productId: p.productId,
        priceInCents: p.priceInCents,
      })),
    );
  }
}
