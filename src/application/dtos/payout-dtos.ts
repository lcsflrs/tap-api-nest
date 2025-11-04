// === Create Payout ===
export type CreatePayoutInput = {
  clientId: string;
  createdBy: string;
  items: {
    amountInCents: number;
    consumptionId: string;
  }[];
};

export type CreatePayoutOutput = {
  id: string;
};

// === Find Payout ===
export type FindPayoutByIdInput = {
  id: string;
};

export type FindPayoutByIdOutput = {
  id: string;
  clientId: string;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  items: {
    id: string;
    amountInCents: number;
    consumptionId: string;
  }[];
};

// === Find Many Payouts ===
export type FindManyPayoutInput = {
  page: number;
  limit: number;
  clientId?: string;
  status?: string;
};

export type FindManyPayoutOutput = {
  payouts: {
    id: string;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    status: string;
    items: {
      id: string;
      amountInCents: number;
      consumptionId: string;
    }[];
  }[];
  totalPages: number;
};

// === Mark Payout Paid ===
export type MarkPayoutPaidInput = {
  id: string;
  proofFileUrl: string;
};

export type MarkPayoutPaidOutput = {
  id: string;
};

// === Add item to Payout ===
export type AddItemToPayoutInput = {
  id: string;
  amountInCents: number;
  consumptionId: string;
};

export type AddItemToPayoutOutput = {
  id: string;
};
