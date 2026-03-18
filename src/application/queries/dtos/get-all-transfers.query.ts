import { Query } from "@nestjs/cqrs";

export class GetAllTransfersQuery extends Query<{
  transfers: {
    id: number;
    amount: number;
    description?: string;
    statementDescriptor?: string;
    createdAt: Date;
    bankAccount?: {
      id: number;
      bankCode: string;
      accountNumber: string;
    };
  }[];
}> {
  constructor(public readonly storeId: number) {
    super();
  }
}
