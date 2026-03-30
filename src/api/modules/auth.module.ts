import { Module } from "@nestjs/common";
import { ApplicationModule } from "@application/application.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { AuthController } from "../controllers/auth.controller";

@Module({
  imports: [ApplicationModule, InfrastructureModule],
  controllers: [AuthController],
})
export class AuthModule {}
