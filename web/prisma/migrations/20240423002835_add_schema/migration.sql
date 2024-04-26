/*
  Warnings:

  - Added the required column `quantity` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "support_flag" BOOLEAN NOT NULL DEFAULT false;
