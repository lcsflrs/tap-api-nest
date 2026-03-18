import { QueryHandler, IQueryHandler, QueryBus } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { WorkerGetShopCatalogQuery } from "./dtos/worker-get-shop-catalog.query";
import { GetShopCatalogQuery } from "./dtos/get-shop-catalog.query";
import { PrismaService } from "@infrastructure/prisma/prisma.service";

@QueryHandler(WorkerGetShopCatalogQuery)
export class WorkerGetShopCatalogHandler implements IQueryHandler<WorkerGetShopCatalogQuery> {
  constructor(
    @Inject() private readonly prisma: PrismaService,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: WorkerGetShopCatalogQuery) {
    const worker = await this.prisma.shopWorker.findUnique({
      where: { id: query.workerId },
    });

    if (!worker) {
      throw new Error("Worker not found");
    }

    return this.queryBus.execute(new GetShopCatalogQuery(worker.shopId));
  }
}
