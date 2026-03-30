import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CurrentUser } from "@api/decorators/current-user.decorator";
import type { CurrentUserType } from "@api/@types/current-user.type";
import { CustomerGuard } from "@api/guards/customer.guard";
import { AddCreditCardDto } from "@api/dtos/customer/add-credit-card.dto";
import { CreateOrderDto } from "@api/dtos/customer/create-order.dto";
import { CustomerSalesHistoryDto } from "@api/dtos/customer/customer-sales-history.dto";
import { SetDefaultPaymentMethodDto } from "@api/dtos/customer/set-default-payment-method.dto";
import { AddCreditCardCommand } from "@application/commands/dtos/add-credit-card.command";
import { CreateOrderCommand } from "@application/commands/dtos/create-order.command";
import { SetDefaultPaymentMethodCommand } from "@application/commands/dtos/set-default-payment-method.command";
import { CustomerSalesHistoryQuery } from "@application/queries/dtos/customer-sales-history.query";
import { GetAllCreditCardsQuery } from "@application/queries/dtos/get-all-credit-cards.query";
import { GetDefaultCreditCardQuery } from "@application/queries/dtos/get-default-credit-card.query";

@Controller("customer")
@UseGuards(CustomerGuard)
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("create-order")
  async createOrder(
    @Body() body: CreateOrderDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new CreateOrderCommand(
        user.customerId!,
        body.shopId,
        body.installments,
        body.orderItems,
      ),
    );
  }

  @Get("get-all-credit-cards")
  async getAllCreditCards(@CurrentUser() user: CurrentUserType) {
    return this.queryBus.execute(new GetAllCreditCardsQuery(user.customerId!));
  }

  @Post("add-credit-card")
  async addCreditCard(
    @Body() body: AddCreditCardDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new AddCreditCardCommand(
        user.customerId!,
        body.first4_digits,
        body.last4_digits,
        body.expiration_month,
        body.expiration_year,
        body.id,
        body.token,
        body.card_brand,
        body.holder_name,
      ),
    );
  }

  @Post("set-default-payment")
  async setDefaultPaymentMethod(
    @Body() body: SetDefaultPaymentMethodDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new SetDefaultPaymentMethodCommand(
        user.customerId!,
        body.paymentMethod,
        body.cardId,
      ),
    );
  }

  @Post("customer-sales-history")
  async getSalesHistory(
    @Body() body: CustomerSalesHistoryDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.queryBus.execute(
      new CustomerSalesHistoryQuery(user.customerId!, body.page, body.limit),
    );
  }

  @Get("default-credit-card")
  async getDefaultCreditCard(@CurrentUser() user: CurrentUserType) {
    return this.queryBus.execute(
      new GetDefaultCreditCardQuery(user.customerId!),
    );
  }
}
