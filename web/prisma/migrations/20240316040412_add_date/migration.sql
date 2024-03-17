/*
  Warnings:

  - Added the required column `schedule_date` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "schedules" ADD COLUMN     "schedule_date" TIMESTAMP(3) NOT NULL;
