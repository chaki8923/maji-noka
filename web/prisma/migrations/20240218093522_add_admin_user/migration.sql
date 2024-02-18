/*
  Warnings:

  - You are about to drop the `Items` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Items";

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "maji_flag" BOOLEAN NOT NULL DEFAULT false,
    "postage" INTEGER,
    "inventory" INTEGER,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_user" (
    "id" BIGSERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_user_pkey" PRIMARY KEY ("id")
);
