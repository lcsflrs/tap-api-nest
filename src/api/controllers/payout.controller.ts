import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePayoutCommand } from "src/application/services/commands/dtos/create-payout.command";
import { MarkPayoutPaidCommand } from "src/application/services/commands/dtos/mark-payout-paid.command";
import { AddItemToPayoutCommand } from "src/application/services/commands/dtos/add-item-to-payout.command";
import { FindPayoutByIdQuery } from "src/application/services/queries/dtos/find-payout-by-id.query";
import { FindManyPayoutsQuery } from "src/application/services/queries/dtos/find-many-payouts.query";

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
      clientId: string;
      items: Array<{
        amountInCents: number;
        consumptionId: string;
      }>;
    },
  ) {
    return this.commandBus.execute(
      new CreatePayoutCommand(body.clientId, body.items),
    );
  }

  @Get(":id")
  async findById(@Param("id") id: string) {
    return this.queryBus.execute(new FindPayoutByIdQuery(id));
  }

  @Get()
  async findMany(
    @Query("page", ParseIntPipe) page: number,
    @Query("limit", ParseIntPipe) limit: number,
    @Query("clientId") clientId?: string,
    @Query("status") status?: string,
  ) {
    return this.queryBus.execute(
      new FindManyPayoutsQuery(page, limit, clientId, status),
    );
  }

  @Patch(":id/paid")
  async markAsPaid(
    @Param("id") id: string,
    @Body() body: { proofFileUrl: string },
  ) {
    return this.commandBus.execute(
      new MarkPayoutPaidCommand(id, body.proofFileUrl),
    );
  }

  @Patch(":id/items")
  async addItem(
    @Param("id") id: string,
    @Body() body: { amountInCents: number; consumptionId: string },
  ) {
    return this.commandBus.execute(
      new AddItemToPayoutCommand(id, body.amountInCents, body.consumptionId),
    );
  }
}
