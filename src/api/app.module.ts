import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { AdjustmentModule } from "./modules/adjustment.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { AuthModule } from "./modules/auth.module";
import { CustomerModule } from "./modules/customer.module";
import { PaymentModule } from "./modules/payment.module";
import { PayoutModule } from "./modules/payout.module";
import { SaleModule } from "./modules/sale.module";
import { StoreModule } from "./modules/store.module";
import { PartyModule } from "./modules/party.module";
import { ManagementModule } from "./modules/management.module";
import { PromoterModule } from "./modules/promoter.module";
import { WebhookModule } from "./modules/webhook.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const nodeEnv = config.get<string>("NODE_ENV");
        const defaultDbName =
          config.get<string>("MONGODB_DB_NAME") ??
          (nodeEnv === "prod" ? "tap_prod" : "tap_local");

        return {
          uri: config.get<string>("MONGODB_URI"),
          dbName: defaultDbName,
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 60000,
          retryWrites: true,

          onConnectionCreate: (connection: Connection) => {
            connection.on("connected", () => {
              console.log("MongoDB is connected");
            });

            connection.on("open", () => {
              console.log("MongoDB connection is open");
            });

            connection.on("disconnected", () => {
              console.warn("MongoDB is disconnected");
            });

            connection.on("reconnected", () => {
              console.log("MongoDB is reconnected");
            });

            connection.on("disconnecting", () => {
              console.warn("MongoDB is disconnecting");
            });

            connection.on("error", (err) => {
              console.error("MongoDB connection error:", err);
            });

            return connection;
          },
        };
      },
    }),
    InfrastructureModule,
    AdjustmentModule,
    AuthModule,
    CustomerModule,
    ManagementModule,
    PartyModule,
    PaymentModule,
    PayoutModule,
    PromoterModule,
    SaleModule,
    StoreModule,
    WebhookModule,
  ],
})
export class AppModule {}
