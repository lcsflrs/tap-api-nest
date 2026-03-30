import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CurrentUser } from "@api/decorators/current-user.decorator";
import type { CurrentUserType } from "@api/@types/current-user.type";
import { CustomerGuard } from "@api/guards/customer.guard";
import { CreateInviteDto } from "@api/dtos/promoter/create-invite.dto";
import { CreateInviteCommand } from "@application/commands/dtos/create-invite.command";
import { GetInvitesDataQuery } from "@application/queries/dtos/get-invites-data.query";

@Controller()
export class PromoterController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("/promoter/get-invites-data/:partyId")
  @UseGuards(CustomerGuard)
  async getInvitesData(
    @Param("partyId", ParseIntPipe) partyId: number,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.queryBus.execute(
      new GetInvitesDataQuery(user.customerId!, partyId),
    );
  }

  @Post("/promoter/create-invite/:partyId")
  @UseGuards(CustomerGuard)
  async createInvite(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: CreateInviteDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new CreateInviteCommand(
        user.customerId!,
        partyId,
        body.document,
        body.name,
      ),
    );
  }
}
