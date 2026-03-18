import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type {
  ICashierTokenRepository,
  CashierTokenData,
} from "./interfaces/cashier-token-repository.interface";
import {
  CashierTokenSchemaClass,
  CashierTokenDocument,
} from "@infrastructure/mongodb/schemas/cashier-token.schema";

@Injectable()
export class CashierTokenRepository implements ICashierTokenRepository {
  constructor(
    @InjectModel(CashierTokenSchemaClass.name)
    private readonly model: Model<CashierTokenDocument>,
  ) {}

  async save(data: CashierTokenData): Promise<string> {
    const created = await this.model.create({
      ...data,
      createdAt: new Date(),
    });

    return String(created._id);
  }

  async findById(id: string): Promise<CashierTokenData | null> {
    const doc = await this.model.findById(id).lean();

    if (!doc) {
      return null;
    }

    return {
      amount: doc.amount,
      braceletNumber: doc.braceletNumber,
      partyId: doc.partyId,
      paymentMethod: doc.paymentMethod,
      party: doc.party,
      products: doc.products,
    };
  }
}
