import { IQuery } from "@nestjs/cqrs";

export interface TransferItem {
  id: number;
  amount: number;
  description: string;
  statementDescriptor: string;
}

export interface ListAllTransfersResult {
  transfers: TransferItem[];
}

export class ListAllTransfersQuery implements IQuery {
  constructor(public readonly ioSellerId: string) {}
}
