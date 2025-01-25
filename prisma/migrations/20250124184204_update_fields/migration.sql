/*
  Warnings:

  - You are about to drop the column `documento_comprovante` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "documento_comprovante",
ADD COLUMN     "supporting_document" TEXT;
