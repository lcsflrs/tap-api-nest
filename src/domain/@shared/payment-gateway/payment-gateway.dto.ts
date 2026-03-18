export interface BodyCreateCustomerDTO {
  token: string;
  customer: {
    first_name: string;
    email: string;
    taxpayer_id: string;
    phone_number: string;
    address: {
      line1: string;
      line2: string;
      line3: string;
      neighborhood: string;
      city: string;
      state: string;
      postal_code: string;
    };
  };
}

export interface BodyCreateSellerPFDTO {
  send_welcome_email: boolean;
  mcc: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  cpf: string;
  birthdate: string;
  statement_descriptor: string;
  address: {
    line1: string;
    line2: string;
    line3: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country_code: string;
  };
}

export interface BodyCreateSellerPJDTO {
  mcc: number;
  statement_descriptor: string;
  business: {
    name: string;
    email: string;
    phone_number: string;
    cnpj: string;
    opening_date: string;
    website: string;
  };
  owner: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    cpf: string;
    birthdate: string;
  };
  business_address: {
    line1: string;
    line2: string;
    line3: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country_code: string;
  };
  owner_address: {
    line1: string;
    line2: string;
    line3: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    country_code: string;
  };
}

export interface BodyTokenizeBankAccountDTO {
  holder_name: string;
  bank_code: string;
  routing_number: string;
  account_number: string;
  ein?: string;
  taxpayer_id?: string;
  type: "checking" | "savings";
}

export interface BodyAssociateTokenizedBankAccountDTO {
  io_seller_id: string;
  token: string;
}

export interface BodyCreateCreditTransactionWithSplitDTO {
  io_seller_id: string;
  payment_type: "credit";
  currency: "BRL";
  capture: 1;
  id_card: string;
  amount: number;
  installment_plan: {
    number_installments: number;
  };
  products: {
    name: string;
    code: string;
    amount: number;
    quantity: number;
  }[];
  description: string;
  statement_descriptor: string;
  reference_id: string;
  split_rules?: {
    receiver: string;
    receiver_fee_type: "free" | "porportional" | "full";
    split_type: "fixed" | "percentage";
    split_value: number;
    chargeback_liable?: boolean;
  }[];
}

export interface BodyGeneratePixTransactionDTO {
  amount: number;
  currency: string;
  description?: string;
  statement_descriptor?: string;
  io_seller_id: string;
  payment_type: "pix";
  reference_id: string;
}

export interface BodyGenerateStorePixTransactionDTO {
  amount: number;
  currency: string;
  description?: string;
  statement_descriptor?: string;
  io_seller_id: string;
  payment_type: "pix";
  reference_id: string;
}

export interface BodyCreateTransferToBankAccountDTO {
  amount: number;
  description?: string;
  statement_descriptor?: string;
}
