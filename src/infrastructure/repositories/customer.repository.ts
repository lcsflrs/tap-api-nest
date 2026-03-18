import { Injectable } from "@nestjs/common";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { ICustomerRepository } from "./interfaces/customer-repository.interface";
import { Customer } from "@domain/customer/customer.aggregate";
import { CustomerMapper } from "@infrastructure/mappers/customer.mapper";

@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Customer | null> {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        wallet: true,
        creditCards: true,
      },
    });

    if (!customer) {
      return null;
    }

    return CustomerMapper.toDomain(customer);
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findFirst({
      where: { email },
      include: {
        wallet: true,
        creditCards: true,
      },
    });

    if (!customer) {
      return null;
    }

    return CustomerMapper.toDomain(customer);
  }

  async findByDocument(document: string): Promise<Customer | null> {
    const customer = await this.prisma.customer.findFirst({
      where: { document },
      include: {
        wallet: true,
        creditCards: true,
      },
    });

    if (!customer) {
      return null;
    }

    return CustomerMapper.toDomain(customer);
  }

  async save(customer: Customer): Promise<Customer> {
    const data = CustomerMapper.toPersistence(customer);
    let persistedCustomerId: number;

    await this.prisma.$transaction(async (tx) => {
      if (!data.id) {
        const created = await tx.customer.create({
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            document: data.document,
          },
        });
        persistedCustomerId = created.id;
      } else {
        await tx.customer.update({
          where: { id: data.id },
          data: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            document: data.document,
          },
        });
        persistedCustomerId = data.id;
      }

      if (data.wallet) {
        await tx.customerWallet.upsert({
          where: { customerId: persistedCustomerId },
          create: { ...data.wallet, customerId: persistedCustomerId },
          update: data.wallet,
        });
      }

      await tx.creditCard.deleteMany({
        where: { customerId: persistedCustomerId },
      });

      if (data.creditCards.length > 0) {
        await tx.creditCard.createMany({
          data: data.creditCards.map((card) => ({
            ...card,
            customerId: persistedCustomerId!,
          })),
        });
      }
    });

    return (await this.findById(persistedCustomerId!))!;
  }

  async update(customer: Customer): Promise<void> {
    const data = CustomerMapper.toPersistence(customer);

    await this.prisma.customer.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        document: data.document,
      },
    });
  }

  async saveWallet(customer: Customer): Promise<void> {
    const data = CustomerMapper.toPersistence(customer);

    if (!data.wallet) {
      return;
    }

    await this.prisma.customerWallet.upsert({
      where: { customerId: data.id },
      create: { ...data.wallet, customerId: data.id },
      update: data.wallet,
    });
  }

  async findPendingDataByCustomerId(
    customerId: number,
    document: string,
  ): Promise<{
    invitePartyIds: number[];
    ingressPartyIds: number[];
    promoterPartyIds: number[];
  }> {
    const [invites, ingresses, promoters] = await Promise.all([
      this.prisma.invite.findMany({ where: { document } }),
      this.prisma.ingress.findMany({
        where: { customerId, ingressStatusId: 2 },
      }),
      this.prisma.promoter.findMany({ where: { customerId } }),
    ]);

    return {
      invitePartyIds: invites.map((i) => i.partyId),
      ingressPartyIds: ingresses.map((i) => i.partyId),
      promoterPartyIds: promoters.map((p) => p.partyId),
    };
  }

  async updateIoCustomerId(
    customerId: number,
    ioCustomerId: string,
  ): Promise<void> {
    await this.prisma.customer.update({
      where: { id: customerId },
      data: { ioCustomerId },
    });
  }

  async registerWalletTransaction(
    customerId: number,
    amountInCents: number,
    type: "in" | "out",
    transactionId: string,
    referenceId: string,
    balanceAfter: number,
    description?: string,
  ): Promise<void> {
    await this.prisma.customerWalletTransaction.create({
      data: {
        customerId,
        amountInCents,
        type,
        transactionId,
        referenceId,
        balanceAfter,
        description: description ?? null,
      },
    });
  }
}
