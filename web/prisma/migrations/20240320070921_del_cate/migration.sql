/*
  Warnings:

  - You are about to alter the column `category_id` on the `items` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_category_id_fkey";

-- AlterTable
ALTER TABLE "items" ALTER COLUMN "category_id" SET DATA TYPE INTEGER;

-- DropTable
DROP TABLE "category";
