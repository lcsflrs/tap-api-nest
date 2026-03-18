import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { VerifyWorkerAccessQuery } from "./dtos/verify-worker-access.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";

@QueryHandler(VerifyWorkerAccessQuery)
export class VerifyWorkerAccessHandler implements IQueryHandler<VerifyWorkerAccessQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @Inject("JwtService") private readonly jwtService: IJwtService,
  ) {}

  async execute(query: VerifyWorkerAccessQuery) {
    const { accessJwt } = query;

    let payload: { workerId: number; shopId: number };

    try {
      payload = (await this.jwtService.verify(accessJwt)) as {
        workerId: number;
        shopId: number;
      };
    } catch {
      throw new Error("Invalid or expired token");
    }

    const worker = await this.prisma.shopWorker.findFirst({
      where: {
        id: payload.workerId,
        active: true,
      },
    });

    if (!worker) {
      throw new Error("Worker not found");
    }

    return {
      workerId: worker.id,
      shopId: worker.shopId,
      role: worker.role,
    };
  }
}
