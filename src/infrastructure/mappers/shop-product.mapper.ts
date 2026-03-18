import { ShopProduct } from "@domain/store/shop-product.entity";

export class ShopProductMapper {
  static toDomain(shopProduct: any): ShopProduct {
    return ShopProduct.fromJSON({
      shopProductId: shopProduct.id,
      productId: shopProduct.productId ?? null,
      shopId: shopProduct.shopId,
      name: shopProduct.product?.name ?? null,
      priceInCents: shopProduct.priceInCents,
      isAvailable: shopProduct.isActive ?? true,
    });
  }

  static toPersistence(product: ShopProduct) {
    return {
      shopId: product.shopId.getValue(),
      productId: product.productId?.getValue() ?? null,
      priceInCents: product.priceInCents.getValue(),
      isActive: product.isAvailable,
    };
  }
}
