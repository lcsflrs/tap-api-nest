import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CqrsModule } from "@nestjs/cqrs";
import { PAYMENT_GATEWAY_TOKEN } from "../../../domain/@shared/payment-gateway/payment-gateway.token";
import { InfrastructureModule } from "../../infrastructure.module";
import { iopayConfig } from "./iopay.config";
import { IopayService } from "./iopay.service";
import { AssociateBankAccountHandler } from "./commands/associate-bank-account.handler";
import { CreateCustomerHandler } from "./commands/create-customer.handler";
import { CreateSellerPFHandler } from "./commands/create-seller-pf.handler";
import { CreateSellerPJHandler } from "./commands/create-seller-pj.handler";
import { CreateTransferToBankAccountHandler } from "./commands/create-transfer-to-bank-account.handler";
import { ExecuteCreditTransactionHandler } from "./commands/execute-credit-transaction.handler";
import { GeneratePixTransactionHandler } from "./commands/generate-pix-transaction.handler";
import { GenerateStorePixTransactionHandler } from "./commands/generate-store-pix-transaction.handler";
import { RefundTransactionHandler } from "./commands/refund-transaction.handler";
import { GetSpecialTokenHandler } from "./queries/get-special-token.handler";
import { GetBalanceHandler } from "./queries/get-balance.handler";
import { GetIopayBankAccountHandler } from "./queries/get-iopay-bank-account.handler";
import { GetTransactionHandler } from "./queries/get-transaction.handler";
import { ListAllBankAccountsHandler } from "./queries/list-all-bank-accounts.handler";
import { ListAllTransfersHandler } from "./queries/list-all-transfers.handler";

const CommandHandlers = [
  AssociateBankAccountHandler,
  CreateCustomerHandler,
  CreateSellerPFHandler,
  CreateSellerPJHandler,
  CreateTransferToBankAccountHandler,
  ExecuteCreditTransactionHandler,
  GeneratePixTransactionHandler,
  GenerateStorePixTransactionHandler,
  RefundTransactionHandler,
];

const QueryHandlers = [
  GetSpecialTokenHandler,
  GetBalanceHandler,
  GetIopayBankAccountHandler,
  GetTransactionHandler,
  ListAllBankAccountsHandler,
  ListAllTransfersHandler,
];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forFeature(iopayConfig),
    InfrastructureModule,
  ],
  providers: [
    IopayService,
    {
      provide: PAYMENT_GATEWAY_TOKEN,
      useExisting: IopayService,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [PAYMENT_GATEWAY_TOKEN, CqrsModule],
})
export class IopayModule {}
