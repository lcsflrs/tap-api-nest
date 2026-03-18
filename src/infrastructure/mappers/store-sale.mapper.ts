import { StoreSale } from "@domain/store/sale/store-sale.aggregate";
import { StoreSaleProduct } from "@domain/store/sale/store-sale-product.entity";

export class StoreSaleMapper {
  static toPersistence(sale: StoreSale) {
    return {
      storeId: sale.storeId.getValue(),
      shopId: sale.shopId.getValue(),
      partyShopId: sale.partyShopId ?? null,
      paymentMethodId: sale.paymentMethodId,
      customerId: sale.customerId?.getValue() ?? null,
      creditCardId: sale.creditCardId ?? null,
      orderId: sale.orderId.getValue(),
      status: sale.status,
      totalInCents: sale.totalInCents.getValue(),
      installments: sale.installments,
      interestInCents: sale.interestInCents?.getValue() ?? null,
      paidAt: sale.paidAt ?? null,
      refundedAt: sale.refundedAt ?? null,
      transactionId: sale.transactionId ?? null,
    };
  }

  static productToPersistence(product: StoreSaleProduct, storeSaleId: number) {
    return {
      storeSaleId: storeSaleId,
      shopProductId: product.shopProductId.getValue(),
      quantity: product.quantity,
      priceInCents: product.priceInCents.getValue(),
      totalInCents: product.totalInCents.getValue(),
    };
  }

  static toDomain(storeSale: any): StoreSale {
    return StoreSale.fromJSON({
      id: storeSale.id,
      storeId: storeSale.storeId,
      shopId: storeSale.shopId,
      partyShopId: storeSale.partyShopId ?? null,
      paymentMethodId: storeSale.paymentMethodId,
      customerId: storeSale.customerId ?? null,
      creditCardId: storeSale.creditCardId ?? null,
      orderId: storeSale.orderId,
      status: storeSale.status,
      totalInCents: storeSale.totalInCents,
      installments: storeSale.installments ?? 1,
      interestInCents: storeSale.interestInCents ?? undefined,
      paidAt:
        storeSale.paidAt instanceof Date
          ? storeSale.paidAt.toISOString()
          : (storeSale.paidAt ?? undefined),
      refundedAt:
        storeSale.refundedAt instanceof Date
          ? storeSale.refundedAt.toISOString()
          : (storeSale.refundedAt ?? undefined),
      transactionId: storeSale.transactionId ?? undefined,
      products: (storeSale.saleProducts ?? []).map((p: any) => ({
        id: p.id,
        storeSaleId: p.storeSaleId,
        shopProductId: p.shopProductId,
        quantity: p.quantity,
        priceInCents: p.priceInCents,
        totalInCents: p.totalInCents,
      })),
    });
  }
}
