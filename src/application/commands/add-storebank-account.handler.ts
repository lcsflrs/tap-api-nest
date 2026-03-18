import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { AddStoreBankAccountCommand } from "./dtos/add-store-bank-account.command";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";
import { PAYMENT_GATEWAY_TOKEN } from "@domain/@shared/payment-gateway/payment-gateway.token";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";
import { Cnpj } from "@domain/@shared/value-objects/cnpj.value";
import { StoreBankAccount } from "@domain/store/store-bank-account.entity";
import { StoreBankAccountID } from "@domain/store/store-bank-account-id.value";

@CommandHandler(AddStoreBankAccountCommand)
export class AddStoreBankAccountHandler implements ICommandHandler<
  AddStoreBankAccountCommand,
  {
    storeId: number;
    bankCode: string;
    accountNumber: string;
    routingNumber: string;
    holderName: string;
    document: string;
    type: string;
  }
> {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
    @Inject(PAYMENT_GATEWAY_TOKEN)
    private readonly paymentGateway: PaymentGatewayInterface,
  ) {}

  async execute(command: AddStoreBankAccountCommand) {
    const {
      storeId,
      bankCode,
      accountNumber,
      routingNumber,
      holderName,
      document,
      type,
    } = command;

    const store = await this.storeRepository.findById(storeId);

    if (!store) {
      throw new Error("Store not found");
    }

    if (!store.paymentData?.ioSellerId) {
      throw new Error("Store has no payment gateway account");
    }

    const documentVO =
      document.length === 11 ? new Cpf(document) : new Cnpj(document);

    const gatewayResult = await this.paymentGateway.associateBankAccount({
      accountNumber,
      bankCode,
      holderName,
      ioSellerId: store.paymentData.ioSellerId,
      routingNumber,
      type,
      document: documentVO,
    });

    const bankAccount = StoreBankAccount.create(
      new StoreBankAccountID(0),
      storeId,
      accountNumber,
      routingNumber,
      bankCode,
      holderName,
      documentVO.getValue(),
      type,
      gatewayResult.ioToken,
    );

    await this.storeRepository.saveBankAccount(bankAccount);

    return {
      storeId,
      bankCode,
      accountNumber,
      routingNumber,
      holderName,
      document: documentVO.getValue(),
      type,
    };
  }
}
