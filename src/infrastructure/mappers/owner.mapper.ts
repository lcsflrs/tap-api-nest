import { Owner } from "@domain/owner/owner.aggregate";

export class OwnerMapper {
  static toPersistence(owner: Owner) {
    const json = owner.toJSON();

    return {
      id: json.id,
      name: json.name,
      lastName: json.lastName,
      document: json.document ?? null,
      email: json.email,
      phone: json.phone,
      birthdate: json.birthdate ? new Date(json.birthdate) : null,
      line1: json.address.line1,
      line2: json.address.line2,
      line3: json.address.line3,
      neighborhood: json.address.neighborhood,
      city: json.address.city,
      state: json.address.state,
      countryCode: json.address.countryCode,
      zipCode: json.address.zipCode,
      isActive: json.isActive,
      emailVerified: json.emailVerified,
      phoneVerified: json.phoneVerified,
      ioCustomerId: json.ioCustomerId ?? null,
      accessUserId: json.accessUserId,
    };
  }

  static toDomain(owner: any): Owner {
    return Owner.fromJSON({
      id: owner.id,
      name: owner.name,
      lastName: owner.lastName,
      document: owner.document ?? undefined,
      email: owner.email,
      phone: owner.phone,
      birthdate: owner.birthdate
        ? owner.birthdate instanceof Date
          ? owner.birthdate.toISOString()
          : owner.birthdate
        : undefined,
      address: {
        line1: owner.line1,
        line2: owner.line2,
        line3: owner.line3,
        neighborhood: owner.neighborhood,
        city: owner.city,
        state: owner.state,
        countryCode: owner.countryCode,
        zipCode: owner.zipCode,
      },
      isActive: owner.isActive ?? true,
      emailVerified: owner.emailVerified ?? false,
      phoneVerified: owner.phoneVerified ?? false,
      ioCustomerId: owner.ioCustomerId ?? undefined,
      accessUserId: owner.accessUserId ?? undefined,
      stores: [],
    });
  }
}
