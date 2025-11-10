import { Payout } from "../../../domain/payout/payout.aggregate";
import { PayoutStatus } from "../../../domain/@shared/value-objects/payout-status.value";
import { Uuid } from "../../../domain/@shared/interfaces/uuid";

export interface IPayoutRepository {
  save(payout: Payout): Promise<void>;
  findById(id: Uuid): Promise<{
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
  } | null>;
  findMany(
    page: number,
    limit: number,
    clientId?: string,
    status?: PayoutStatus,
  ): Promise<{
    payouts: {
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
    }[];
    totalPages: number;
  }>;
  update(payout: Payout): Promise<void>;
}
