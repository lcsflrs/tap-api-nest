import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePayoutCommand } from "@application/commands/dtos/create-payout.command";
import { FindPaidPayoutsQuery } from "@application/queries/dtos/find-paid-payouts.query";
import { FindPendingPayoutsQuery } from "@application/queries/dtos/find-pending-payouts.query";
import { GetPayoutsMetricsQuery } from "@application/queries/dtos/get-payouts-metrics.query";

@Controller("payouts")
export class PayoutController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      storeId: number;
      storeName: string;
      storeSaleIds: number[];
      proofFileUrl: string;
    },
  ) {
    return this.commandBus.execute(
      new CreatePayoutCommand(
        body.storeId,
        body.storeName,
        body.storeSaleIds,
        body.proofFileUrl,
      ),
    );
  }

  @Get("metrics")
  async getPayoutsMetrics() {
    return this.queryBus.execute(new GetPayoutsMetricsQuery());
  }

  @Get("pending")
  async findPending(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("storeName") storeName?: string,
  ) {
    return this.queryBus.execute(
      new FindPendingPayoutsQuery(page, limit, storeName),
    );
  }

  @Get()
  async findPaid(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query("limit", new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query("storeName") storeName?: string,
    @Query("status") status?: string,
  ) {
    return this.queryBus.execute(
      new FindPaidPayoutsQuery(page, limit, storeName, status),
    );
  }
}
