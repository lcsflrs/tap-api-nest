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
import { StoreOwnerGuard } from "@api/guards/store-owner.guard";
import { AddBankAccountDto } from "@api/dtos/store/add-bank-account.dto";
import { CheckBalanceDto } from "@api/dtos/store/check-balance.dto";
import { CreateTemporaryWorkerDto } from "@api/dtos/store/create-temporary-worker.dto";
import { CreateTransferDto } from "@api/dtos/store/create-transfer.dto";
import { GetAllBankAccountsDto } from "@api/dtos/store/get-all-bank-accounts.dto";
import { GetAllTransfersDto } from "@api/dtos/store/get-all-transfers.dto";
import { GetBankAccountDto } from "@api/dtos/store/get-bank-account.dto";
import { GetShopListDto } from "@api/dtos/store/get-shop-list.dto";
import { ModifyProductsAvailableDto } from "@api/dtos/store/modify-products-available.dto";
import { AddStoreBankAccountCommand } from "@application/commands/dtos/add-store-bank-account.command";
import { CreateTemporaryWorkerCommand } from "@application/commands/dtos/create-temporary-worker.command";
import { CreateTransferCommand } from "@application/commands/dtos/create-transfer.command";
import { ModifyProductsAvailableCommand } from "@application/commands/dtos/modify-products-available.command";
import { CheckBalanceQuery } from "@application/queries/dtos/check-balance.query";
import { GetAllBankAccountsQuery } from "@application/queries/dtos/get-all-bank-accounts.query";
import { GetAllTransfersQuery } from "@application/queries/dtos/get-all-transfers.query";
import { GetAllWorkersQuery } from "@application/queries/dtos/get-all-workers.query";
import { GetBankAccountQuery } from "@application/queries/dtos/get-bank-account.query";
import { GetShopCatalogQuery } from "@application/queries/dtos/get-shop-catalog.query";
import { GetShopListQuery } from "@application/queries/dtos/get-shop-list.query";
import { GetAllShopProductsQuery } from "@application/queries/dtos/get-all-shop-products.query";
import { GetShopSalesHistoryQuery } from "@application/queries/dtos/get-shop-sales-history.query";

@Controller("store")
export class StoreController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("add-bank-account")
  @UseGuards(StoreOwnerGuard)
  async addBankAccount(@Body() body: AddBankAccountDto) {
    return this.commandBus.execute(
      new AddStoreBankAccountCommand(
        body.storeId,
        body.bankCode,
        body.accountNumber,
        body.routingNumber,
        body.holderName,
        body.document,
        body.type,
      ),
    );
  }

  @Post("check-balance")
  @UseGuards(StoreOwnerGuard)
  async checkBalance(@Body() body: CheckBalanceDto) {
    return this.queryBus.execute(new CheckBalanceQuery(body.storeId));
  }

  @Post("shop-list")
  @UseGuards(StoreOwnerGuard)
  async getShopList(
    @Body() body: GetShopListDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.queryBus.execute(
      new GetShopListQuery(body.storeId, user.ownerId!),
    );
  }

  @Get("shop-catalog/:shopId")
  async getShopCatalog(@Param("shopId", ParseIntPipe) shopId: number) {
    return this.queryBus.execute(new GetShopCatalogQuery(shopId));
  }

  @Get("shop/get-sales-history/:shopId")
  async getSalesHistory(@Param("shopId", ParseIntPipe) shopId: number) {
    return this.queryBus.execute(new GetShopSalesHistoryQuery(shopId));
  }

  @Get("shop/get-all-products/:shopId")
  async getShopAllProducts(@Param("shopId", ParseIntPipe) shopId: number) {
    return this.queryBus.execute(new GetAllShopProductsQuery(shopId));
  }

  @Post("shop/modify-products-available")
  async modifyProductsAvailable(@Body() body: ModifyProductsAvailableDto) {
    return this.commandBus.execute(
      new ModifyProductsAvailableCommand(body.shopId, body.productsAvailableId),
    );
  }

  @Post("shop/create-temporary-worker")
  async createTemporaryWorker(@Body() body: CreateTemporaryWorkerDto) {
    return this.commandBus.execute(
      new CreateTemporaryWorkerCommand(
        body.shopId,
        body.name,
        body.expirationHours,
        body.role,
      ),
    );
  }

  @Get("shop/:shopId/get-all-workers")
  async getAllWorkers(@Param("shopId", ParseIntPipe) shopId: number) {
    return this.queryBus.execute(new GetAllWorkersQuery(shopId));
  }

  @Post("get-all-bank-accounts")
  @UseGuards(StoreOwnerGuard)
  async getAllBankAccounts(@Body() body: GetAllBankAccountsDto) {
    return this.queryBus.execute(new GetAllBankAccountsQuery(body.storeId));
  }

  @Post("get-bank-account")
  @UseGuards(StoreOwnerGuard)
  async getBankAccount(@Body() body: GetBankAccountDto) {
    return this.queryBus.execute(new GetBankAccountQuery(body.storeId));
  }

  @Post("create-transfer")
  @UseGuards(StoreOwnerGuard)
  async createTransfer(@Body() body: CreateTransferDto) {
    return this.commandBus.execute(
      new CreateTransferCommand(body.storeId, body.amountInCents),
    );
  }

  @Post("get-all-transfers")
  @UseGuards(StoreOwnerGuard)
  async getAllTransfers(@Body() body: GetAllTransfersDto) {
    return this.queryBus.execute(new GetAllTransfersQuery(body.storeId));
  }
}
