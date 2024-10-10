/*
  Warnings:

  - A unique constraint covering the columns `[provider,providerId]` on the table `OAuthProvider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `provider` to the `OAuthProvider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OAuthProvider` ADD COLUMN `provider` ENUM('KAKAO', 'GOOGLE', 'APPLE') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `OAuthProvider_provider_providerId_key` ON `OAuthProvider`(`provider`, `providerId`);
