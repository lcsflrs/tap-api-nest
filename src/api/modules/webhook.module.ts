import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { WebhookController } from "../controllers/webhook.controller";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [WebhookController],
})
export class WebhookModule {}
