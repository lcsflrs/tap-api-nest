import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from "axios";
import { ThirdPartyError } from "@domain/@shared/errors/third-party.error";
import { PaymentGatewayInterface } from "@domain/@shared/payment-gateway/payment-gateway.interface";
import {
  BodyAssociateTokenizedBankAccountDTO,
  BodyCreateCreditTransactionWithSplitDTO,
  BodyCreateCustomerDTO,
  BodyCreateSellerPFDTO,
  BodyCreateSellerPJDTO,
  BodyCreateTransferToBankAccountDTO,
  BodyGeneratePixTransactionDTO,
  BodyTokenizeBankAccountDTO,
} from "@domain/@shared/payment-gateway/payment-gateway.dto";
import { BankAccountType } from "@domain/store/store-bank-account-type.value";
import { Cpf } from "@domain/@shared/value-objects/cpf.value";
import { Cnpj } from "@domain/@shared/value-objects/cnpj.value";
import type { IStoreRepository } from "@infrastructure/repositories/interfaces/store-repository.interface";

@Injectable()
export class IopayService implements PaymentGatewayInterface, OnModuleInit {
  public readonly name = "iopay";
  public readonly authTokenTtl = 60 * 50;
  private readonly gateway: AxiosInstance;
  private readonly email: string;
  private readonly secret: string;
  private readonly sellerId: string;
  private cachedAuthToken: string | null = null;
  private authTokenExpiresAt: number = 0;

  constructor(
    private readonly configService: ConfigService,
    @Inject("StoreRepository")
    private readonly storeRepository: IStoreRepository,
  ) {
    const baseUrl = this.configService.get<string>("iopay.baseUrl");
    const email = this.configService.get<string>("iopay.email");
    const secret = this.configService.get<string>("iopay.secret");
    const sellerId = this.configService.get<string>("iopay.sellerId");

    if (!email) {
      throw new Error("Payment email not found");
    }

    if (!secret) {
      throw new Error("Payment secret not found");
    }

    if (!sellerId) {
      throw new Error("Payment seller id not found");
    }

    this.email = email;
    this.secret = secret;
    this.sellerId = sellerId;
    this.gateway = axios.create({ baseURL: baseUrl });
  }

  onModuleInit() {
    console.log(
      `[${this.name}] Payment gateway initialized | seller: ${this.sellerId}`,
    );
  }

  getPaymentEmail(): string {
    return this.email;
  }

  getPaymentSecret(): string {
    return this.secret;
  }

  getPaymentIoSellerId(): string {
    return this.sellerId;
  }

  async associateBankAccount(params: {
    accountNumber: string;
    bankCode: string;
    holderName: string;
    ioSellerId: string;
    routingNumber: string;
    type: BankAccountType;
    document: Cpf | Cnpj;
  }): Promise<{ bankName: string; ioToken: string }> {
    const authResponse = await this.getAuthToken();
    const token: string = authResponse.data.access_token;

    const isCpf = params.document instanceof Cpf;

    const tokenizeResponse = await this.tokenizeBankAccount(
      params.ioSellerId,
      {
        holder_name: params.holderName,
        bank_code: params.bankCode,
        routing_number: params.routingNumber,
        account_number: params.accountNumber,
        type: params.type,
        ...(isCpf
          ? { taxpayer_id: params.document.getValue() }
          : { ein: params.document.getValue() }),
      },
      token,
    );

    const ioToken: string = tokenizeResponse.data.id;
    const bankName: string = tokenizeResponse.data.bank_name ?? "";

    await this.associateTokenizedBankAccount(
      {
        io_seller_id: params.ioSellerId,
        token: ioToken,
      },
      token,
    );

    return { bankName, ioToken };
  }

  async getAuthToken() {
    const now = Date.now();

    if (this.cachedAuthToken && now < this.authTokenExpiresAt) {
      return { data: { access_token: this.cachedAuthToken } };
    }

    const response = await this.gateway.post("/auth/login", {
      email: this.email,
      secret: this.secret,
      io_seller_id: this.sellerId,
    });

    const accessToken: string = response.data.access_token;

    this.cachedAuthToken = accessToken;
    this.authTokenExpiresAt = now + this.authTokenTtl * 1000;

    return response;
  }

  getSpecialToken() {
    return this.gateway.post("/v1/card/authentication", {
      email: this.email,
      secret: this.secret,
      io_seller_id: this.sellerId,
    });
  }

  createCustomer(body: BodyCreateCustomerDTO) {
    return this.gateway.post("/v1/customer/new", body.customer, {
      headers: { Authorization: `Bearer ${body.token}` },
    });
  }

