import { Order } from "@domain/order/order.aggregate";
import { OrderID } from "@domain/order/order-id.value";
import { CustomerID } from "@domain/customer/customer-id.value";
import { ShopID } from "@domain/store/shop-id.value";

export interface IOrderRepository {
  create(order: Order): Promise<void>;
  save(order: Order): Promise<void>;
  findById(id: OrderID): Promise<Order | null>;
  findByIdWithProducts(orderId: string): Promise<{
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
  } | null>;
  updateStatus(orderId: string, status: string): Promise<void>;
  findByCustomer(customerId: CustomerID): Promise<Order[]>;
  findByShop(shopId: ShopID): Promise<Order[]>;
  delete(id: OrderID): Promise<void>;
}
