import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { Cents } from "@domain/@shared/value-objects/cents.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { OrderID } from "@domain/order/order-id.value";
import { ShopID } from "@domain/store/shop-id.value";
import { StoreID } from "@domain/store/store-id.value";
import { StoreSaleID } from "./store-sale-id.value";
import {
  StoreSaleProduct,
  StoreSaleProductJSON,
} from "./store-sale-product.entity";

export type SaleStatus = "paid" | "refunded";

export class StoreSale extends Entity<StoreSaleID> {
  constructor(
    id: StoreSaleID,
    private readonly _storeId: StoreID,
    private readonly _shopId: ShopID,
    private readonly _partyShopId: number | null,
    private readonly _paymentMethodId: number,
    private readonly _customerId: CustomerID | null,
    private readonly _creditCardId: number | null,
    private readonly _orderId: OrderID,
    private _status: SaleStatus,
    private readonly _totalInCents: Cents,
    private readonly _installments: number,
    private readonly _interestInCents: Cents | undefined,
    private _paidAt?: Date,
    private _refundedAt?: Date,
    private _transactionId?: string,
    private _products: StoreSaleProduct[] = [],
  ) {
    super(id);
  }

  static create(
    id: StoreSaleID,
    storeId: StoreID,
    shopId: ShopID,
    partyShopId: number | null,
    paymentMethodId: number,
    customerId: CustomerID | null,
    creditCardId: number | null,
    orderId: OrderID,
    totalInCents: Cents,
    installments: number,
    interestInCents?: Cents,
    transactionId?: string,
  ): StoreSale {
    if (installments <= 0) {
      throw new Error("Installments must be greater than 0");
    }

    if (totalInCents.getValue() <= 0) {
      throw new Error("Total must be greater than 0");
    }

    if (
      installments > 1 &&
      (!interestInCents || interestInCents.getValue() <= 0)
    ) {
      throw new Error("Interest must be greater than 0 for installment sale");
    }

    const now = new Date();

    return new StoreSale(
      id,
      storeId,
      shopId,
      partyShopId,
      paymentMethodId,
      customerId,
      creditCardId,
      orderId,
      "paid",
      totalInCents,
      installments,
      interestInCents,
      now,
      undefined,
      transactionId,
    );
  }

  static fromJSON(json: StoreSaleJSON): StoreSale {
    return new StoreSale(
      new StoreSaleID(json.id),
      new StoreID(json.storeId),
      new ShopID(json.shopId),
      json.partyShopId ?? null,
      json.paymentMethodId,
      json.customerId ? new CustomerID(json.customerId) : null,
      json.creditCardId ?? null,
      new OrderID(json.orderId),
      json.status,
      Cents.create(json.totalInCents),
      json.installments ?? 1,
      json.interestInCents !== undefined
        ? Cents.create(json.interestInCents)
        : undefined,
      json.paidAt !== undefined ? new Date(json.paidAt) : undefined,
      json.refundedAt !== undefined ? new Date(json.refundedAt) : undefined,
      json.transactionId,
      json.products?.map((p) => StoreSaleProduct.fromJSON(p)) ?? [],
    );
  }

  toJSON(): StoreSaleJSON {
    return {
      id: this.id.getValue(),
      storeId: this._storeId.getValue(),
      shopId: this._shopId.getValue(),
      partyShopId: this._partyShopId,
      paymentMethodId: this._paymentMethodId,
      customerId: this._customerId?.getValue() ?? null,
      creditCardId: this._creditCardId,
      orderId: this._orderId.getValue(),
      status: this._status,
      totalInCents: this._totalInCents.getValue(),
      installments: this._installments,
      interestInCents: this._interestInCents?.getValue(),
      paidAt: this._paidAt?.toISOString(),
      refundedAt: this._refundedAt?.toISOString(),
      transactionId: this._transactionId,
      products: this._products.map((p) => p.toJSON()),
    };
  }

  refund(): void {
    if (this._status !== "paid") {
      throw new Error("Only paid sales can be refunded");
    }

    if (!this._transactionId) {
      throw new Error("Sale does not have a transaction ID");
    }

    if (this._refundedAt) {
      throw new Error("This sale has already been refunded");
    }

    this._status = "refunded";
    this._refundedAt = new Date();
  }

  setProducts(products: StoreSaleProduct[]): void {
    this._products = products;
  }

  get storeId(): StoreID {
    return this._storeId;
  }

  get shopId(): ShopID {
    return this._shopId;
  }

  get partyShopId(): number | null {
    return this._partyShopId;
  }

  get paymentMethodId(): number {
    return this._paymentMethodId;
  }

  get customerId(): CustomerID | null {
    return this._customerId;
  }

  get creditCardId(): number | null {
    return this._creditCardId;
  }

  get orderId(): OrderID {
    return this._orderId;
  }

  get status(): SaleStatus {
    return this._status;
  }

  get totalInCents(): Cents {
    return this._totalInCents;
  }

  get installments(): number {
    return this._installments;
  }

  get interestInCents(): Cents | undefined {
    return this._interestInCents;
  }

  get paidAt(): Date | undefined {
    return this._paidAt;
  }

  get refundedAt(): Date | undefined {
    return this._refundedAt;
  }

  get transactionId(): string | undefined {
    return this._transactionId;
  }

  get products(): StoreSaleProduct[] {
    return [...this._products];
  }
}

export interface StoreSaleJSON {
  id: number;
  storeId: number;
  shopId: number;
  partyShopId?: number | null;
  paymentMethodId: number;
  customerId?: number | null;
  creditCardId?: number | null;
  orderId: string;
  status: SaleStatus;
  totalInCents: number;
  installments?: number;
  interestInCents?: number;
  paidAt?: string;
  refundedAt?: string;
  transactionId?: string;
  products?: StoreSaleProductJSON[];
}
