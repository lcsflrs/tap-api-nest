import { Shop } from "@domain/store/shop.entity";
import { ShopProductMapper } from "./shop-product.mapper";
import { WorkerMapper } from "./worker.mapper";

export class ShopMapper {
  static toDomain(shop: any): Shop {
    return Shop.fromJSON({
      shopId: shop.id,
      storeId: shop.storeId,
      internalName: shop.name,
      catalog: (shop.shopProducts ?? []).map((p: any) =>
        ShopProductMapper.toDomain(p).toJSON(),
      ),
      workers: (shop.shopWorkers ?? []).map((w: any) =>
        WorkerMapper.toDomain(w).toJSON(),
      ),
    });
  }

  static toPersistence(shop: Shop) {
    return {
      storeId: shop.storeId.getValue(),
      name: shop.internalName,
    };
  }
}
