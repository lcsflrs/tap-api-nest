import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InfrastructureModule } from "src/infrastructure/infrastructure.module";
import { IopayModule } from "@infrastructure/third-party/iopay/iopay.module";
import { AddBalanceHandler } from "./commands/add-balance.handler";
import { AddCreditCardHandler } from "./commands/add-credit-card.handler";
import { AddIngressHandler } from "./commands/add-ingress.handler";
import { AddStoreBankAccountHandler } from "./commands/add-storebank-account.handler";
import { AssociatePromoterHandler } from "./commands/associate-promoter.handler";
import { AuthenticateCardHandler } from "./commands/authenticate-card.handler";
import { AuthorizeEntryHandler } from "./commands/authorize-entry.handler";
import { BuyEventIngressHandler } from "./commands/buy-event-ingress.handler";
import { BuyIngressHandler } from "@infrastructure/third-party/iopay/commands/buy-ingress.handler";
import { BuyIngressPixHandler } from "./commands/buy-ingress-pix.handler";
import { ChangePasswordHandler } from "./commands/change-password.handler";
import { ConfirmPixPaymentHandler } from "./commands/confirm-pix-payment.handler";
import { CreateAccessUserHandler } from "./commands/create-access-user.handler";
import { CreateAdjustmentHandler } from "./commands/create-adjustment.handler";
import { CreateCashierPaymentTokenHandler } from "./commands/create-cashier-payment-token.handler";
import { CreateFreeIngressHandler } from "./commands/create-free-ingress.handler";
import { CreateHmlPixTransactionHandler } from "./commands/create-hml-pix-transaction.handler";
import { CreateIngressPixTransactionHandler } from "./commands/create-ingress-pix-transaction.handler";
import { CreateOrderHandler } from "./commands/create-order.handler";
import { CreateOwnerHandler } from "./commands/create-owner.handler";
import { CreatePaymentTokenHandler } from "./commands/create-payment-token.handler";
import { CreatePayoutHandler } from "./commands/create-payout.handler";
import { CreatePixTransactionHandler } from "./commands/create-pix-transaction.handler";
import { CreateShopHandler } from "./commands/create-shop.handler";
import { CreateStorePaymentGatewayHandler } from "./commands/create-store-payment-gateway.handler";
import { CreateStorePFHandler } from "./commands/create-store-pf.handler";
import { CreateStorePixTransactionHandler } from "./commands/create-store-pix-transaction.handler";
import { CreateStorePJHandler } from "./commands/create-store-pj.handler";
import { CreateTemporaryWorkerHandler } from "./commands/create-temporary-worker.handler";
import { CreateTransferHandler } from "./commands/create-transfer.handler";
import { FillPendentDataHandler } from "./commands/fill-pendent-data.handler";
import { GoogleSignInHandler } from "./commands/google-sign-in.handler";
import { LoginOwnerHandler } from "./commands/login-owner.handler";
import { ModifyProductsAvailableHandler } from "./commands/modify-products-available.handler";
import { NotifyStoreWebhookHandler } from "./commands/notify-store-webhook.handler";
import { ProcessPaymentTokenHandler } from "./commands/process-payment-token.handler";
import { PurchaseOrderHandler } from "./commands/purchase-order.handler";
import { ReadQrCodeHandler } from "./commands/read-qr-code.handler";
import { RefundSaleHandler } from "./commands/refund-sale.handler";
import { RegisterPendentDataHandler } from "./commands/register-pendent-data.handler";
import { RegisterWalletHandler } from "./commands/register-wallet.handler";
import { SellProductTicketHandler } from "./commands/sell-product-ticket.handler";
import { SetActualBatchHandler } from "./commands/set-actual-batch.handler";
import { SetDefaultPaymentMethodHandler } from "./commands/set-default-payment-method.handler";
import { SetPartyProductsHandler } from "./commands/set-party-products.handler";
import { SetShopCatalogHandler } from "./commands/set-shop-catalog.handler";
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
import { GetBankAccountHandler } from "./queries/get-bank-account.handler";
import { GetDefaultCreditCardHandler } from "./queries/get-default-credit-card.handler";
import { GetInvitesDataHandler } from "./queries/get-invites-data.handler";
import { GetLastSalesHandler } from "./queries/get-last-sales.handler";
import { GetPartyAnalysisHandler } from "./queries/get-party-analysis.handler";
import { GetPartyBatchesHandler } from "./queries/get-party-batches.handler";
import { GetPartyHandler } from "./queries/get-party.handler";
import { GetPartyInfoHandler } from "./queries/get-party-info.handler";
import { GetPartyProductsHandler } from "./queries/get-party-products.handler";
import { GetPayoutsMetricsHandler } from "./queries/get-payouts-metrics.handler";
import { GetProductsByTokenHandler } from "./queries/get-products-by-token.handler";
import { GetProductsInOrderHandler } from "./queries/get-products-in-order.handler";
import { GetShopCatalogHandler } from "./queries/get-shop-catalog.handler";
import { GetShopHandler } from "./queries/get-shop.handler";
import { GetShopListHandler } from "./queries/get-shop-list.handler";
import { GetShopSalesHistoryHandler } from "./queries/get-shop-sales-history.handler";
import { GetTokenRecommendationHandler } from "./queries/get-token-recommendation.handler";
import { SearchDocumentDataHandler } from "./queries/search-document-data.handler";
import { VerifyWorkerAccessHandler } from "./queries/verify-worker-access.handler";
import { WorkerGetShopCatalogHandler } from "./queries/worker-get-shop-catalog.handler";

