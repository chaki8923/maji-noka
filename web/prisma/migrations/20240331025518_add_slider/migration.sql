-- CreateTable
CREATE TABLE "slider" (
    "id" SERIAL NOT NULL,
    "images" JSONB NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slider_pkey" PRIMARY KEY ("id")
);
