/*
  Warnings:

  - You are about to drop the column `fulname` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fulname",
ADD COLUMN     "fullname" TEXT;
