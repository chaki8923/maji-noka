/*
  Warnings:

  - You are about to drop the column `category_id` on the `items` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_category_id_fkey";

-- AlterTable
ALTER TABLE "items" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "category";
