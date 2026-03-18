import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { GetAllWorkersQuery } from "./dtos/get-all-workers.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";
import type { IJwtService } from "@infrastructure/adapters/jwt/jwt.interface";

@QueryHandler(GetAllWorkersQuery)
export class GetAllWorkersHandler implements IQueryHandler<GetAllWorkersQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    @Inject("JwtService") private readonly jwtService: IJwtService,
  ) {}

  async execute(query: GetAllWorkersQuery) {
    const shop = await this.prisma.shop.findUnique({
      where: { id: query.shopId },
      include: { shopWorkers: true },
    });

    if (!shop) {
      throw new Error("Shop not found");
    }

    const workers = await Promise.all(
      shop.shopWorkers
        .filter(
          (worker) =>
            worker.expirationDate instanceof Date &&
            !isNaN(worker.expirationDate.getTime()),
        )
        .map(async (worker) => {
          const ttl = worker.expirationDate!.getTime() - Date.now();
          const accessJwt = await this.jwtService.signWithTtl(
            { shopId: query.shopId, workerId: worker.id },
            ttl,
          );

          return {
            workerId: worker.id,
            shopId: query.shopId,
            name: worker.name ?? "",
            expirationDate: worker.expirationDate!,
            role: worker.role,
            accessJwt,
          };
        }),
    );

    return { workers };
  }
}
