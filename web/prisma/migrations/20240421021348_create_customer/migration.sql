-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customerId" TEXT,
    "name" TEXT,
    "email" TEXT,
    "country" TEXT,
    "city" TEXT,
    "state" TEXT,
    "postal_code" TEXT,
    "line1" TEXT,
    "line2" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerId_key" ON "Customer"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
