import { Store } from "@domain/store/store.aggregate";
import { ShopMapper } from "./shop.mapper";

export class StoreMapper {
  static toDomain(store: any): Store {
    const hasAddress = !!(
      store.businessLine1 ||
      store.businessCity ||
      store.businessState
    );

    return Store.fromJSON({
      storeId: store.id,
      ownerId: store.ownerId,
      name: store.name,
      mcc: store.mcc ?? null,
      statementDescriptor: store.statementDescriptor ?? null,
      phone: store.businessPhone ?? undefined,
      email: store.businessEmail ?? undefined,
      businessName: store.businessName ?? undefined,
      businessDocument: store.businessDocument ?? undefined,
      website: store.businessWebsite ?? undefined,
      openDate:
        store.businessOpenDate instanceof Date
          ? store.businessOpenDate.toISOString()
          : (store.businessOpenDate ?? undefined),
      address: hasAddress
        ? {
            line1: store.businessLine1 ?? "",
            line2: store.businessLine2 ?? undefined,
            line3: store.businessLine3 ?? undefined,
            neighborhood: store.businessNeighborhood ?? undefined,
            city: store.businessCity ?? undefined,
            state: store.businessState ?? undefined,
            countryCode: store.businessCountryCode ?? undefined,
            zipCode: store.businessZipCode ?? undefined,
          }
        : undefined,
      paymentData: store.ioSellerId
        ? {
            ioSellerId: store.ioSellerId,
            taxpayerId: store.taxpayerId ?? "",
            ownerTaxpayerId: store.ownerTaxpayerId ?? undefined,
          }
        : undefined,
      webhookUrl: store.webhookUrl ?? undefined,
      shops: (store.shops ?? []).map((s: any) =>
        ShopMapper.toDomain(s).toJSON(),
      ),
    });
  }

  static toPersistence(store: Store) {
    const json = store.toJSON();

    return {
      ownerId: json.ownerId,
      name: json.name,
      mcc: json.mcc ?? null,
      statementDescriptor: json.statementDescriptor ?? null,
      businessPhone: json.phone ?? null,
      businessEmail: json.email ?? null,
      businessName: json.businessName ?? null,
      businessDocument: json.businessDocument ?? null,
      businessWebsite: json.website ?? null,
      businessOpenDate: json.openDate ? new Date(json.openDate) : null,
      businessLine1: json.address?.line1 ?? null,
      businessLine2: json.address?.line2 ?? null,
      businessLine3: json.address?.line3 ?? null,
      businessNeighborhood: json.address?.neighborhood ?? null,
      businessCity: json.address?.city ?? null,
      businessState: json.address?.state ?? null,
      businessCountryCode: json.address?.countryCode ?? null,
      businessZipCode: json.address?.zipCode ?? null,
      ioSellerId: json.paymentData?.ioSellerId ?? null,
      taxpayerId: json.paymentData?.taxpayerId ?? null,
      ownerTaxpayerId: json.paymentData?.ownerTaxpayerId ?? null,
      webhookUrl: json.webhookUrl ?? null,
    };
  }
}
