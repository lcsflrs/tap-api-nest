import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateOwnerDto } from "@api/dtos/sale/create-owner.dto";
import { CreateStorePfDto } from "@api/dtos/sale/create-store-pf.dto";
import { CreateStorePjDto } from "@api/dtos/sale/create-store-pj.dto";
import { CreateShopDto } from "@api/dtos/sale/create-shop.dto";
import { SetShopCatalogDto } from "@api/dtos/sale/set-shop-catalog.dto";
import { CreateOwnerCommand } from "@application/commands/dtos/create-owner.command";
import { CreateStorePFCommand } from "@application/commands/dtos/create-store-pf.command";
import { CreateStorePJCommand } from "@application/commands/dtos/create-store-pj.command";
import { CreateShopCommand } from "@application/commands/dtos/create-shop.command";
import { SetShopCatalogCommand } from "@application/commands/dtos/set-shop-catalog.command";

@Controller("sales")
export class SaleController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("create-owner")
  async createOwner(@Body() body: CreateOwnerDto) {
    return this.commandBus.execute(
      new CreateOwnerCommand(
        body.name,
        body.lastName,
        body.document,
        body.email,
        body.phone,
        body.birthdate,
        {
          street: body.street,
          number: body.number,
          complement: body.complement,
          neighborhood: body.neighborhood,
          city: body.city,
          state: body.state,
          countryCode: body.countryCode,
          zipCode: body.zipCode,
        },
      ),
    );
  }

  @Post("create-store-pf")
  async createStorePf(@Body() body: CreateStorePfDto) {
    return this.commandBus.execute(
      new CreateStorePFCommand(
        body.name,
        body.ownerDocument,
        body.statementDescriptor,
        body.mcc,
        body.email,
        body.phone,
      ),
    );
  }

  @Post("create-store-pj")
  async createStorePj(@Body() body: CreateStorePjDto) {
    return this.commandBus.execute(
      new CreateStorePJCommand(
        body.name,
        body.ownerDocument,
        body.statementDescriptor,
        body.mcc,
        body.website,
        body.businessName,
        body.businessDocument,
        body.openDate,
        body.businessEmail,
        body.businessPhone,
        {
          street: body.street,
          number: body.number,
          complement: body.complement,
          neighborhood: body.neighborhood,
          city: body.city,
          state: body.state,
          countryCode: body.countryCode,
          zipCode: body.zipCode,
        },
      ),
    );
  }

  @Post("store/create-shop")
  async createShop(@Body() body: CreateShopDto) {
    return this.commandBus.execute(
      new CreateShopCommand(body.storeId, body.name),
    );
  }

  @Post("store/shop/set-catalog")
  async setShopCatalog(@Body() body: SetShopCatalogDto) {
    return this.commandBus.execute(
      new SetShopCatalogCommand(body.shopId, body.productsList),
    );
  }
}
