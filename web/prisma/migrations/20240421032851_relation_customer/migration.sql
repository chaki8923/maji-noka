/*
  Warnings:

  - You are about to drop the column `userId` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "userId",
ADD COLUMN     "customerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
