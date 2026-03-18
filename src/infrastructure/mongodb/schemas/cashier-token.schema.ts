import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CashierTokenDocument = HydratedDocument<CashierTokenSchemaClass>;

@Schema({ collection: "cashier_tokens" })
export class CashierTokenSchemaClass {
  @Prop({ required: true }) amount!: number;
  @Prop({ required: true }) braceletNumber!: string;
  @Prop({ required: true }) createdAt!: Date;
  @Prop({ required: true }) partyId!: number;
  @Prop({ required: true }) paymentMethod!: string;

  @Prop({
    type: { id: Number, name: String, address: String },
    required: true,
  })
  party!: { id: number; name: string; address: string };

  @Prop({
    type: [{ amount: Number, code: String, name: String, quantity: Number }],
    required: true,
  })
  products!: { amount: number; code: string; name: string; quantity: number }[];
}

export const CashierTokenSchema = SchemaFactory.createForClass(
  CashierTokenSchemaClass,
);