  associateCardWithCustomer(
    ioCustomerId: string,
    cardToken: string,
    specialToken: string,
  ) {
    return this.gateway.post(
      "/v1/card/associate_token_with_customer",
      {
        id_customer: ioCustomerId,
        token: cardToken,
      },
      { headers: { Authorization: `Bearer ${specialToken}` } },
    );
  }

  updateCustomerEmail(ioCustomerId: string, email: string, token: string) {
    return this.gateway.post(
      `/v1/customer/update/${ioCustomerId}`,
      { email },
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  createSellerPF(body: BodyCreateSellerPFDTO, token: string) {
    return this.gateway.post("/v1/sellers/create/individuals", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createSellerPJ(body: BodyCreateSellerPJDTO, token: string) {
    return this.gateway.post("/v1/sellers/create/businesses", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getBalance(ioSellerId: string, token: string) {
    return this.gateway.get(`/v1/sellers/get/${ioSellerId}/balances`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  tokenizeBankAccount(
    ioSellerId: string,
    body: BodyTokenizeBankAccountDTO,
    token: string,
  ) {
    if (!body.taxpayer_id && !body.ein) {
      throw new ThirdPartyError(
        this.name,
        "tax_payer_id or ein is required",
        "When creating a bank account, you must provide either a CPF or a CNPJ",
      );
    }

    return this.gateway.post(
      `/v1/sellers/bank_accounts/tokenize/${ioSellerId}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  associateTokenizedBankAccount(
    body: BodyAssociateTokenizedBankAccountDTO,
    token: string,
  ) {
    return this.gateway.post(
      "/v1/sellers/bank_accounts/associate_bank_account",
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  listAllBankAccounts(ioSellerId: string, token: string) {
    return this.gateway.get(`/v1/sellers/bank_accounts/list/${ioSellerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  getIopayBankAccount(
    bankAccountId: number,
    ioSellerId: string,
    token: string,
  ) {
    return this.gateway.get(
      `/v1/sellers/bank_accounts/get/${ioSellerId}/${bankAccountId}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  createCreditTransactionWithSplit(
    ioCustomerId: string,
    body: BodyCreateCreditTransactionWithSplitDTO,
    specialToken: string,
  ) {
    return this.gateway.post(`/v1/transaction/new/${ioCustomerId}`, body, {
      headers: { Authorization: `Bearer ${specialToken}` },
    });
  }

  generatePixTransaction(
    ioCustomerId: string,
    body: BodyGeneratePixTransactionDTO,
    token: string,
  ) {
    return this.gateway.post(`/v1/transaction/new/${ioCustomerId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  async generateStorePixTransaction(params: {
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
  }> {
    const storeData = await this.storeRepository.findByIdWithOwnerIoCustomerId(
      params.storeId,
    );

    if (!storeData) {
      throw new Error("Store not found");
    }

    if (!storeData.ownerIoCustomerId) {
      throw new Error("Owner does not have an ioCustomerId");
    }

    try {
      const authResponse = await this.getAuthToken();
      const authToken: string = authResponse.data.access_token;

      const body: BodyGeneratePixTransactionDTO = {
        amount: params.amountInCents,
        currency: "BRL",
        payment_type: "pix",
        io_seller_id: this.getPaymentIoSellerId(),
        reference_id: params.referenceId,
        description: params.description,
        statement_descriptor: params.statementDescriptor,
      };

      const response = await this.generatePixTransaction(
        storeData.ownerIoCustomerId,
        body,
        authToken,
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message ??
            "No response data from PIX store transaction",
        );
      }

      const { success } = response.data;

      return {
        storeId: params.storeId,
        referenceId: params.referenceId,
        transactionId: success.id,
        pixKey: success.payment_method.key.value,
        pixQrCode: success.pix_qrcode_url,
        pixEmv: success.payment_method.qr_code.emv,
        expirationDate: success.payment_method.expiration_date,
        status: success.status,
        amountInCents: Math.round(parseFloat(success.amount) * 100),
        description: success.description,
        customerId: null,
      };
    } catch (err: any) {
      throw new Error(`[IOPAY_GATEWAY] ${err.message}`);
    }
  }

  getTransaction(transactionId: string, token: string) {
    return this.gateway.get(`/v1/transaction/get/${transactionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  refundTransaction(
    transactionId: string,
    body: { amount: number },
    token: string,
  ) {
    return this.gateway.post(`/v1/transaction/void/${transactionId}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  createTransferToBankAccount(
    body: BodyCreateTransferToBankAccountDTO,
    ioSellerId: string,
    bankAccountId: number,
    token: string,
  ) {
    return this.gateway.post(
      `/v1/sellers/transfers/new/${ioSellerId}/${bankAccountId}`,
      body,
      { headers: { Authorization: `Bearer ${token}` } },
    );
  }

  listAllTransfers(ioSellerId: string, token: string) {
    return this.gateway.get(`/v1/sellers/transfers/list/${ioSellerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
