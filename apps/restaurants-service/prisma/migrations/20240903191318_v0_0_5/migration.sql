/*
  Warnings:

  - You are about to drop the column `decription` on the `menu_item` table. All the data in the column will be lost.
  - Added the required column `description` to the `menu_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu_item` DROP COLUMN `decription`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL;
