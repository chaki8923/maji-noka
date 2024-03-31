/*
  Warnings:

  - You are about to drop the `slider` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "slider";

-- CreateTable
CREATE TABLE "sliders" (
    "id" SERIAL NOT NULL,
    "images" JSONB NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sliders_pkey" PRIMARY KEY ("id")
);
