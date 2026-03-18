import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import { AccessUserRepository } from "@infrastructure/repositories/access-user.repository";
import { AdjustmentRepository } from "@infrastructure/repositories/adjustment.repository";
import { CustomerRepository } from "@infrastructure/repositories/customer.repository";
import { IngressRepository } from "@infrastructure/repositories/ingress.repository";
import { OrderRepository } from "@infrastructure/repositories/order.repository";
import { OwnerRepository } from "@infrastructure/repositories/owner.repository";
import { PartyRepository } from "@infrastructure/repositories/party.repository";
import { PayoutRepository } from "@infrastructure/repositories/payout.repository";
import { PixTransactionRepository } from "@infrastructure/repositories/pix-transaction.repository";
import { ProductRepository } from "@infrastructure/repositories/product.repository";
import { StorePixTransactionRepository } from "@infrastructure/repositories/store-pix-transaction.repository";
import { StoreSaleRepository } from "@infrastructure/repositories/store-sale.repository";
import { StoreRepository } from "@infrastructure/repositories/store.repository";
import { ProductTicketRepository } from "@infrastructure/repositories/product-ticket.repository";
import { CashierTokenRepository } from "./repositories/cashier-token.repository";
import { PaymentTokenRepository } from "./repositories/payment-token.repository";
import { BcryptAdapter } from "@infrastructure/adapters/bcrypt/hash-adapter.service";
import { JwtService } from "@infrastructure/adapters/jwt/jwt.service";
import { AppSocketGateway } from "./adapters/socket/socket.gateway";
import {
  ProductTicketSchemaClass,
  ProductTicketSchema,
} from "@infrastructure/mongodb/schemas/product-ticket.schema";
import {
  OrderSchemaClass,
  OrderSchema,
} from "@infrastructure/mongodb/schemas/order.schema";
import {
  PaymentTokenSchemaClass,
  PaymentTokenSchema,
} from "@infrastructure/mongodb/schemas/payment-token.schema";
import {
  CashierTokenSchemaClass,
  CashierTokenSchema,
} from "@infrastructure/mongodb/schemas/cashier-token.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductTicketSchemaClass.name,
        schema: ProductTicketSchema,
      },
      {
        name: OrderSchemaClass.name,
        schema: OrderSchema,
      },
      {
        name: PaymentTokenSchemaClass.name,
        schema: PaymentTokenSchema,
      },
      {
        name: CashierTokenSchemaClass.name,
        schema: CashierTokenSchema,
      },
    ]),
  ],
  providers: [
    PrismaService,
    {
      provide: "HashAdapter",
      useClass: BcryptAdapter,
    },
    {
      provide: "JwtService",
      useClass: JwtService,
    },
    {
      provide: "SocketService",
      useClass: AppSocketGateway,
    },
    {
      provide: "AccessUserRepository",
      useClass: AccessUserRepository,
    },
    {
      provide: "AdjustmentRepository",
      useClass: AdjustmentRepository,
    },
    {
      provide: "CashierTokenRepository",
      useClass: CashierTokenRepository,
    },
    {
      provide: "CustomerRepository",
      useClass: CustomerRepository,
    },
    {
      provide: "IngressRepository",
      useClass: IngressRepository,
    },
    {
      provide: "OrderRepository",
      useClass: OrderRepository,
    },
    {
      provide: "OwnerRepository",
      useClass: OwnerRepository,
    },
    {
      provide: "PartyRepository",
      useClass: PartyRepository,
    },
    {
      provide: "PaymentTokenRepository",
      useClass: PaymentTokenRepository,
    },
    {
      provide: "PayoutRepository",
      useClass: PayoutRepository,
    },
    {
      provide: "PixTransactionRepository",
      useClass: PixTransactionRepository,
    },
    {
      provide: "ProductTicketRepository",
      useClass: ProductTicketRepository,
    },
    {
      provide: "ProductRepository",
      useClass: ProductRepository,
    },
    {
      provide: "StorePixTransactionRepository",
      useClass: StorePixTransactionRepository,
    },
    {
      provide: "StoreSaleRepository",
      useClass: StoreSaleRepository,
    },
    {
      provide: "StoreRepository",
      useClass: StoreRepository,
    },
  ],
  exports: [
    PrismaService,
    "AccessUserRepository",
    "AdjustmentRepository",
    "CashierTokenRepository",
    "CustomerRepository",
    "IngressRepository",
    "OrderRepository",
    "OwnerRepository",
    "PartyRepository",
    "PaymentTokenRepository",
    "PayoutRepository",
    "PixTransactionRepository",
    "ProductRepository",
    "StorePixTransactionRepository",
    "StoreSaleRepository",
    "StoreRepository",
    "ProductTicketRepository",
  ],
})
export class InfrastructureModule {}
