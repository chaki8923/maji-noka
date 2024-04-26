/*
  Warnings:

  - Made the column `inventory` on table `items` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "items" ALTER COLUMN "inventory" SET NOT NULL,
ALTER COLUMN "inventory" SET DEFAULT 0;
