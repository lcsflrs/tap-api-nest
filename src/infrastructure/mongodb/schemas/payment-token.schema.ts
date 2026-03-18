import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type PaymentTokenDocument = HydratedDocument<PaymentTokenSchemaClass>;

@Schema({ collection: "paymenttokens" })
export class PaymentTokenSchemaClass {
  @Prop({ required: true }) amount!: number;
  @Prop({ required: true }) cardToken!: string;
  @Prop({ required: true }) createdAt!: Date;
  @Prop({ required: true }) installments!: number;
  @Prop({ required: true }) partyId!: number;
  @Prop({ required: true }) paymentStatus!: string;
  @Prop({ required: true }) qrcode!: string;
  @Prop({ required: true }) serviceStatus!: string;
  @Prop() payedAt?: Date;
  @Prop() transactionId?: string;

  @Prop({
    type: { id: Number, name: String, address: String },
    required: true,
  })
  party!: { id: number; name: string; address: string };

  @Prop({
    type: { id: Number, customerId: String, name: String },
    required: true,
  })
  user!: { id: number; customerId: string; name: string };

  @Prop({
    type: [{ amount: Number, code: String, name: String, quantity: Number }],
    required: true,
  })
  products!: { amount: number; code: string; name: string; quantity: number }[];
}

export const PaymentTokenSchema = SchemaFactory.createForClass(
  PaymentTokenSchemaClass,
);
