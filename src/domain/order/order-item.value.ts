import { ValueObject } from "@domain/@shared/interfaces/value-object.interface";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import {
  ShopProduct,
  ShopProductJSON,
} from "@domain/store/shop-product.entity";

export class OrderItem implements ValueObject<OrderItemJSON> {
  constructor(
    private readonly _shopProduct: ShopProduct,
    private readonly _quantity: number,
    private readonly _unitPriceInCents: Cents,
  ) {}

  static create(shopProduct: ShopProduct, quantity: number): OrderItem {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    if (!shopProduct.isAvailable) {
      throw new Error("Product is not available");
    }

    if (shopProduct.priceInCents.getValue() <= 0) {
      throw new Error("Price must be greater than 0");
    }

    return new OrderItem(shopProduct, quantity, shopProduct.priceInCents);
  }

  static fromJSON(json: OrderItemJSON): OrderItem {
    return new OrderItem(
      ShopProduct.fromJSON(json.shopProduct),
      json.quantity,
      Cents.create(json.productPriceInCents),
    );
  }

  toJSON(): OrderItemJSON {
    return {
      shopProduct: this._shopProduct.toJSON(),
      quantity: this._quantity,
      productPriceInCents: this._unitPriceInCents.getValue(),
    };
  }

  getValue(): OrderItemJSON {
    return this.toJSON();
  }

  equals(other: OrderItem): boolean {
    return (
      this._shopProduct.shopProductId.equals(
        other._shopProduct.shopProductId,
      ) &&
      this._quantity === other._quantity &&
      this._unitPriceInCents.equals(other._unitPriceInCents)
    );
  }

  get shopProduct(): ShopProduct {
    return this._shopProduct;
  }

  get quantity(): number {
    return this._quantity;
  }

  get unitPriceInCents(): Cents {
    return this._unitPriceInCents;
  }

  get totalInCents(): Cents {
    return Cents.create(this._unitPriceInCents.getValue() * this._quantity);
  }
}

export interface OrderItemJSON {
  shopProduct: ShopProductJSON;
  quantity: number;
  productPriceInCents: number;
}
