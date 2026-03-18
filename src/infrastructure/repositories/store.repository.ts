import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IStoreRepository } from "./interfaces/store-repository.interface";
import { Store, PaymentData } from "@domain/store/store.aggregate";
import { Shop } from "@domain/store/shop.entity";
import { Worker } from "@domain/store/worker.entity";
import { StoreBankAccount } from "@domain/store/store-bank-account.entity";
import { StoreID } from "@domain/store/store-id.value";
import { ShopID } from "@domain/store/shop-id.value";
import { StoreMapper } from "@infrastructure/mappers/store.mapper";
import { ShopMapper } from "@infrastructure/mappers/shop.mapper";
import { WorkerMapper } from "@infrastructure/mappers/worker.mapper";
import { StoreBankAccountMapper } from "@infrastructure/mappers/store-bank-account.mapper";

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Store | null> {
    const store = await this.prisma.store.findUnique({ where: { id } });

    if (!store) {
      return null;
    }

    return StoreMapper.toDomain(store);
  }

  async findByBusinessDocument(document: string): Promise<Store | null> {
    const store = await this.prisma.store.findFirst({
      where: { businessDocument: document },
    });

    if (!store) {
      return null;
    }

    return StoreMapper.toDomain(store);
  }

  async findWebhookById(storeId: number): Promise<string | undefined> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
      select: { webhookUrl: true },
    });

    return store?.webhookUrl ?? undefined;
  }

  async create(store: Store): Promise<Store> {
    const data = StoreMapper.toPersistence(store);
    const raw = await this.prisma.store.create({ data });

    return StoreMapper.toDomain(raw);
  }

  async update(store: Store): Promise<void> {
    const data = StoreMapper.toPersistence(store);
    await this.prisma.store.update({
      where: { id: store.storeId.getValue() },
      data,
    });
  }

  async updatePaymentData(storeId: StoreID, data: PaymentData): Promise<void> {
    await this.prisma.store.update({
      where: { id: storeId.getValue() },
      data: {
        ioSellerId: data.ioSellerId,
        taxpayerId: data.taxpayerId,
        ownerTaxpayerId: data.ownerTaxpayerId ?? null,
      },
    });
  }

  async findShopById(shopId: number): Promise<Shop | null> {
    const shop = await this.prisma.shop.findUnique({
      where: { id: shopId },
      include: {
        shopProducts: { include: { product: true } },
        shopWorkers: true,
      },
    });

    if (!shop) {
      return null;
    }

    return ShopMapper.toDomain(shop);
  }

  async findByIdWithOwnerIoCustomerId(
    storeId: number,
  ): Promise<{ storeId: number; ownerIoCustomerId: string | null } | null> {
    const store = await this.prisma.store.findUnique({
      where: { id: storeId },
      select: {
        id: true,
        owner: {
          select: { ioCustomerId: true },
        },
      },
    });

    if (!store) {
      return null;
    }

    return {
      storeId: store.id,
      ownerIoCustomerId: store.owner?.ioCustomerId ?? null,
    };
  }

  async createShop(shop: Shop): Promise<void> {
    const data = ShopMapper.toPersistence(shop);
    await this.prisma.shop.create({ data });
  }

  async setShopCatalog(
    shopId: ShopID,
    products: { productId: number; priceInCents: number }[],
  ): Promise<void> {
    if (products.length === 0) {
      throw new Error("Products list is empty");
    }

    const productIds = products.map((p) => p.productId);

    const existing = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true },
    });

    if (existing.length !== productIds.length) {
      throw new Error("One or more products not found");
    }

    const existingShopProducts = await this.prisma.shopProduct.findMany({
      where: { shopId: shopId.getValue() },
      select: { productId: true },
    });

    const existingIds = new Set(existingShopProducts.map((p) => p.productId));
    const newProducts = products.filter((p) => !existingIds.has(p.productId));

    if (newProducts.length === 0) {
      return;
    }

    await this.prisma.shopProduct.createMany({
      data: newProducts.map((p) => ({
        shopId: shopId.getValue(),
        productId: p.productId,
        priceInCents: p.priceInCents,
      })),
    });
  }

  async modifyProductsAvailable(
    shopId: number,
    productsAvailableId: number[],
  ): Promise<void> {
    await this.prisma.$transaction([
      this.prisma.shopProduct.updateMany({
        where: { shopId },
        data: { isActive: false },
      }),
      this.prisma.shopProduct.updateMany({
        where: { id: { in: productsAvailableId }, shopId },
        data: { isActive: true },
      }),
    ]);
  }

  async createWorker(worker: Worker): Promise<Worker> {
    const data = WorkerMapper.toPersistence(worker);
    const result = await this.prisma.shopWorker.create({ data });

    return WorkerMapper.toDomain(result);
  }

  async findBankAccountByStoreId(
    storeId: number,
  ): Promise<StoreBankAccount | null> {
    const storeBankAccount = await this.prisma.storeBankAccount.findFirst({
      where: { storeId },
    });

    if (!storeBankAccount) {
      return null;
    }

    return StoreBankAccountMapper.toDomain(storeBankAccount);
  }

  async saveBankAccount(account: StoreBankAccount): Promise<void> {
    const data = StoreBankAccountMapper.toPersistence(account);
    await this.prisma.storeBankAccount.create({ data });
  }

  async findByIdWithShops(id: number): Promise<Store | null> {
    const store = await this.prisma.store.findUnique({
      where: { id },
      include: { shops: true },
    });

    if (!store) {
      return null;
    }

    return StoreMapper.toDomain(store);
  }

  async createTransfer(
    bankAccountId: number,
    amountInCents: number,
    storeId: number,
    description: string,
    statementDescriptor: string,
  ): Promise<{
    transferId: number;
    bankAccountId: number;
    amountInCents: number;
  }> {
    const transfer = await this.prisma.transferHistory.create({
      data: {
        bankAccountId,
        amountInCents,
        storeId,
        description,
        statementDescriptor,
      },
    });

    return {
      transferId: transfer.id,
      bankAccountId: transfer.bankAccountId,
      amountInCents: transfer.amountInCents,
    };
  }

  async findWorkerByIdAndShop(
    workerId: number,
    shopId: number,
  ): Promise<{ id: number } | null> {
    return await this.prisma.shopWorker.findFirst({
      where: { id: workerId, shopId },
      select: { id: true },
    });
  }

  async findShopProductsByIds(
    ids: number[],
  ): Promise<{ id: number; product: { name: string } | null }[]> {
    return await this.prisma.shopProduct.findMany({
      where: { id: { in: ids } },
      include: { product: true },
    });
  }
}
