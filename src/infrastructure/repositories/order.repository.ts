import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import type { IOrderRepository } from "./interfaces/order-repository.interface";
import { Order } from "@domain/order/order.aggregate";
import { OrderID } from "@domain/order/order-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { ShopID } from "@domain/store/shop-id.value";
import { OrderMapper } from "@infrastructure/mappers/order.mapper";
import {
  OrderSchemaClass,
  OrderDocument,
} from "@infrastructure/mongodb/schemas/order.schema";

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(
    @InjectModel(OrderSchemaClass.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(order: Order): Promise<void> {
    const data = OrderMapper.toPersistence(order);

    await this.orderModel.create(data);
  }

  async save(order: Order): Promise<void> {
    const data = OrderMapper.toPersistence(order);
    const { id, ...updateData } = data;

    await this.orderModel.findByIdAndUpdate(id, updateData);
  }

  async findById(orderId: OrderID): Promise<Order | null> {
    const order = await this.orderModel.findById(orderId.getValue()).lean();

    if (!order) {
      return null;
    }

    return OrderMapper.toDomain(order);
  }

  async findByIdWithProducts(orderId: string): Promise<{
    id: string;
    customerId: number;
    shopId: number;
    paymentStatus: string;
    totalInCents: number;
    installments: number;
    products: {
      shopProductId: number;
      quantity: number;
      priceInCents: number;
    }[];
  } | null> {
    const order = await this.orderModel.findById(orderId).lean();

    if (!order) {
      return null;
    }

    return {
      id: String(order._id),
      customerId: order.customerId,
      shopId: order.shopId,
      paymentStatus: order.paymentStatus,
      totalInCents: order.totalInCents,
      installments: order.installments,
      products: order.products.map((p) => ({
        shopProductId: p.id,
        quantity: p.quantity,
        priceInCents: p.priceInCents,
      })),
    };
  }

  async updateStatus(orderId: string, status: string): Promise<void> {
    await this.orderModel.findByIdAndUpdate(orderId, { paymentStatus: status });
  }

  async findByCustomer(customerId: CustomerID): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ customerId: customerId.getValue() })
      .sort({ createdAt: -1 })
      .lean();

    return orders.map(OrderMapper.toDomain);
  }

  async findByShop(shopId: ShopID): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ shopId: shopId.getValue() })
      .sort({ createdAt: -1 })
      .lean();

    return orders.map(OrderMapper.toDomain);
  }

  async delete(id: OrderID): Promise<void> {
    await this.orderModel.findByIdAndDelete(id.getValue());
  }
}
