import { Party } from "@domain/party/party.aggregate";
import { Promoter } from "@domain/party/promoter.entity";

export class PartyMapper {
  static toPersistence(party: Party) {
    const json = party.toJSON();

    return {
      id: json.id,
      name: json.name,
      date: new Date(json.date),
      time: PartyMapper.timeStringToDate(json.time),
      description: json.description ?? undefined,
      address: json.address ?? null,
      accessUserId: json.accessUserId,
    };
  }

  static toDomain(party: any): Party {
    return Party.fromJSON({
      id: party.id,
      name: party.name,
      date:
        party.date instanceof Date
          ? party.date.toISOString().split("T")[0]
          : party.date,
      time:
        party.time instanceof Date
          ? PartyMapper.dateToTimeString(party.time)
          : party.time,
      description: party.description ?? "",
      address: party.address ?? null,
      accessUserId: party.accessUserId,
      ingressBatches: (party.batches ?? []).map((b: any) => ({
        id: b.id,
        partyId: b.partyId,
        name: b.name,
        description: b.description ?? null,
        quantity: b.quantity,
        quantitySold: b.quantitySold,
        priceInCents: b.priceInCents,
        isActive: b.isActive ?? false,
      })),
      invites: (party.invites ?? []).map((i: any) => ({
        id: i.id,
        partyId: i.partyId,
        name: i.name ?? null,
        phone: i.phone ?? null,
        document: i.document ?? null,
        email: i.email ?? null,
        invitedByCustomerId: i.invitedByCustomerId,
        ingressId: i.ingressId ?? null,
      })),
      promoters: (party.promoters ?? []).map((p: any) => ({
        id: p.id,
        partyId: p.partyId,
        customerId: p.customerId,
        isActive: p.isActive ?? true,
        bonusInCents: p.bonusInCents ?? 0,
      })),
    });
  }

  static promoterToPersistence(promoter: Promoter) {
    const json = promoter.toJSON();

    return {
      partyId: json.partyId,
      customerId: json.customerId,
      isActive: json.isActive,
      bonusInCents: json.bonusInCents,
    };
  }

  private static dateToTimeString(date: Date): string {
    const h = String(date.getUTCHours()).padStart(2, "0");
    const m = String(date.getUTCMinutes()).padStart(2, "0");
    const s = String(date.getUTCSeconds()).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  private static timeStringToDate(time: string): Date {
    const [h, m, s] = time.split(":").map(Number);
    const date = new Date(0);
    date.setUTCHours(h, m, s ?? 0, 0);
    return date;
  }
}
