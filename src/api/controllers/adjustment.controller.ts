import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateAdjustmentCommand } from "@application/commands/dtos/create-adjustment.command";
import { FindManyAdjustmentsQuery } from "@application/queries/dtos/find-many-adjustments.query";
import { GetAdjustmentsMetricsQuery } from "@application/queries/dtos/get-adjustments-metrics.query";

@Controller("adjustments")
export class AdjustmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async create(
    @Body()
    body: {
      valueInCents: number;
      reason: string;
      type: string;
      attachment?: string;
    },
  ) {
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
  async findMany(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
  ) {
    return this.queryBus.execute(new FindManyAdjustmentsQuery(page, limit));
  }
}
