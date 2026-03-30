import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePayoutCommand } from "@application/commands/dtos/create-payout.command";
import { FindPaidPayoutsQuery } from "@application/queries/dtos/find-paid-payouts.query";
import { FindPendingPayoutsQuery } from "@application/queries/dtos/find-pending-payouts.query";
import { GetPayoutsMetricsQuery } from "@application/queries/dtos/get-payouts-metrics.query";
import { CreatePayoutDto } from "@api/dtos/payout/create-payout.dto";
import { FindPendingPayoutsDto } from "@api/dtos/payout/find-pending-payouts.dto";
import { FindPaidPayoutsDto } from "@api/dtos/payout/find-paid-payouts.dto";

@Controller("payouts")
export class PayoutController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreatePayoutDto) {
    return this.commandBus.execute(
      new CreatePayoutCommand(
        body.shopId,
        body.shopName,
        body.storeSaleIds,
        body.proofFileUrl,
        body.date,
      ),
    );
  }

  @Get("metrics")
  async getPayoutsMetrics() {
    return this.queryBus.execute(new GetPayoutsMetricsQuery());
  }

  @Get("pending")
  async findPending(@Query() query: FindPendingPayoutsDto) {
    return this.queryBus.execute(
      new FindPendingPayoutsQuery(query.page, query.limit, query.storeName),
    );
  }

  @Get()
  async findPaid(@Query() query: FindPaidPayoutsDto) {
    return this.queryBus.execute(
      new FindPaidPayoutsQuery(
        query.page,
        query.limit,
        query.storeName,
        query.status,
      ),
    );
  }
}
