import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateAdjustmentCommand } from "@application/commands/dtos/create-adjustment.command";
import { FindManyAdjustmentsQuery } from "@application/queries/dtos/find-many-adjustments.query";
import { GetAdjustmentsMetricsQuery } from "@application/queries/dtos/get-adjustments-metrics.query";
import { CreateAdjustmentDto } from "@api/dtos/adjustment/create-adjustment.dto";
import { FindManyAdjustmentsDto } from "@api/dtos/adjustment/find-many-adjustments.dto";

@Controller("adjustments")
export class AdjustmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(@Body() body: CreateAdjustmentDto) {
    return this.commandBus.execute(
      new CreateAdjustmentCommand(
        body.valueInCents,
        body.reason,
        body.type,
        body.attachment,
      ),
    );
  }

  @Get("metrics")
  async getAdjustmentsMetrics() {
    return this.queryBus.execute(new GetAdjustmentsMetricsQuery());
  }

  @Get()
  async findMany(@Query() query: FindManyAdjustmentsDto) {
    return this.queryBus.execute(
      new FindManyAdjustmentsQuery(query.page, query.limit),
    );
  }
}
