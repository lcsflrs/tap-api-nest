import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        ownerId?: number;
        customerId?: number;
        workerId?: number;
        shopId?: number;
        partyId?: number;
        role?: number;
        id?: number;
      };
    }
  }
}

export {};
