import { Customer } from "@domain/customer/customer.aggregate";

export interface ICustomerRepository {
  findById(id: number): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findByDocument(document: string): Promise<Customer | null>;
  save(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<void>;
  updateIoCustomerId(customerId: number, ioCustomerId: string): Promise<void>;
  saveWallet(customer: Customer): Promise<void>;
  registerWalletTransaction(
    customerId: number,
    amountInCents: number,
    type: "in" | "out",
    transactionId: string,
    referenceId: string,
    balanceAfter: number,
    description?: string,
  ): Promise<void>;
  findPendingDataByCustomerId(
    customerId: number,
    document: string,
  ): Promise<{
    invitePartyIds: number[];
    ingressPartyIds: number[];
    promoterPartyIds: number[];
  }>;
}
