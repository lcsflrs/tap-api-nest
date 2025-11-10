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
import { CreateAdjustmentCommand } from "src/application/services/commands/dtos/create-adjustment.command";
import { FindAdjustmentByIdQuery } from "src/application/services/queries/dtos/find-adjustment-by-id.query";
import { FindManyAdjustmentsQuery } from "src/application/services/queries/dtos/find-many-adjustments.query";

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
      clientId: string;
      valueInCents: number;
      reason: string;
      attachment?: string;
    },
  ) {
    return this.commandBus.execute(
      new CreateAdjustmentCommand(
        body.clientId,
        body.valueInCents,
        body.reason,
        body.attachment,
      ),
    );
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.queryBus.execute(new FindAdjustmentByIdQuery(id));
  }

  @Get()
  async findMany(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
    @Query("clientId") clientId?: string,
  ) {
    return this.queryBus.execute(
      new FindManyAdjustmentsQuery(page, limit, clientId),
    );
  }
}
