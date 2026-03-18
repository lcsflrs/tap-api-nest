import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateStorePJCommand } from "./dtos/create-store-pj.command";
import type { IOwnerRepository } from "@infrastructure/repositories/interfaces/owner-repository.interface";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import { Store } from "@domain/store/store.aggregate";
import { StoreID } from "@domain/store/store-id.value";
import { Email } from "@domain/@shared/value-objects/email.value";
import { Phone } from "@domain/@shared/value-objects/phone.value";
import { Cnpj } from "@domain/@shared/value-objects/cnpj.value";
import { Website } from "@domain/@shared/value-objects/website.value";
import { Address } from "@domain/@shared/value-objects/address.value";

@CommandHandler(CreateStorePJCommand)
export class CreateStorePJHandler implements ICommandHandler<CreateStorePJCommand> {
  constructor(
    @Inject("OwnerRepository")
    private readonly ownerRepository: IOwnerRepository,
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
  ) {}

  async execute(command: CreateStorePJCommand): Promise<void> {
    const {
      name,
      ownerDocument,
      mcc,
      statementDescriptor,
      address,
      businessDocument,
      businessEmail,
      businessPhone,
      businessName,
      openDate,
      website,
    } = command;

    const owner = await this.ownerRepository.findByDocument(ownerDocument);

    if (!owner) {
      throw new Error("Owner not found");
    }

    const existingStore =
      await this.storeRepository.findByBusinessDocument(businessDocument);

    if (existingStore) {
      throw new Error("Store already exists");
    }

    const store = Store.create(
      new StoreID(0),
      owner.getId(),
      name,
      mcc,
      statementDescriptor,
      {
        phone: new Phone(businessPhone),
        email: new Email(businessEmail),
        document: new Cnpj(businessDocument),
        businessName,
        website: new Website(website),
        openDate: new Date(openDate),
        address: Address.create(
          address.street,
          address.number,
          address.complement,
          address.neighborhood,
          address.city,
          address.state,
          address.countryCode,
          address.zipCode,
        ),
      },
    );

    await this.storeRepository.create(store);
  }
}
