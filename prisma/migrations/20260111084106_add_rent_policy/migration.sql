-- CreateEnum
CREATE TYPE "RentUnit" AS ENUM ('HOUR', 'DAY', 'WEEK');

-- CreateTable
CREATE TABLE "RentPolicy" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "unit" "RentUnit" NOT NULL,
    "price" INTEGER,
    "minDuration" INTEGER NOT NULL,
    "maxDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RentPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RentPolicy_itemId_key" ON "RentPolicy"("itemId");

-- AddForeignKey
ALTER TABLE "RentPolicy" ADD CONSTRAINT "RentPolicy_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
