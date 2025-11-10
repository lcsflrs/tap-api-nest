import { Payout } from "../../../domain/payout/payout.aggregate";
import { PayoutItem } from "../../../domain/payout/payout-item.entity";
import { Money } from "../../../domain/@shared/value-objects/money.value";
import { PayoutStatus } from "../../../domain/@shared/value-objects/payout-status.value";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

export class PayoutMapper {
  static toDomain(payout: {
    id: string;
    clientId: string;
    grossInCents: number;
    feeInCents: number;
    netInCents: number;
    status: string;
    paidAt: Date | null;
    proofFileUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: {
      id: string;
      payoutId: string;
      amountInCents: number;
      consumptionId: string;
    }[];
  }): Payout {
    return new Payout(
      new Uuid(payout.id),
      new Uuid(payout.clientId),
      new Money(payout.grossInCents),
      new Money(payout.feeInCents),
      new Money(payout.netInCents),
      PayoutStatus.fromString(payout.status),
      payout.items.map(
        (item) =>
          new PayoutItem(
            new Uuid(item.id),
            new Uuid(item.payoutId),
            new Money(item.amountInCents),
            new Uuid(item.consumptionId),
          ),
      ),
      payout.createdAt,
      payout.updatedAt,
      payout.paidAt ? new Date(payout.paidAt) : undefined,
      payout.proofFileUrl ? payout.proofFileUrl : undefined,
    );
  }
}
