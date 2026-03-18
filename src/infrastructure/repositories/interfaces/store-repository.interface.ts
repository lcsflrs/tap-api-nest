import { Store, PaymentData } from "@domain/store/store.aggregate";
import { Shop } from "@domain/store/shop.entity";
import { Worker } from "@domain/store/worker.entity";
import { StoreBankAccount } from "@domain/store/store-bank-account.entity";
import { StoreID } from "@domain/store/store-id.value";
import { ShopID } from "@domain/store/shop-id.value";

export interface IStoreRepository {
  findById(id: number): Promise<Store | null>;
  findByBusinessDocument(document: string): Promise<Store | null>;
  findWebhookById(storeId: number): Promise<string | undefined>;
  create(store: Store): Promise<Store>;
  update(store: Store): Promise<void>;
  updatePaymentData(storeId: StoreID, data: PaymentData): Promise<void>;
  findShopById(shopId: number): Promise<Shop | null>;
  findByIdWithShops(id: number): Promise<Store | null>;
  findByIdWithOwnerIoCustomerId(
    storeId: number,
  ): Promise<{ storeId: number; ownerIoCustomerId: string | null } | null>;
  createShop(shop: Shop): Promise<void>;
  setShopCatalog(
    shopId: ShopID,
    products: { productId: number; priceInCents: number }[],
  ): Promise<void>;
  modifyProductsAvailable(
    shopId: number,
    productsAvailableId: number[],
  ): Promise<void>;
  createWorker(worker: Worker): Promise<Worker>;
  findBankAccountByStoreId(storeId: number): Promise<StoreBankAccount | null>;
  saveBankAccount(account: StoreBankAccount): Promise<void>;
  createTransfer(
    bankAccountId: number,
    amountInCents: number,
    storeId: number,
    description: string,
    statementDescriptor: string,
  ): Promise<{
    transferId: number;
    bankAccountId: number;
    amountInCents: number;
  }>;
  findWorkerByIdAndShop(
    workerId: number,
    shopId: number,
  ): Promise<{ id: number } | null>;
  findShopProductsByIds(
    ids: number[],
  ): Promise<{ id: number; product: { name: string } | null }[]>;
}
