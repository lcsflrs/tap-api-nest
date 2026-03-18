import { Command } from "@nestjs/cqrs";
import { Store } from "@domain/store/store.aggregate";

export class CreateStorePaymentGatewayCommand extends Command<{
  store: Store;
}> {
  constructor(public readonly storeId: number) {
    super();
  }
}
