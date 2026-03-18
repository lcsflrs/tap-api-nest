import { Entity } from "@domain/@shared/interfaces/entity.abstract";
import { ShopID } from "./shop-id.value";
import { StoreID } from "./store-id.value";
import { ShopProduct, ShopProductJSON } from "./shop-product.entity";
import { Worker, WorkerJSON } from "./worker.entity";

export class Shop extends Entity<ShopID> {
  constructor(
    id: ShopID,
    private readonly _storeId: StoreID,
    private readonly _internalName: string,
    private _catalog: ShopProduct[] = [],
    private _workers: Worker[] = [],
  ) {
    super(id);
  }

  static create(shopId: ShopID, storeId: StoreID, internalName: string): Shop {
    if (internalName.trim().length === 0) {
      throw new Error("Internal name is required");
    }

    return new Shop(shopId, storeId, internalName);
  }

  static fromJSON(json: ShopJSON): Shop {
    return new Shop(
      new ShopID(json.shopId),
      new StoreID(json.storeId),
      json.internalName,
      json.catalog?.map((p) => ShopProduct.fromJSON(p)) ?? [],
      json.workers?.map((w) => Worker.fromJSON(w)) ?? [],
    );
  }

  toJSON(): ShopJSON {
    return {
      shopId: this.id.getValue(),
      storeId: this._storeId.getValue(),
      internalName: this._internalName,
      catalog: this._catalog.map((p) => p.toJSON()),
      workers: this._workers.map((w) => w.toJSON()),
    };
  }

  get shopId(): ShopID {
    return this.id;
  }

  get storeId(): StoreID {
    return this._storeId;
  }

  get internalName(): string {
    return this._internalName;
  }

  get catalog(): ShopProduct[] {
    return [...this._catalog];
  }

  getActiveCatalog(): ShopProduct[] {
    return this._catalog.filter((p) => p.isAvailable);
  }

  get workers(): Worker[] {
    return [...this._workers];
  }
}

export interface ShopJSON {
  shopId: number;
  storeId: number;
  internalName: string;
  catalog?: ShopProductJSON[];
  workers?: WorkerJSON[];
}
