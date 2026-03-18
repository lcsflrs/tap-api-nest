import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { ShopProductID } from "@domain/store/shop-product-id.value";
import { StoreSaleID } from "./store-sale-id.value";
import { StoreSaleProductID } from "./store-sale-product-id.value";

export class StoreSaleProduct extends Entity<StoreSaleProductID> {
  constructor(
    id: StoreSaleProductID,
    private readonly _storeSaleId: StoreSaleID,
    private readonly _shopProductId: ShopProductID,
    private readonly _quantity: number,
    private readonly _priceInCents: Cents,
    private readonly _totalInCents: Cents,
  ) {
    super(id);
  }

  static create(
    id: StoreSaleProductID,
    storeSaleId: StoreSaleID,
    shopProductId: ShopProductID,
    quantity: number,
    priceInCents: number,
  ): StoreSaleProduct {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    if (priceInCents <= 0) {
      throw new Error("Price must be greater than 0");
    }

    const price = Cents.create(priceInCents);
    const total = Cents.create(price.getValue() * quantity);

    return new StoreSaleProduct(
      id,
      storeSaleId,
      shopProductId,
      quantity,
      price,
      total,
    );
  }

  static fromJSON(json: StoreSaleProductJSON): StoreSaleProduct {
    return new StoreSaleProduct(
      new StoreSaleProductID(json.id),
      new StoreSaleID(json.storeSaleId),
      new ShopProductID(json.shopProductId),
      json.quantity,
      Cents.create(json.priceInCents),
      Cents.create(json.totalInCents),
    );
  }

  toJSON(): StoreSaleProductJSON {
    return {
      id: this.id.getValue(),
      storeSaleId: this._storeSaleId.getValue(),
      shopProductId: this._shopProductId.getValue(),
      quantity: this._quantity,
      priceInCents: this._priceInCents.getValue(),
      totalInCents: this._totalInCents.getValue(),
    };
  }

  get storeSaleId(): StoreSaleID {
    return this._storeSaleId;
  }

  get shopProductId(): ShopProductID {
    return this._shopProductId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get priceInCents(): Cents {
    return this._priceInCents;
  }

  get totalInCents(): Cents {
    return this._totalInCents;
  }
}

export interface StoreSaleProductJSON {
  id: number;
  storeSaleId: number;
  shopProductId: number;
  quantity: number;
  priceInCents: number;
  totalInCents: number;
}
