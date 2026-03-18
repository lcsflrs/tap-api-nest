import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreateStorePaymentGatewayCommand } from "./dtos/create-store-payment-gateway.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import type { IOwnerRepository } from "@infrastructure/repositories/interfaces/owner-repository.interface";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { Store } from "@domain/store/store.aggregate";
import { StoreID } from "@domain/store/store-id.value";

@CommandHandler(CreateStorePaymentGatewayCommand)
export class CreateStorePaymentGatewayHandler implements ICommandHandler<
  CreateStorePaymentGatewayCommand,
  { store: Store }
> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
    @Inject("OwnerRepository")
    private readonly ownerRepository: IOwnerRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(
    command: CreateStorePaymentGatewayCommand,
  ): Promise<{ store: Store }> {
    const { storeId } = command;

    const store = await this.storeRepository.findById(storeId);

    if (!store) {
      throw new Error("Store not found");
    }

    const owner = await this.ownerRepository.findById(store.ownerId.getValue());

    if (!owner) {
      throw new Error("Owner not found");
    }

    if (!store.isPF() && !store.isPJ()) {
      throw new Error("Store is not PF or PJ");
    }

    if (!store.mcc) {
      throw new Error("Store has no MCC");
    }

    if (!store.statementDescriptor) {
      throw new Error("Store has no statement descriptor");
    }

    const authResponse = await this.paymentGateway.getAuthToken();
    const authToken: string = authResponse.data.access_token;

    const ownerAddress = owner.address.toJSON();

    let gatewayResult: any;

    if (store.isPF()) {
      if (!owner.document) {
        throw new Error("Owner has no CPF");
      }

      if (!owner.birthdate) {
        throw new Error("Owner has no birthdate");
      }

      gatewayResult = await this.paymentGateway.createSellerPF(
        {
          send_welcome_email: false,
          mcc: store.mcc,
          first_name: owner.name,
          last_name: owner.lastName,
          email: owner.email.getValue(),
          phone_number: owner.phone.getValue(),
          cpf: owner.document.getValue(),
          birthdate: owner.birthdate.toISOString().split("T")[0],
          statement_descriptor: store.statementDescriptor,
          address: {
            line1: ownerAddress.line1,
            line2: ownerAddress.line2,
            line3: ownerAddress.line3 ?? "",
            neighborhood: ownerAddress.neighborhood,
            city: ownerAddress.city,
            state: ownerAddress.state,
            zip_code: ownerAddress.zipCode,
            country_code: ownerAddress.countryCode ?? "BR",
          },
        },
        authToken,
      );
    } else {
      if (!store.businessDocument) {
        throw new Error("Store has no CNPJ");
      }

      if (!store.email) {
        throw new Error("Store has no email");
      }

      if (!store.phone) {
        throw new Error("Store has no phone");
      }

      if (!store.businessName) {
        throw new Error("Store has no business name");
      }

      if (!store.website) {
        throw new Error("Store has no website");
      }

      if (!store.openDate) {
        throw new Error("Store has no open date");
      }

      if (!store.address) {
        throw new Error("Store has no address");
      }

      if (!owner.document) {
        throw new Error("Owner has no CPF");
      }

      if (!owner.birthdate) {
        throw new Error("Owner has no birthdate");
      }

      const storeAddress = store.address.toJSON();

      gatewayResult = await this.paymentGateway.createSellerPJ(
        {
          mcc: store.mcc,
          statement_descriptor: store.statementDescriptor,
          business: {
            name: store.businessName,
            email: store.email.getValue(),
            phone_number: store.phone.getValue(),
            cnpj: store.businessDocument.getValue(),
            opening_date: store.openDate.toISOString().split("T")[0],
            website: store.website.getValue(),
          },
          owner: {
            first_name: owner.name,
            last_name: owner.lastName,
            email: owner.email.getValue(),
            phone_number: owner.phone.getValue(),
            cpf: owner.document.getValue(),
            birthdate: owner.birthdate.toISOString().split("T")[0],
          },
          business_address: {
            line1: storeAddress.line1,
            line2: storeAddress.line2,
            line3: storeAddress.line3 ?? "",
            neighborhood: storeAddress.neighborhood,
            city: storeAddress.city,
            state: storeAddress.state,
            zip_code: storeAddress.zipCode,
            country_code: storeAddress.countryCode ?? "BR",
          },
          owner_address: {
            line1: ownerAddress.line1,
            line2: ownerAddress.line2,
            line3: ownerAddress.line3 ?? "",
            neighborhood: ownerAddress.neighborhood,
            city: ownerAddress.city,
            state: ownerAddress.state,
            zip_code: ownerAddress.zipCode,
            country_code: ownerAddress.countryCode ?? "BR",
          },
        },
        authToken,
      );
    }

    await this.storeRepository.updatePaymentData(new StoreID(storeId), {
      ioSellerId: gatewayResult.ioSellerId,
      taxpayerId: gatewayResult.taxpayerId,
      ownerTaxpayerId: gatewayResult.ownerTaxpayerId,
    });

    const updatedStore = await this.storeRepository.findById(storeId);

    if (!updatedStore) {
      throw new Error("Failed to retrieve updated store");
    }

    return { store: updatedStore };
  }
}
