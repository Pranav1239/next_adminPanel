/*
  Warnings:

  - You are about to drop the `featuredproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `secondfeaturedproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `featuredproduct` DROP FOREIGN KEY `FeaturedProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `secondfeaturedproduct` DROP FOREIGN KEY `SecondFeaturedProduct_productId_fkey`;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `FeaturedProduct` BOOLEAN NULL,
    ADD COLUMN `SecondFeaturedProduct` BOOLEAN NULL;

-- DropTable
DROP TABLE `featuredproduct`;

-- DropTable
DROP TABLE `secondfeaturedproduct`;

-- CreateTable
CREATE TABLE `ProductImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `publicId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `productId` INTEGER NULL,

    UNIQUE INDEX `ProductImage_publicId_key`(`publicId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
