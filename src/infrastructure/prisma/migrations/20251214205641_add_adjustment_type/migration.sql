/*
  Warnings:

  - Added the required column `type` to the `adjustments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adjustments` ADD COLUMN `type` ENUM('CREDIT', 'DEBIT') NOT NULL;
