import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { CurrentUser } from "@api/decorators/current-user.decorator";
import type { CurrentUserType } from "@api/@types/current-user.type";
import { WorkerGuard } from "@api/guards/worker.guard";
import { GetProductsInOrderDto } from "@api/dtos/worker/get-products-in-order.dto";
import { GetProductsInOrderQuery } from "@application/queries/dtos/get-products-in-order.query";
import { WorkerGetShopCatalogQuery } from "@application/queries/dtos/worker-get-shop-catalog.query";

@Controller("store/shop")
@UseGuards(WorkerGuard)
export class WorkerController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get("temporary-worker/access")
  async loginTemporaryWorker(@CurrentUser() user: CurrentUserType) {
    return {
      status: "success",
      roleId: user.role,
    };
  }

  @Post("get-products-in-order")
  async getProductsInOrder(@Body() body: GetProductsInOrderDto) {
    return this.queryBus.execute(new GetProductsInOrderQuery(body.orderId));
  }

  @Get("worker/get-shop-catalog/:workerId")
  async workerGetShopCatalog(
    @Param("workerId", ParseIntPipe) workerId: number,
  ) {
    return this.queryBus.execute(new WorkerGetShopCatalogQuery(workerId));
  }
}
