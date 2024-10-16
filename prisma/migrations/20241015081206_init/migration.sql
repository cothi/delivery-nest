/*
  Warnings:

  - You are about to drop the column `chatId` on the `ChatMessage` table. All the data in the column will be lost.
  - You are about to drop the `Chats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roomId` to the `ChatMessage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ChatMessage` DROP FOREIGN KEY `ChatMessage_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `Chats` DROP FOREIGN KEY `Chats_userId_fkey`;

-- DropIndex
DROP INDEX `ChatMessage_chatId_createdAt_idx` ON `ChatMessage`;

-- AlterTable
ALTER TABLE `ChatMessage` DROP COLUMN `chatId`,
    ADD COLUMN `roomId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Chats`;

-- CreateTable
CREATE TABLE `Rooms` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Rooms_userId_createdAt_idx`(`userId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `ChatMessage_roomId_createdAt_idx` ON `ChatMessage`(`roomId`, `createdAt`);

-- AddForeignKey
ALTER TABLE `Rooms` ADD CONSTRAINT `Rooms_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `Rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
