import { Command } from "@nestjs/cqrs";
import { Owner } from "@domain/owner/owner.aggregate";
import { Store } from "@domain/store/store.aggregate";

export interface CreateSellerPFResult {
  ioSellerId: string;
  taxpayerId: string;
}

export class CreateSellerPFCommand extends Command<CreateSellerPFResult> {
  constructor(
    public readonly owner: Owner,
    public readonly store: Store,
  ) {
    super();
  }
}
