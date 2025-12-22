import {
  Injectable,
  type OnModuleInit,
  type OnModuleDestroy,
} from "@nestjs/common";
import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "./generated/prisma";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaMariaDb({
      connectionLimit: 5,
      database: process.env.DATABASE_NAME,
      host: process.env.DATABASE_HOST,
      password: process.env.DATABASE_PASSWORD,
      user: process.env.DATABASE_USER,
      port: Number(process.env.DATABASE_PORT),
      allowPublicKeyRetrieval: true,
    });

    super({
      adapter,
      log: ["query", "info", "warn", "error"],
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
