/*
  Warnings:

  - You are about to drop the column `createdAt` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `items` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `items` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "items" DROP COLUMN "createdAt",
DROP COLUMN "deletedAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
