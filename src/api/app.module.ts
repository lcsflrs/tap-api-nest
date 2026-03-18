import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdjustmentModule } from "./modules/adjustment.module";
import { PayoutModule } from "./modules/payout.module";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("MONGODB_URI"),
      }),
    }),
    InfrastructureModule,
    AdjustmentModule,
    PayoutModule,
  ],
})
export class AppModule {}
