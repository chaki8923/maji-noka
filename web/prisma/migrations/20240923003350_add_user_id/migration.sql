/*
  Warnings:

  - Added the required column `user_id` to the `google_api` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "google_api" ADD COLUMN     "user_id" TEXT NOT NULL;
