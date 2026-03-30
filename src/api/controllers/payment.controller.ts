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
import { BuyIngressDto } from "@api/dtos/payment/buy-ingress.dto";
import { CreateIngressPixTransactionDto } from "@api/dtos/payment/create-ingress-pix-transaction.dto";
import { CreatePixTransactionDto } from "@api/dtos/payment/create-pix-transaction.dto";
import { CreateStorePixTransactionDto } from "@api/dtos/payment/create-store-pix-transaction.dto";
import { GetPixStatusDto } from "@api/dtos/payment/get-pix-status.dto";
import { PurchaseOrderDto } from "@api/dtos/payment/purchase-order.dto";
import { RefundSaleDto } from "@api/dtos/payment/refund-sale.dto";
import { SellProductTicketDto } from "@api/dtos/payment/sell-product-ticket.dto";
import { CreatePaymentTokenDto } from "@api/dtos/payment/create-payment-token.dto";
import { CreateCashierPaymentTokenDto } from "@api/dtos/payment/create-cashier-payment-token.dto";
import { AuthenticateCardDto } from "@api/dtos/payment/authenticate-card.dto";
import { GetProductsByTokenDto } from "@api/dtos/payment/get-products-by-token.dto";
import { ReadQrCodeDto } from "@api/dtos/payment/read-qr-code.dto";
import { BuyIngressPixDto } from "@api/dtos/payment/buy-ingress-pix.dto";
import { BuyEventIngressDto } from "@api/dtos/payment/buy-event-ingress.dto";
import { BuyIngressCommand } from "@application/commands/dtos/buy-ingress.command";
import { CreateIngressPixTransactionCommand } from "@application/commands/dtos/create-ingress-pix-transaction.command";
import { CreatePixTransactionCommand } from "@application/commands/dtos/create-pix-transaction.command";
import { CreateStorePixTransactionCommand } from "@application/commands/dtos/create-store-pix-transaction.command";
import { PurchaseOrderCommand } from "@application/commands/dtos/purchase-order.command";
import { RefundSaleCommand } from "@application/commands/dtos/refund-sale.command";
import { SellProductTicketCommand } from "@application/commands/dtos/sell-product-ticket.command";
import { AuthenticateCardCommand } from "@application/commands/dtos/authenticate-card.command";
import { BuyIngressPixCommand } from "@application/commands/dtos/buy-ingress-pix.command";
import { BuyEventIngressCommand } from "@application/commands/dtos/buy-event-ingress.command";
import { CreatePaymentTokenCommand } from "@application/commands/dtos/create-payment-token.command";
import { CreateCashierPaymentTokenCommand } from "@application/commands/dtos/create-cashier-payment-token.command";
import { ReadQrCodeCommand } from "@application/commands/dtos/read-qr-code.command";
import { FindPixStatusQuery } from "@application/queries/dtos/find-pix-status.query";
import { FindWalletInfoQuery } from "@application/queries/dtos/find-wallet-info.query";
import { GetProductsByTokenQuery } from "@application/queries/dtos/get-products-by-token.query";
import { GetSpecialTokenQuery } from "@infrastructure/third-party/iopay/queries/dtos/get-special-token.query";

