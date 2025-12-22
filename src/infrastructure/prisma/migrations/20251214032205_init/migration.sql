-- CreateTable
CREATE TABLE `payouts` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `grossInCents` INTEGER NOT NULL,
    `feeInCents` INTEGER NOT NULL,
    `netInCents` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `paidAt` DATETIME(3) NULL,
    `proofFileUrl` VARCHAR(191) NULL,
    `payoutDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `payouts_clientId_idx`(`clientId`),
    INDEX `payouts_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payout_items` (
    `id` VARCHAR(191) NOT NULL,
    `payoutId` VARCHAR(191) NOT NULL,
    `amountInCents` INTEGER NOT NULL,
    `consumptionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `payout_items_consumptionId_key`(`consumptionId`),
    INDEX `payout_items_payoutId_idx`(`payoutId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `adjustments` (
    `id` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `valueInCents` INTEGER NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `attachment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `adjustments_clientId_idx`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `payout_items` ADD CONSTRAINT `payout_items_payoutId_fkey` FOREIGN KEY (`payoutId`) REFERENCES `payouts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
