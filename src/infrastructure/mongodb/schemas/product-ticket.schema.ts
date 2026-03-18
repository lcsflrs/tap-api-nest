import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ProductTicketDocument = HydratedDocument<ProductTicketSchemaClass>;

@Schema({ collection: "product_tickets" })
export class ProductTicketSchemaClass {
  @Prop({ required: true }) workerId!: number;
  @Prop({ required: true }) paymentMethod!: string;
  @Prop({ required: true }) createdAt!: Date;

  @Prop({
    type: [{ shopProductId: Number, quantity: Number }],
    required: true,
  })
  products!: { shopProductId: number; quantity: number }[];
}

export const ProductTicketSchema = SchemaFactory.createForClass(
  ProductTicketSchemaClass,
);
