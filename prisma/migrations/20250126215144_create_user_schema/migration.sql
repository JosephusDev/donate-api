-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('masculino', 'femenino', 'outro');

-- CreateEnum
CREATE TYPE "user_type" AS ENUM ('doador', 'receptor', 'hospital');

-- CreateEnum
CREATE TYPE "Urgency" AS ENUM ('normal', 'media', 'alta');

-- CreateEnum
CREATE TYPE "State" AS ENUM ('pendente', 'concluído', 'cancelado');

-- CreateTable
CREATE TABLE "blood_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "blood_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullname" TEXT,
    "gender" "Gender" DEFAULT 'outro',
    "supporting_document" TEXT,
    "user_type" "user_type" NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT,
    "blood_type_id" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "donate_location" TEXT NOT NULL,
    "urgency" "Urgency" NOT NULL,
    "description" TEXT NOT NULL,
    "state" "State" NOT NULL DEFAULT 'pendente',
    "user_id" INTEGER NOT NULL,
    "blood_type_id" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_blood_type_id_fkey" FOREIGN KEY ("blood_type_id") REFERENCES "blood_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_blood_type_id_fkey" FOREIGN KEY ("blood_type_id") REFERENCES "blood_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
