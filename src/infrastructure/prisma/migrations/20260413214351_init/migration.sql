-- CreateTable
CREATE TABLE `access_user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(15) NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `document` VARCHAR(15) NOT NULL,
    `email_verified` BOOLEAN NULL DEFAULT false,
    `phone_verified` BOOLEAN NULL DEFAULT false,
    `email_code_verification` VARCHAR(6) NULL,
    `first_access` BOOLEAN NULL DEFAULT true,
    `birthdate` DATE NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `access_user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owner` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(255) NULL,
    `email_verified` BOOLEAN NULL DEFAULT false,
    `phone_verified` BOOLEAN NULL DEFAULT false,
    `last_name` VARCHAR(255) NOT NULL,
    `birthdate` DATE NULL,
    `line1` VARCHAR(100) NULL,
    `line2` VARCHAR(10) NULL,
    `line3` VARCHAR(100) NULL,
    `neighborhood` VARCHAR(40) NULL,
    `city` VARCHAR(40) NULL,
    `state` VARCHAR(2) NULL,
    `country_code` VARCHAR(3) NULL,
    `zip_code` VARCHAR(10) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `access_user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `io_customer_id` VARCHAR(255) NULL,

    INDEX `owner_access_user_id_foreign`(`access_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `io_customer_id` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `document` VARCHAR(255) NULL,
    `email_verified` BOOLEAN NULL DEFAULT false,
    `phone_verified` BOOLEAN NULL DEFAULT false,
    `code_verification` VARCHAR(255) NULL,
    `default_card_id` VARCHAR(255) NULL,
    `birthdate` DATE NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_wallet` (
    `customer_id` INTEGER UNSIGNED NOT NULL,
    `balance` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `default_credit_card_id` VARCHAR(255) NULL,
    `default_payment_method` VARCHAR(50) NULL,

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_wallet_transactions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER UNSIGNED NOT NULL,
    `transaction_id` VARCHAR(255) NOT NULL,
    `reference_id` VARCHAR(255) NOT NULL,
    `amount_in_cents` INTEGER NOT NULL,
    `type` ENUM('in', 'out') NOT NULL,
    `description` VARCHAR(255) NULL,
    `balance_after` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `customer_wallet_transactions_transaction_id_unique`(`transaction_id`),
    UNIQUE INDEX `customer_wallet_transactions_reference_id_unique`(`reference_id`),
    INDEX `customer_wallet_transactions_customer_id_foreign`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `credit_card` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER UNSIGNED NOT NULL,
    `card_id` VARCHAR(255) NOT NULL,
    `card_token` VARCHAR(255) NOT NULL,
    `first4_digits` VARCHAR(255) NOT NULL,
    `last4_digits` VARCHAR(255) NOT NULL,
    `card_brand` VARCHAR(255) NOT NULL,
    `expiration_month` VARCHAR(255) NOT NULL,
    `expiration_year` VARCHAR(255) NOT NULL,
    `holder_name` VARCHAR(255) NOT NULL,
    `authenticated` BOOLEAN NULL DEFAULT false,
    `auth_random_cents` INTEGER NULL,
    `auth_transaction_id` VARCHAR(255) NULL,
    `auth_refund_date` DATETIME(0) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `credit_card_customer_id_foreign`(`customer_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `party` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `date` DATE NOT NULL,
    `time` TIME(0) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL,
    `access_user_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `party_access_user_id_foreign`(`access_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingress_batch` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `quantity` INTEGER NOT NULL,
    `quantity_sold` INTEGER NOT NULL DEFAULT 0,
    `price_in_cents` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT false,
    `party_id` INTEGER UNSIGNED NOT NULL,

    INDEX `ingress_batch_party_id_foreign`(`party_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingress_status` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingress` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `transaction_id` VARCHAR(255) NULL,
    `party_id` INTEGER UNSIGNED NOT NULL,
    `ingress_status_id` INTEGER UNSIGNED NOT NULL,
    `ingress_batch_id` INTEGER UNSIGNED NULL,
    `payment_method_id` INTEGER UNSIGNED NOT NULL,
    `customer_id` INTEGER UNSIGNED NOT NULL,
    `value_in_cents` INTEGER NULL,
    `bracelet_number` INTEGER NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `ingress_customer_id_foreign`(`customer_id`),
    INDEX `ingress_ingress_batch_id_foreign`(`ingress_batch_id`),
    INDEX `ingress_ingress_status_id_foreign`(`ingress_status_id`),
    INDEX `ingress_party_id_foreign`(`party_id`),
    INDEX `ingress_payment_method_id_foreign`(`payment_method_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `invite` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `document` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `party_id` INTEGER UNSIGNED NOT NULL,
    `invited_by_customer_id` INTEGER UNSIGNED NOT NULL,
    `ingress_id` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `invite_ingress_id_foreign`(`ingress_id`),
    INDEX `invite_invited_by_customer_id_foreign`(`invited_by_customer_id`),
    INDEX `invite_party_id_foreign`(`party_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `promoter` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `party_id` INTEGER UNSIGNED NOT NULL,
    `customer_id` INTEGER UNSIGNED NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `bonus_in_cents` INTEGER NULL DEFAULT 0,

    INDEX `promoter_customer_id_foreign`(`customer_id`),
    INDEX `promoter_party_id_foreign`(`party_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment_method` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pix_transactions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER UNSIGNED NULL,
    `store_id` INTEGER UNSIGNED NULL,
    `transaction_id` VARCHAR(255) NOT NULL,
    `reference_id` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `expiration_date` VARCHAR(255) NOT NULL,
    `pix_key` VARCHAR(255) NOT NULL,
    `pix_qr_code` VARCHAR(255) NOT NULL,
    `amount_in_cents` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `pix_emv` TEXT NULL,
    `pix_type` VARCHAR(255) NULL,
    `party_id` INTEGER UNSIGNED NULL,

    UNIQUE INDEX `pix_transactions_transaction_id_unique`(`transaction_id`),
    UNIQUE INDEX `pix_transactions_reference_id_unique`(`reference_id`),
    INDEX `pix_transactions_customer_id_foreign`(`customer_id`),
    INDEX `pix_transactions_store_id_foreign`(`store_id`),
    INDEX `pix_transactions_party_id_foreign`(`party_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_pix_transactions` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER UNSIGNED NOT NULL,
    `transaction_id` VARCHAR(255) NOT NULL,
    `reference_id` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `expiration_date` VARCHAR(255) NOT NULL,
    `pix_key` VARCHAR(255) NOT NULL,
    `pix_qr_code` VARCHAR(255) NOT NULL,
    `amount_in_cents` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `store_pix_transactions_transaction_id_unique`(`transaction_id`),
    UNIQUE INDEX `store_pix_transactions_reference_id_unique`(`reference_id`),
    INDEX `store_pix_transactions_store_id_foreign`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `owner_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `statement_descriptor` VARCHAR(40) NULL,
    `mcc` INTEGER NULL,
    `business_line1` VARCHAR(100) NULL,
    `business_line2` VARCHAR(10) NULL,
    `business_line3` VARCHAR(100) NULL,
    `business_neighborhood` VARCHAR(40) NULL,
    `business_city` VARCHAR(40) NULL,
    `business_state` VARCHAR(2) NULL,
    `business_country_code` VARCHAR(3) NULL,
    `business_zip_code` VARCHAR(10) NULL,
    `business_phone` VARCHAR(20) NULL,
    `business_email` VARCHAR(255) NULL,
    `business_name` VARCHAR(255) NULL,
    `business_document` VARCHAR(20) NULL,
    `business_website` VARCHAR(255) NULL,
    `business_open_date` DATE NULL,
    `io_seller_id` VARCHAR(255) NULL,
    `taxpayer_id` VARCHAR(255) NULL,
    `owner_taxpayer_id` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `webhook_url` VARCHAR(255) NULL,

    INDEX `store_owner_id_foreign`(`owner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_bank_account` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `io_token` VARCHAR(255) NOT NULL,
    `account_number` VARCHAR(255) NOT NULL,
    `routing_number` VARCHAR(255) NOT NULL,
    `holder_name` VARCHAR(255) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `bank_code` VARCHAR(255) NOT NULL,
    `document` VARCHAR(255) NOT NULL,
    `store_id` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `store_bank_account_store_id_foreign`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transfer_history` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `bank_account_id` INTEGER UNSIGNED NOT NULL,
    `description` VARCHAR(255) NULL,
    `statement_descriptor` VARCHAR(255) NULL,
    `amount_in_cents` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `store_id` INTEGER UNSIGNED NOT NULL,

    INDEX `transfer_history_bank_account_id_foreign`(`bank_account_id`),
    INDEX `transfer_history_store_id_foreign`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `store_id` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `shop_store_id_foreign`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop_products` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `shop_id` INTEGER UNSIGNED NOT NULL,
    `product_id` INTEGER UNSIGNED NULL,
    `price_in_cents` INTEGER NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `shop_products_product_id_foreign`(`product_id`),
    INDEX `shop_products_shop_id_foreign`(`shop_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shop_worker` (
    `shop_id` INTEGER UNSIGNED NOT NULL,
    `access_user_id` INTEGER UNSIGNED NULL,
    `role` INTEGER NOT NULL,
    `active` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `expiration_date` TIMESTAMP(0) NULL,
    `name` VARCHAR(100) NULL,

    INDEX `shop_worker_access_user_id_foreign`(`access_user_id`),
    INDEX `shop_worker_shop_id_foreign`(`shop_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `party_shop` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `party_id` INTEGER UNSIGNED NOT NULL,
    `shop_id` INTEGER UNSIGNED NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `party_shop_party_id_foreign`(`party_id`),
    INDEX `party_shop_shop_id_foreign`(`shop_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_sales` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `party_shop_id` INTEGER UNSIGNED NULL,
    `store_id` INTEGER UNSIGNED NOT NULL,
    `shop_id` INTEGER UNSIGNED NOT NULL,
    `payment_method_id` INTEGER UNSIGNED NOT NULL,
    `customer_id` INTEGER UNSIGNED NULL,
    `credit_card_id` INTEGER UNSIGNED NULL,
    `order_id` VARCHAR(255) NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    `total_in_cents` INTEGER NOT NULL,
    `installments` TINYINT UNSIGNED NULL,
    `interest_in_cents` INTEGER NULL,
    `paid_at` DATETIME(0) NULL,
    `refunded_at` DATETIME(0) NULL,
    `transaction_id` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `store_sales_credit_card_id_foreign`(`credit_card_id`),
    INDEX `store_sales_customer_id_foreign`(`customer_id`),
    INDEX `store_sales_party_shop_id_foreign`(`party_shop_id`),
    INDEX `store_sales_payment_method_id_foreign`(`payment_method_id`),
    INDEX `store_sales_shop_id_foreign`(`shop_id`),
    INDEX `store_sales_store_id_foreign`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store_sales_products` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `store_sales_id` INTEGER UNSIGNED NOT NULL,
    `shop_product_id` INTEGER UNSIGNED NOT NULL,
    `quantity` INTEGER UNSIGNED NOT NULL,
    `price_in_cents` INTEGER UNSIGNED NOT NULL,
    `total_in_cents` INTEGER UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `store_sales_products_shop_product_id_foreign`(`shop_product_id`),
    INDEX `store_sales_products_store_sales_id_foreign`(`store_sales_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `dosage` VARCHAR(255) NOT NULL,
    `dosage_unit_id` INTEGER UNSIGNED NULL,
    `container_type_id` INTEGER UNSIGNED NULL,
    `product_type_id` INTEGER UNSIGNED NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `product_container_type_id_foreign`(`container_type_id`),
    INDEX `product_dosage_unit_id_foreign`(`dosage_unit_id`),
    INDEX `product_product_type_id_foreign`(`product_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `container_type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dosage_unit` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payouts` (
    `id` VARCHAR(191) NOT NULL,
    `store_id` INTEGER UNSIGNED NOT NULL,
    `store_name` VARCHAR(255) NOT NULL,
    `gross_in_cents` INTEGER NOT NULL,
    `fee_in_cents` INTEGER NOT NULL,
    `net_in_cents` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'PAID') NOT NULL DEFAULT 'PAID',
    `proof_file_url` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `payouts_status_index`(`status`),
    INDEX `payouts_store_id_index`(`store_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payout_items` (
    `id` VARCHAR(191) NOT NULL,
    `payout_id` VARCHAR(191) NOT NULL,
    `store_sale_id` INTEGER UNSIGNED NOT NULL,
    `order_id` VARCHAR(255) NOT NULL,
    `sale_gross_in_cents` INTEGER NOT NULL,
    `sale_fee_in_cents` INTEGER NOT NULL,
    `sale_net_in_cents` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `payout_items_store_sale_id_unique`(`store_sale_id`),
    INDEX `payout_items_order_id_index`(`order_id`),
    INDEX `payout_items_payout_id_index`(`payout_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adjustments` (
    `id` VARCHAR(191) NOT NULL,
    `value_in_cents` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,
    `type` ENUM('CREDIT', 'DEBIT') NOT NULL,
    `attachment` VARCHAR(500) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `adjustments_created_at_index`(`created_at`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `owner` ADD CONSTRAINT `owner_access_user_id_foreign` FOREIGN KEY (`access_user_id`) REFERENCES `access_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `customer_wallet` ADD CONSTRAINT `customer_wallet_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `customer_wallet_transactions` ADD CONSTRAINT `customer_wallet_transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `credit_card` ADD CONSTRAINT `credit_card_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `party` ADD CONSTRAINT `party_access_user_id_foreign` FOREIGN KEY (`access_user_id`) REFERENCES `access_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ingress_batch` ADD CONSTRAINT `ingress_batch_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ingress` ADD CONSTRAINT `ingress_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ingress` ADD CONSTRAINT `ingress_ingress_batch_id_foreign` FOREIGN KEY (`ingress_batch_id`) REFERENCES `ingress_batch`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ingress` ADD CONSTRAINT `ingress_ingress_status_id_foreign` FOREIGN KEY (`ingress_status_id`) REFERENCES `ingress_status`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ingress` ADD CONSTRAINT `ingress_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ingress` ADD CONSTRAINT `ingress_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invite` ADD CONSTRAINT `invite_ingress_id_foreign` FOREIGN KEY (`ingress_id`) REFERENCES `ingress`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invite` ADD CONSTRAINT `invite_invited_by_customer_id_foreign` FOREIGN KEY (`invited_by_customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `invite` ADD CONSTRAINT `invite_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `promoter` ADD CONSTRAINT `promoter_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `promoter` ADD CONSTRAINT `promoter_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pix_transactions` ADD CONSTRAINT `pix_transactions_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pix_transactions` ADD CONSTRAINT `pix_transactions_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pix_transactions` ADD CONSTRAINT `pix_transactions_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_pix_transactions` ADD CONSTRAINT `store_pix_transactions_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `owner`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_bank_account` ADD CONSTRAINT `store_bank_account_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transfer_history` ADD CONSTRAINT `transfer_history_bank_account_id_foreign` FOREIGN KEY (`bank_account_id`) REFERENCES `store_bank_account`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `transfer_history` ADD CONSTRAINT `transfer_history_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shop` ADD CONSTRAINT `shop_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shop_products` ADD CONSTRAINT `shop_products_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shop_products` ADD CONSTRAINT `shop_products_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shop`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shop_worker` ADD CONSTRAINT `shop_worker_access_user_id_foreign` FOREIGN KEY (`access_user_id`) REFERENCES `access_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shop_worker` ADD CONSTRAINT `shop_worker_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shop`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `party_shop` ADD CONSTRAINT `party_shop_party_id_foreign` FOREIGN KEY (`party_id`) REFERENCES `party`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `party_shop` ADD CONSTRAINT `party_shop_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shop`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales` ADD CONSTRAINT `store_sales_credit_card_id_foreign` FOREIGN KEY (`credit_card_id`) REFERENCES `credit_card`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales` ADD CONSTRAINT `store_sales_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales` ADD CONSTRAINT `store_sales_party_shop_id_foreign` FOREIGN KEY (`party_shop_id`) REFERENCES `party_shop`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales` ADD CONSTRAINT `store_sales_payment_method_id_foreign` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales` ADD CONSTRAINT `store_sales_shop_id_foreign` FOREIGN KEY (`shop_id`) REFERENCES `shop`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales` ADD CONSTRAINT `store_sales_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales_products` ADD CONSTRAINT `store_sales_products_shop_product_id_foreign` FOREIGN KEY (`shop_product_id`) REFERENCES `shop_products`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `store_sales_products` ADD CONSTRAINT `store_sales_products_store_sales_id_foreign` FOREIGN KEY (`store_sales_id`) REFERENCES `store_sales`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_container_type_id_foreign` FOREIGN KEY (`container_type_id`) REFERENCES `container_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_dosage_unit_id_foreign` FOREIGN KEY (`dosage_unit_id`) REFERENCES `dosage_unit`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_product_type_id_foreign` FOREIGN KEY (`product_type_id`) REFERENCES `product_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payouts` ADD CONSTRAINT `payouts_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payout_items` ADD CONSTRAINT `payout_items_payout_id_foreign` FOREIGN KEY (`payout_id`) REFERENCES `payouts`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payout_items` ADD CONSTRAINT `payout_items_store_sale_id_foreign` FOREIGN KEY (`store_sale_id`) REFERENCES `store_sales`(`id`) ON DELETE RESTRICT ON UPDATE NO ACTION;
