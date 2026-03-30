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
import { WorkerGuard } from "@api/guards/worker.guard";
import { SetActualBatchDto } from "@api/dtos/party/set-actual-batch.dto";
import { SearchDocumentDataDto } from "@api/dtos/party/search-document-data.dto";
import { FillPendentDataDto } from "@api/dtos/party/fill-pendent-data.dto";
import { SetPartyProductsDto } from "@api/dtos/party/set-party-products.dto";
import { AssociatePromoterDto } from "@api/dtos/party/associate-promoter.dto";
import { CreateFreeIngressDto } from "@api/dtos/party/create-free-ingress.dto";
import { AuthorizeEntryDto } from "@api/dtos/party/authorize-entry.dto";
import { GetPartyQuery } from "@application/queries/dtos/get-party.query";
import { GetPartyInfoQuery } from "@application/queries/dtos/get-party-info.query";
import { GetPartyBatchesQuery } from "@application/queries/dtos/get-party-batches.query";
import { GetTokenRecommendationQuery } from "@application/queries/dtos/get-token-recommendation.query";
import { SearchDocumentDataQuery } from "@application/queries/dtos/search-document-data.query";
import { GetPartyProductsQuery } from "@application/queries/dtos/get-party-products.query";
import { SetActualBatchCommand } from "@application/commands/dtos/set-actual-batch.command";
import { FillPendentDataCommand } from "@application/commands/dtos/fill-pendent-data.command";
import { SetPartyProductsCommand } from "@application/commands/dtos/set-party-products.command";
import { AssociatePromoterCommand } from "@application/commands/dtos/associate-promoter.command";
import { CreateFreeIngressCommand } from "@application/commands/dtos/create-free-ingress.command";
import { AuthorizeEntryCommand } from "@application/commands/dtos/authorize-entry.command";

@Controller()
export class PartyController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("/party/:partyId")
  async getParty(@Param("partyId", ParseIntPipe) partyId: number) {
    return this.queryBus.execute(new GetPartyQuery(partyId));
  }

  @Get("/party/info/:partyId")
  async getPartyInfo(@Param("partyId", ParseIntPipe) partyId: number) {
    return this.queryBus.execute(new GetPartyInfoQuery(partyId));
  }

  @Get("/party/recommended-tokens/:partyId")
  @UseGuards(CustomerGuard)
  async getTokenRecommendation(
    @Param("partyId", ParseIntPipe) partyId: number,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.queryBus.execute(
      new GetTokenRecommendationQuery(user.customerId!, partyId),
    );
  }

  @Get("/party/get-batches/:partyId")
  async getBatches(@Param("partyId", ParseIntPipe) partyId: number) {
    return this.queryBus.execute(new GetPartyBatchesQuery(partyId));
  }

  @Post("/party/set-actual-batch/:partyId")
  @UseGuards(WorkerGuard)
  async setActualBatch(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: SetActualBatchDto,
  ) {
    return this.commandBus.execute(
      new SetActualBatchCommand(partyId, body.actualBatchId),
    );
  }

  @Post("/party/search-document-data/:partyId")
  @UseGuards(WorkerGuard)
  async searchDocumentData(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: SearchDocumentDataDto,
  ) {
    return this.queryBus.execute(
      new SearchDocumentDataQuery(body.document, partyId),
    );
  }

  @Post("/party/fill-pendent-data/:partyId")
  @UseGuards(WorkerGuard)
  async fillPendentData(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: FillPendentDataDto,
  ) {
    return this.commandBus.execute(
      new FillPendentDataCommand(
        body.document,
        partyId,
        body.braceletNumber,
        body.birthDate,
      ),
    );
  }

  @Get("/party/products-associated/:partyId")
  @UseGuards(WorkerGuard)
  async getPartyProducts(@Param("partyId", ParseIntPipe) partyId: number) {
    return this.queryBus.execute(new GetPartyProductsQuery(partyId));
  }

  @Post("/party/products-associated/:partyId")
  @UseGuards(WorkerGuard)
  async setPartyProducts(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: SetPartyProductsDto,
  ) {
    return this.commandBus.execute(
      new SetPartyProductsCommand(partyId, body.productsAvailableId),
    );
  }

  @Post("/party/associate-promoter")
  @UseGuards(WorkerGuard)
  async associatePromoter(@Body() body: AssociatePromoterDto) {
    return this.commandBus.execute(
      new AssociatePromoterCommand(body.userId, body.partyId),
    );
  }

  @Post("/party/create-free-ingress/:partyId")
  @UseGuards(WorkerGuard)
  async createFreeIngress(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: CreateFreeIngressDto,
  ) {
    return this.commandBus.execute(
      new CreateFreeIngressCommand(body.customerId, partyId),
    );
  }

  @Post("/party/management/authorize-entry/:partyId")
  @UseGuards(WorkerGuard)
  async authorizeEntry(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: AuthorizeEntryDto,
  ) {
    return this.commandBus.execute(
      new AuthorizeEntryCommand(body.document, partyId, body.valueInCents),
    );
  }
}
