import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { WorkerGuard } from "@api/guards/worker.guard";
import { GetPartyAnalysisQuery } from "@application/queries/dtos/get-party-analysis.query";
import { GetLastSalesQuery } from "@application/queries/dtos/get-last-sales.query";

@Controller()
export class ManagementController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get("/party/management/analyze/:partyId")
  async analyzeParty(@Param("partyId", ParseIntPipe) partyId: number) {
    return this.queryBus.execute(new GetPartyAnalysisQuery(partyId));
  }

  @Get("/party/management/last-sales/:partyId")
  @UseGuards(WorkerGuard)
  async getLastSales(@Param("partyId", ParseIntPipe) partyId: number) {
    return this.queryBus.execute(new GetLastSalesQuery(partyId));
  }
}