const CommandHandlers = [
  AddBalanceHandler,
  AddCreditCardHandler,
  AddIngressHandler,
  AddStoreBankAccountHandler,
  AssociatePromoterHandler,
  AuthenticateCardHandler,
  AuthorizeEntryHandler,
  BuyEventIngressHandler,
  BuyIngressHandler,
  BuyIngressPixHandler,
  ChangePasswordHandler,
  ConfirmPixPaymentHandler,
  CreateAccessUserHandler,
  CreateAdjustmentHandler,
  CreateCashierPaymentTokenHandler,
  CreateFreeIngressHandler,
  CreateHmlPixTransactionHandler,
  CreateIngressPixTransactionHandler,
  CreateOrderHandler,
  CreateOwnerHandler,
  CreatePaymentTokenHandler,
  CreatePayoutHandler,
  CreatePixTransactionHandler,
  CreateShopHandler,
  CreateStorePaymentGatewayHandler,
  CreateStorePFHandler,
  CreateStorePixTransactionHandler,
  CreateStorePJHandler,
  CreateTemporaryWorkerHandler,
  CreateTransferHandler,
  FillPendentDataHandler,
  GoogleSignInHandler,
  LoginOwnerHandler,
  ModifyProductsAvailableHandler,
  NotifyStoreWebhookHandler,
  ProcessPaymentTokenHandler,
  PurchaseOrderHandler,
  ReadQrCodeHandler,
  RefundSaleHandler,
  RegisterPendentDataHandler,
  RegisterWalletHandler,
  SellProductTicketHandler,
  SetActualBatchHandler,
  SetDefaultPaymentMethodHandler,
  SetPartyProductsHandler,
  SetShopCatalogHandler,
];

const QueryHandlers = [
  CheckBalanceHandler,
  CustomerSalesHistoryHandler,
  FindAccessUserHandler,
  FindManyAdjustmentsHandler,
  FindPaidPayoutsHandler,
  FindPendingPayoutsHandler,
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
  GetInvitesDataHandler,
  GetLastSalesHandler,
  GetPartyAnalysisHandler,
  GetPartyBatchesHandler,
  GetPartyHandler,
  GetPartyInfoHandler,
  GetPartyProductsHandler,
  GetPayoutsMetricsHandler,
  GetProductsByTokenHandler,
  GetProductsInOrderHandler,
  GetShopCatalogHandler,
  GetShopHandler,
  GetShopListHandler,
  GetShopSalesHistoryHandler,
  GetTokenRecommendationHandler,
  SearchDocumentDataHandler,
  VerifyWorkerAccessHandler,
  WorkerGetShopCatalogHandler,
];

@Module({
  imports: [CqrsModule, InfrastructureModule, IopayModule],
  providers: [...CommandHandlers, ...QueryHandlers],
  exports: [CqrsModule, ...CommandHandlers, ...QueryHandlers],
})
export class ApplicationModule {}
