/*
  Warnings:

  - The values [doador,receptor] on the enum `user_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `supporting_document` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "user_type_new" AS ENUM ('individual', 'hospital');
ALTER TABLE "User" ALTER COLUMN "user_type" TYPE "user_type_new" USING ("user_type"::text::"user_type_new");
ALTER TYPE "user_type" RENAME TO "user_type_old";
ALTER TYPE "user_type_new" RENAME TO "user_type";
DROP TYPE "user_type_old";
COMMIT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "supporting_document",
ADD COLUMN     "state" BOOLEAN NOT NULL DEFAULT false;
