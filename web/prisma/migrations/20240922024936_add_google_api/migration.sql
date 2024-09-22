-- CreateTable
CREATE TABLE "GoogleApi" (
    "id" BIGSERIAL NOT NULL,
    "api_key" TEXT NOT NULL,
    "calendar_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoogleApi_pkey" PRIMARY KEY ("id")
);
