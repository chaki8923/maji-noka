/*
  Warnings:

  - You are about to drop the column `images` on the `items` table. All the data in the column will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image_count` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "images",
ADD COLUMN     "image_count" INTEGER NOT NULL;

-- DropTable
DROP TABLE "images";
