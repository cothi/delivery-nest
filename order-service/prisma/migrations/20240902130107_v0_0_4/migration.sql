/*
  Warnings:

  - You are about to drop the column `restaurant_id` on the `menu_category` table. All the data in the column will be lost.
  - You are about to drop the column `main_photo_url` on the `menu_item` table. All the data in the column will be lost.
  - You are about to drop the column `menu_category_id` on the `menu_item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId]` on the table `menu_category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `menu_category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainPhotoUrl` to the `menu_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuCategoryId` to the `menu_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menu_category` DROP FOREIGN KEY `menu_category_restaurant_id_fkey`;

-- DropForeignKey
ALTER TABLE `menu_item` DROP FOREIGN KEY `menu_item_menu_category_id_fkey`;

-- AlterTable
ALTER TABLE `menu_category` DROP COLUMN `restaurant_id`,
    ADD COLUMN `restaurantId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `menu_item` DROP COLUMN `main_photo_url`,
    DROP COLUMN `menu_category_id`,
    ADD COLUMN `mainPhotoUrl` VARCHAR(191) NOT NULL,
    ADD COLUMN `menuCategoryId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `menu_category_restaurantId_key` ON `menu_category`(`restaurantId`);

-- AddForeignKey
ALTER TABLE `menu_category` ADD CONSTRAINT `menu_category_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_item` ADD CONSTRAINT `menu_item_menuCategoryId_fkey` FOREIGN KEY (`menuCategoryId`) REFERENCES `menu_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
