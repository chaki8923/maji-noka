/*
  Warnings:

  - You are about to drop the `GoogleApi` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "GoogleApi";

-- CreateTable
CREATE TABLE "google_api" (
    "id" BIGSERIAL NOT NULL,
    "api_key" TEXT NOT NULL,
    "calendar_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "google_api_pkey" PRIMARY KEY ("id")
);
