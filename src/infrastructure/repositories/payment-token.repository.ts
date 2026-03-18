import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type {
  IPaymentTokenRepository,
  PaymentTokenData,
} from "./interfaces/payment-token-repository.interface";
import {
  PaymentTokenSchemaClass,
  PaymentTokenDocument,
} from "@infrastructure/mongodb/schemas/payment-token.schema";

@Injectable()
export class PaymentTokenRepository implements IPaymentTokenRepository {
  constructor(
    @InjectModel(PaymentTokenSchemaClass.name)
    private readonly model: Model<PaymentTokenDocument>,
  ) {}

  async save(data: PaymentTokenData): Promise<string> {
    const created = await this.model.create({
      ...data,
      createdAt: new Date(),
    });

    return String(created._id);
  }

  async findById(id: string): Promise<PaymentTokenData | null> {
    const doc = await this.model.findById(id).lean();

    if (!doc) {
      return null;
    }

    return {
      amount: doc.amount,
      cardToken: doc.cardToken,
      installments: doc.installments,
      partyId: doc.partyId,
      paymentStatus: doc.paymentStatus,
      qrcode: doc.qrcode,
      serviceStatus: doc.serviceStatus,
      party: doc.party,
      user: doc.user,
      products: doc.products,
      payedAt: doc.payedAt,
      transactionId: doc.transactionId,
    };
  }

  async updateStatus(id: string, paymentStatus: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { paymentStatus });
  }

  async updateServiceStatus(id: string, serviceStatus: string): Promise<void> {
    await this.model.findByIdAndUpdate(id, { serviceStatus });
  }

  async updateTransactionId(
    id: string,
    transactionId: string,
    payedAt: Date,
  ): Promise<void> {
    await this.model.findByIdAndUpdate(id, { transactionId, payedAt });
  }
}
