import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { AddBalanceHandler } from "./commands/add-balance.handler";
import { AddCreditCardHandler } from "./commands/add-credit-card.handler";
import { AddIngressHandler } from "./commands/add-ingress.handler";
import { AddStoreBankAccountHandler } from "./commands/add-storebank-account.handler";
import { AuthenticateCardHandler } from "./commands/authenticate-card.handler";
import { AuthorizeEntryHandler } from "./commands/authorize-entry.handler";
import { BuyEventIngressHandler } from "./commands/buy-event-ingress.handler";
import { BuyIngressPixHandler } from "./commands/buy-ingress-pix.handler";
import { BuyIngressHandler } from "@infrastructure/third-party/iopay/commands/buy-ingress.handler";
import { ChangePasswordHandler } from "./commands/change-password.handler";
import { ConfirmPixPaymentHandler } from "./commands/confirm-pix-payment.handler";
import { CreateAccessUserHandler } from "./commands/create-access-user.handler";
import { CreateAdjustmentHandler } from "./commands/create-adjustment.handler";
import { CreateHmlPixTransactionHandler } from "./commands/create-hml-pix-transaction.handler";
import { CreateIngressPixTransactionHandler } from "./commands/create-ingress-pix-transaction.handler";
import { CreateOrderHandler } from "./commands/create-order.handler";
import { CreateOwnerHandler } from "./commands/create-owner.handler";
import { CreatePayoutHandler } from "./commands/create-payout.handler";
import { CreatePixTransactionHandler } from "./commands/create-pix-transaction.handler";
import { CreateShopHandler } from "./commands/create-shop.handler";
import { CreateStorePaymentGatewayHandler } from "./commands/create-store-payment-gateway.handler";
import { CreateStorePFHandler } from "./commands/create-store-pf.handler";
import { CreateStorePJHandler } from "./commands/create-store-pj.handler";
import { CreateTemporaryWorkerHandler } from "./commands/create-temporary-worker.handler";
import { CreateTransferHandler } from "./commands/create-transfer.handler";
import { GoogleSignInHandler } from "./commands/google-sign-in.handler";
import { LoginOwnerHandler } from "./commands/login-owner.handler";
import { ModifyProductsAvailableHandler } from "./commands/modify-products-available.handler";
import { NotifyStoreWebhookHandler } from "./commands/notify-store-webhook.handler";
import { ProcessPaymentTokenHandler } from "./commands/process-payment-token.handler";
import { PurchaseOrderHandler } from "./commands/purchase-order.handler";
import { RefundSaleHandler } from "./commands/refund-sale.handler";
import { RegisterPendentDataHandler } from "./commands/register-pendent-data.handler";
import { RegisterWalletHandler } from "./commands/register-wallet.handler";
import { SellProductTicketHandler } from "./commands/sell-product-ticket.handler";
import { SetDefaultPaymentMethodHandler } from "./commands/set-default-payment-method.handler";
import { SetShopCatalogHandler } from "./commands/set-shop-catalog.handler";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { CheckBalanceHandler } from "./queries/check-balance.handler";
import { CustomerSalesHistoryHandler } from "./queries/customer-sales-history.handler";
import { FindAccessUserHandler } from "./queries/find-access-user.handler";
import { FindManyAdjustmentsHandler } from "./queries/find-many-adjustments.handler";
import { FindPaidPayoutsHandler } from "./queries/find-paid-payouts.handler";
import { FindPendingPayoutsHandler } from "./queries/find-pending-payouts.handler";
import { FindPixStatusHandler } from "./queries/find-pix-status.handler";
import { FindProductsInOrderHandler } from "./queries/find-products-in-order.handler";
import { FindWalletInfoHandler } from "./queries/find-wallet-info.handler";
import { GetAdjustmentsMetricsHandler } from "./queries/get-adjustments-metrics.handler";
import { GetAllBankAccountsHandler } from "./queries/get-all-bank-accounts.handler";
import { GetAllCreditCardsHandler } from "./queries/get-all-credit-cards.handler";
import { GetAllShopProductsHandler } from "./queries/get-all-shop-products.handler";
import { GetAllTransfersHandler } from "./queries/get-all-transfers.handler";
import { GetAllWorkersHandler } from "./queries/get-all-workers.handler";
import { GetBankAccountHandler } from "@infrastructure/third-party/iopay/queries/get-bank-account.handler";
import { GetDefaultCreditCardHandler } from "./queries/get-default-credit-card.handler";
import { GetPayoutsMetricsHandler } from "./queries/get-payouts-metrics.handler";
import { GetProductsByTokenHandler } from "./queries/get-products-by-token.handler";
import { GetShopCatalogHandler } from "./queries/get-shop-catalog.handler";
import { GetShopListHandler } from "./queries/get-shop-list.handler";
import { GetShopSalesHistoryHandler } from "./queries/get-shop-sales-history.handler";
import { GetShopHandler } from "./queries/get-shop.handler";
import { VerifyWorkerAccessHandler } from "./queries/verify-worker-access.handler";
import { WorkerGetShopCatalogHandler } from "./queries/worker-get-shop-catalog.handler";

const CommandHandlers = [
  AddBalanceHandler,
  AddCreditCardHandler,
  AddIngressHandler,
  AddStoreBankAccountHandler,
  AuthenticateCardHandler,
  AuthorizeEntryHandler,
  BuyEventIngressHandler,
  BuyIngressPixHandler,
  BuyIngressHandler,
  ChangePasswordHandler,
  ConfirmPixPaymentHandler,
  CreateAccessUserHandler,
  CreateAdjustmentHandler,
  CreatePayoutHandler,
  CreatePixTransactionHandler,
  CreateShopHandler,
  CreateHmlPixTransactionHandler,
  CreateIngressPixTransactionHandler,
  CreateOrderHandler,
  CreateOwnerHandler,
  CreateStorePaymentGatewayHandler,
  CreateStorePFHandler,
  CreateStorePJHandler,
  CreateTemporaryWorkerHandler,
  CreateTransferHandler,
  GoogleSignInHandler,
  LoginOwnerHandler,
  ModifyProductsAvailableHandler,
  NotifyStoreWebhookHandler,
  ProcessPaymentTokenHandler,
  PurchaseOrderHandler,
  RefundSaleHandler,
  RegisterPendentDataHandler,
  RegisterWalletHandler,
  SellProductTicketHandler,
  SetDefaultPaymentMethodHandler,
  SetShopCatalogHandler,
];

const QueryHandlers = [
  CheckBalanceHandler,
  CustomerSalesHistoryHandler,
  FindAccessUserHandler,
  FindManyAdjustmentsHandler,
  FindPendingPayoutsHandler,
  FindPaidPayoutsHandler,
  FindPixStatusHandler,
  FindProductsInOrderHandler,
  FindWalletInfoHandler,
  GetAdjustmentsMetricsHandler,
  GetAllBankAccountsHandler,
  GetAllCreditCardsHandler,
  GetAllShopProductsHandler,
  GetAllTransfersHandler,
  GetAllWorkersHandler,
  GetBankAccountHandler,
  GetDefaultCreditCardHandler,
  GetPayoutsMetricsHandler,
  GetProductsByTokenHandler,
  GetShopCatalogHandler,
  GetShopListHandler,
  GetShopSalesHistoryHandler,
  GetShopHandler,
  VerifyWorkerAccessHandler,
  WorkerGetShopCatalogHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule],
})
export class ApplicationModule {}
