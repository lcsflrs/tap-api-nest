import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<OrderSchemaClass>;

@Schema({ collection: "orders" })
export class OrderSchemaClass {
  @Prop({ required: true }) cardId!: string;
  @Prop({ required: true }) customerId!: number;
  @Prop({ required: true }) shopId!: number;
  @Prop({ required: true }) installments!: number;
  @Prop({ required: true }) paymentStatus!: string;
  @Prop({ required: true }) totalInCents!: number;
  @Prop({ required: true }) createdAt!: Date;

  @Prop({
    type: [
      {
        id: Number,
        name: String,
        priceInCents: Number,
        quantity: Number,
      },
    ],
    required: true,
  })
  products!: {
    id: number;
    name: string;
    priceInCents: number;
    quantity: number;
  }[];
}

export const OrderSchema = SchemaFactory.createForClass(OrderSchemaClass);
