import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { ShopProductID } from "./shop-product-id.value";
import { ProductID } from "@domain/product/product-id.value";
import { ShopID } from "./shop-id.value";
import { Cents } from "@domain/@shared/value-objects/cents.value";

export class ShopProduct extends Entity<ShopProductID> {
  constructor(
    id: ShopProductID,
    private readonly _productId: ProductID | null,
    private readonly _shopId: ShopID,
    private readonly _name: string | null,
    private readonly _priceInCents: Cents,
    private readonly _isAvailable: boolean,
  ) {
    super(id);
  }

  static create(
    shopProductId: ShopProductID,
    productId: ProductID | null,
    shopId: ShopID,
    name: string | null,
    priceInCents: number,
    isAvailable: boolean,
  ): ShopProduct {
    if (priceInCents <= 0) {
      throw new Error("Price must be greater than 0");
    }

    return new ShopProduct(
      shopProductId,
      productId,
      shopId,
      name,
      Cents.create(priceInCents),
      isAvailable,
    );
  }

  static fromJSON(json: ShopProductJSON): ShopProduct {
    return new ShopProduct(
      new ShopProductID(json.shopProductId),
      json.productId ? new ProductID(json.productId) : null,
      new ShopID(json.shopId),
      json.name ?? null,
      Cents.create(json.priceInCents),
      json.isAvailable,
    );
  }

  toJSON(): ShopProductJSON {
    return {
      shopProductId: this.id.getValue(),
      productId: this._productId?.getValue() ?? null,
      shopId: this._shopId.getValue(),
      name: this._name,
      priceInCents: this._priceInCents.getValue(),
      isAvailable: this._isAvailable,
    };
  }

  get shopProductId(): ShopProductID {
    return this.id;
  }

  get productId(): ProductID | null {
    return this._productId;
  }

  get shopId(): ShopID {
    return this._shopId;
  }

  get name(): string | null {
    return this._name;
  }

  get priceInCents(): Cents {
    return this._priceInCents;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }
}

export interface ShopProductJSON {
  shopProductId: number;
  productId?: number | null;
  shopId: number;
  name?: string | null;
  priceInCents: number;
  isAvailable: boolean;
}