@Controller()
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post("/payment/purchase-order")
  @UseGuards(WorkerGuard)
  async purchaseOrder(
    @Body() body: PurchaseOrderDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new PurchaseOrderCommand(body.orderId, user.workerId!),
    );
  }

  @Post("/payment/refund-sale")
  async refundSale(@Body() body: RefundSaleDto) {
    return this.commandBus.execute(new RefundSaleCommand(body.saleId));
  }

  @Post("/payment/sell-ticket")
  async sellTicket(@Body() body: SellProductTicketDto) {
    return this.commandBus.execute(
      new SellProductTicketCommand(
        body.shopId,
        body.paymentMethod,
        body.products,
        body.workerId,
        body.braceletNumber,
      ),
    );
  }

  @Post("/payment/pix-transactions")
  @UseGuards(CustomerGuard)
  async createPixTransaction(
    @Body() body: CreatePixTransactionDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new CreatePixTransactionCommand(user.customerId!, body.amountInCents),
    );
  }

  @Post("/payment/get-pix-status")
  @UseGuards(CustomerGuard)
  async getPixStatus(
    @Body() body: GetPixStatusDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.queryBus.execute(
      new FindPixStatusQuery(
        body.transactionId,
        body.partyId,
        user.customerId!,
      ),
    );
  }

  @Post("/payment/store-pix-transactions")
  async createStorePixTransaction(@Body() body: CreateStorePixTransactionDto) {
    return this.commandBus.execute(
      new CreateStorePixTransactionCommand(body.storeId, body.amountInCents),
    );
  }

  @Post("/payment/ingress-pix-transactions")
  @UseGuards(CustomerGuard)
  async createIngressPixTransaction(
    @Body() body: CreateIngressPixTransactionDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new CreateIngressPixTransactionCommand(user.customerId!, body.partyId),
    );
  }

  @Post("/payment/buy-ingress/:partyId")
  @UseGuards(CustomerGuard)
  async buyIngress(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: BuyIngressDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new BuyIngressCommand(user.customerId!, partyId, body.ingressBatchId),
    );
  }

  @Get("/payment/get-customer-wallet-info")
  @UseGuards(CustomerGuard)
  async getWalletInfo(@CurrentUser() user: CurrentUserType) {
    return this.queryBus.execute(new FindWalletInfoQuery(user.customerId!));
  }

  @Get("/payment/special-token/")
  @UseGuards(CustomerGuard)
  async getSpecialToken() {
    return this.queryBus.execute(new GetSpecialTokenQuery());
  }

  @Post("/payment-token/create")
  @UseGuards(CustomerGuard)
  async createPaymentToken(
    @Body() body: CreatePaymentTokenDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new CreatePaymentTokenCommand(
        user.customerId!,
        body.partyId,
        body.products,
        body.amount,
        body.installments,
      ),
    );
  }

  @Post("/payment-token/cashier-create")
  @UseGuards(WorkerGuard)
  async createCashierPaymentToken(
    @Body() body: CreateCashierPaymentTokenDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new CreateCashierPaymentTokenCommand(
        user.workerId!,
        body.partyId,
        body.products,
        body.amount,
        body.installments,
      ),
    );
  }

  @Post("/payment/read-qrcode")
  @UseGuards(WorkerGuard)
  async readQrCode(
    @Body() body: ReadQrCodeDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new ReadQrCodeCommand(body.paymentTokenJwt, user.workerId!),
    );
  }

  @Post("/payment/get-products-by-token")
  @UseGuards(WorkerGuard)
  async getProductsByToken(@Body() body: GetProductsByTokenDto) {
    return this.queryBus.execute(
      new GetProductsByTokenQuery(body.paymentTokenJwt),
    );
  }

  @Post("/payment/authenticate-card")
  @UseGuards(CustomerGuard)
  async authenticateCard(
    @Body() body: AuthenticateCardDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new AuthenticateCardCommand(
        user.customerId!,
        body.creditCardId,
        body.centsAmount,
      ),
    );
  }

  @Post("/payment/buy-ingress-pix/:partyId")
  async buyIngressPix(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: BuyIngressPixDto,
  ) {
    return this.commandBus.execute(
      new BuyIngressPixCommand(body.document, partyId),
    );
  }

  @Post("/payment/buy-event-ingress/:partyId")
  @UseGuards(CustomerGuard)
  async buyEventIngress(
    @Param("partyId", ParseIntPipe) partyId: number,
    @Body() body: BuyEventIngressDto,
    @CurrentUser() user: CurrentUserType,
  ) {
    return this.commandBus.execute(
      new BuyEventIngressCommand(
        user.customerId!,
        partyId,
        body.ingressBatchId,
      ),
    );
  }
}
