/*
  Warnings:

  - You are about to drop the column `image_count` on the `items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "image_count",
ADD COLUMN     "image_path01" TEXT,
ADD COLUMN     "image_path02" TEXT,
ADD COLUMN     "image_path03" TEXT,
ADD COLUMN     "image_path04" TEXT;
