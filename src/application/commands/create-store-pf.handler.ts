import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateStorePFCommand } from "./dtos/create-store-pf.command";
import type { IOwnerRepository } from "@infrastructure/repositories/interfaces/owner-repository.interface";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import { Store } from "@domain/store/store.aggregate";
import { StoreID } from "@domain/store/store-id.value";

@CommandHandler(CreateStorePFCommand)
export class CreateStorePFHandler implements ICommandHandler<CreateStorePFCommand> {
  constructor(
    @Inject("OwnerRepository")
    private readonly ownerRepository: IOwnerRepository,
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(command: CreateStorePFCommand): Promise<void> {
    const { name, ownerDocument, mcc, statementDescriptor } = command;

    const owner = await this.ownerRepository.findByDocument(ownerDocument);

    if (!owner) {
      throw new Error("Owner not found");
    }

    const store = Store.create(
      new StoreID(0),
      owner.getId(),
      name,
      mcc,
      statementDescriptor,
    );

    await this.storeRepository.create(store);
  }
}
