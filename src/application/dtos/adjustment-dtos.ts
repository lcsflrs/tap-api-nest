// === Create adjustment ===
export type CreateAdjustmentInput = {
  clientId: string;
  valueInCents: number;
  reason: string;
  attachment?: string;
};

export type CreateAdjustmentOutput = {
  id: string;
};

// === Find adjustment by id ===
export type FindAdjustmentByIdInput = {
  id: string;
};

export type FindAdjustmentByIdOutput = {
  id: string;
  clientId: string;
  valueInCents: number;
  reason: string;
  attachment?: string;
};

// === Find many adjustments ===
export type FindManyAdjustmentsInput = {
  clientId?: string;
};

export type FindManyAdjustmentOutput = {
  adjustments: {
    id: string;
    clientId: string;
    valueInCents: number;
    reason: string;
    attachment?: string;
  }[];
};
