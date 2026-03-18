import { Command } from "@nestjs/cqrs";
import { Owner } from "@domain/owner/owner.aggregate";
import { Store } from "@domain/store/store.aggregate";

export interface CreateSellerPJResult {
  ioSellerId: string;
  taxpayerId: string;
}

export class CreateSellerPJCommand extends Command<CreateSellerPJResult> {
  constructor(
    public readonly owner: Owner,
    public readonly store: Store,
  ) {
    super();
  }
}
