import {
  BodyAssociateTokenizedBankAccountDTO,
  BodyCreateCreditTransactionWithSplitDTO,
  BodyCreateCustomerDTO,
  BodyCreateSellerPFDTO,
  BodyCreateSellerPJDTO,
  BodyCreateTransferToBankAccountDTO,
  BodyGeneratePixTransactionDTO,
  BodyTokenizeBankAccountDTO,
} from "./payment-gateway.dto";
import type { BankAccountType } from "@domain/store/store-bank-account-type.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";
import { Cnpj } from "@domain/@shared/value-objects/cnpj.value";

export interface PaymentGatewayInterface {
  readonly name: string;
  readonly authTokenTtl: number;

  getPaymentEmail(): string;
  getPaymentSecret(): string;
  getPaymentIoSellerId(): string;
  getAuthToken(): Promise<any>;
  getSpecialToken(): Promise<any>;
  createCustomer(body: BodyCreateCustomerDTO): Promise<any>;
  createSellerPF(body: BodyCreateSellerPFDTO, token: string): Promise<any>;
  createSellerPJ(body: BodyCreateSellerPJDTO, token: string): Promise<any>;
  getBalance(ioSellerId: string, token: string): Promise<any>;
  tokenizeBankAccount(
    ioSellerId: string,
    body: BodyTokenizeBankAccountDTO,
    token: string,
  ): Promise<any>;
  associateTokenizedBankAccount(
    body: BodyAssociateTokenizedBankAccountDTO,
    token: string,
  ): Promise<any>;
  listAllBankAccounts(ioSellerId: string, token: string): Promise<any>;
  getIopayBankAccount(
    bankAccountId: number,
    ioSellerId: string,
    token: string,
  ): Promise<any>;
  createCreditTransactionWithSplit(
    ioCustomerId: string,
    body: BodyCreateCreditTransactionWithSplitDTO,
    specialToken: string,
  ): Promise<any>;
  generatePixTransaction(
    ioCustomerId: string,
    body: BodyGeneratePixTransactionDTO,
    token: string,
  ): Promise<any>;
  generateStorePixTransaction(params: {
    storeId: number;
    amountInCents: number;
    referenceId: string;
    description: string;
    statementDescriptor: string;
  }): Promise<{
    storeId: number;
    transactionId: string;
    referenceId: string;
    pixKey: string;
    pixQrCode: string;
    pixEmv: string;
    expirationDate: string;
    status: string;
    amountInCents: number;
    description: string;
    customerId?: number | null;
  }>;
  getTransaction(transactionId: string, token: string): Promise<any>;
  refundTransaction(
    transactionId: string,
    body: { amount: number },
    token: string,
  ): Promise<any>;
  createTransferToBankAccount(
    body: BodyCreateTransferToBankAccountDTO,
    ioSellerId: string,
    bankAccountId: number,
    token: string,
  ): Promise<any>;
  listAllTransfers(ioSellerId: string, token: string): Promise<any>;
  associateCardWithCustomer(
    ioCustomerId: string,
    cardToken: string,
    specialToken: string,
  ): Promise<any>;
  updateCustomerEmail(
    ioCustomerId: string,
    email: string,
    token: string,
  ): Promise<any>;
  associateBankAccount(params: {
    accountNumber: string;
    bankCode: string;
    holderName: string;
    ioSellerId: string;
    routingNumber: string;
    type: BankAccountType;
    document: Cpf | Cnpj;
  }): Promise<{ bankName: string; ioToken: string }>;
}
