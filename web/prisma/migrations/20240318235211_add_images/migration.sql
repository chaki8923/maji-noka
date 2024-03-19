-- CreateTable
CREATE TABLE "images" (
    "id" BIGSERIAL NOT NULL,
    "image_path" TEXT NOT NULL,
    "item_id" BIGINT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);
