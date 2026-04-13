import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: process.env.CORS_ORIGINS?.split(",") ?? ["*"],
    credentials: false,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix("api/v1");

  process.on("unhandledRejection", (err) => {
    console.error("Unhandled promise rejection:", err);
  });

  process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err);
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);

  console.log(`Server is running on: http://localhost:${port}/api/v1`);
}
void bootstrap();
