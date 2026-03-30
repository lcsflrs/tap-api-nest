import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BcryptAdapter } from "@infrastructure/adapters/bcrypt/hash-adapter.service";
import { JwtService } from "@infrastructure/adapters/jwt/jwt.service";
import { AppSocketGateway } from "./adapters/socket/socket.gateway";
import { StoreWebhookGateway } from "./third-party/webhook/store-webhook-gateway";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import { CashierTokenRepository } from "./repositories/cashier-token.repository";
import { OrderRepository } from "@infrastructure/repositories/order.repository";
import { PaymentTokenRepository } from "./repositories/payment-token.repository";
import { ProductTicketRepository } from "@infrastructure/repositories/product-ticket.repository";
import { AccessUserRepository } from "@infrastructure/repositories/access-user.repository";
import { AdjustmentRepository } from "@infrastructure/repositories/adjustment.repository";
import { CustomerRepository } from "@infrastructure/repositories/customer.repository";
import { IngressRepository } from "@infrastructure/repositories/ingress.repository";
import { OwnerRepository } from "@infrastructure/repositories/owner.repository";
import { PartyRepository } from "@infrastructure/repositories/party.repository";
import { PayoutRepository } from "@infrastructure/repositories/payout.repository";
import { PixTransactionRepository } from "@infrastructure/repositories/pix-transaction.repository";
import { ProductRepository } from "@infrastructure/repositories/product.repository";
import { StorePixTransactionRepository } from "@infrastructure/repositories/store-pix-transaction.repository";
import { StoreRepository } from "@infrastructure/repositories/store.repository";
import { StoreSaleRepository } from "@infrastructure/repositories/store-sale.repository";
import {
  CashierTokenSchemaClass,
  CashierTokenSchema,
} from "@infrastructure/mongodb/schemas/cashier-token.schema";
import {
  OrderSchemaClass,
  OrderSchema,
} from "@infrastructure/mongodb/schemas/order.schema";
import {
  PaymentTokenSchemaClass,
  PaymentTokenSchema,
} from "@infrastructure/mongodb/schemas/payment-token.schema";
import {
  ProductTicketSchemaClass,
  ProductTicketSchema,
} from "@infrastructure/mongodb/schemas/product-ticket.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CashierTokenSchemaClass.name,
        schema: CashierTokenSchema,
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
        name: ProductTicketSchemaClass.name,
        schema: ProductTicketSchema,
      },
    ]),
  ],
  providers: [
    PrismaService,
    AppSocketGateway,
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
      useExisting: AppSocketGateway,
    },
    {
      provide: "StoreWebhookGateway",
      useClass: StoreWebhookGateway,
    },
    {
      provide: "CashierTokenRepository",
      useClass: CashierTokenRepository,
    },
    {
      provide: "OrderRepository",
      useClass: OrderRepository,
    },
    {
      provide: "PaymentTokenRepository",
      useClass: PaymentTokenRepository,
    },
    {
      provide: "ProductTicketRepository",
      useClass: ProductTicketRepository,
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
      provide: "CustomerRepository",
      useClass: CustomerRepository,
    },
    {
      provide: "IngressRepository",
      useClass: IngressRepository,
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
      provide: "PayoutRepository",
      useClass: PayoutRepository,
    },
    {
      provide: "PixTransactionRepository",
      useClass: PixTransactionRepository,
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
      provide: "StoreRepository",
      useClass: StoreRepository,
    },
    {
      provide: "StoreSaleRepository",
      useClass: StoreSaleRepository,
    },
  ],
  exports: [
    MongooseModule,
    PrismaService,
    "HashAdapter",
    "JwtService",
    "SocketService",
    "StoreWebhookGateway",
    "CashierTokenRepository",
    "OrderRepository",
    "PaymentTokenRepository",
    "ProductTicketRepository",
    "AccessUserRepository",
    "AdjustmentRepository",
    "CustomerRepository",
    "IngressRepository",
    "OwnerRepository",
    "PartyRepository",
    "PayoutRepository",
    "PixTransactionRepository",
    "ProductRepository",
    "StorePixTransactionRepository",
    "StoreRepository",
    "StoreSaleRepository",
  ],
})
export class InfrastructureModule {}
