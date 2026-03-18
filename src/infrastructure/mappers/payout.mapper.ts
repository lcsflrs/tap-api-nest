import { Payout } from "@domain/payout/payout.aggregate";
import { PayoutItem } from "@domain/payout/payout-item.entity";

export class PayoutMapper {
  static toPersistence(payout: Payout) {
    return {
      id: payout.getId().getValue(),
      storeId: payout.storeId,
      storeName: payout.storeName,
      grossInCents: payout.grossInCents,
      feeInCents: payout.feeInCents,
      netInCents: payout.netInCents,
      status: payout.status.getValue(),
      proofFileUrl: payout.proofFileUrl ?? null,
    };
  }

  static itemToPersistence(item: PayoutItem, payoutId: string) {
    return {
      id: item.getId().getValue(),
      payoutId,
      storeSaleId: item.storeSaleId,
      orderId: item.orderId,
      saleGrossInCents: item.saleGrossInCents.getValue(),
      saleFeeInCents: item.saleFeeInCents.getValue(),
      saleNetInCents: item.saleNetInCents.getValue(),
    };
  }

  static toDomain(payout: any): Payout {
    return Payout.fromJSON({
      id: payout.id,
      storeId: payout.storeId,
      storeName: payout.storeName,
      grossInCents: payout.grossInCents,
      feeInCents: payout.feeInCents,
      netInCents: payout.netInCents,
      status: payout.status,
      proofFileUrl: payout.proofFileUrl ?? undefined,
      items: (payout.items ?? []).map((item: any) => ({
        id: item.id,
        payoutId: item.payoutId,
        storeSaleId: item.storeSaleId,
        orderId: item.orderId,
        saleGrossInCents: item.saleGrossInCents,
        saleFeeInCents: item.saleFeeInCents,
        saleNetInCents: item.saleNetInCents,
      })),
    });
  }
}
