-- AlterTable
ALTER TABLE "items" ALTER COLUMN "category_id" SET DATA TYPE BIGINT;

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
