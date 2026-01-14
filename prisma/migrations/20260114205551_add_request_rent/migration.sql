/*
  Warnings:

  - You are about to drop the column `duration` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "duration";

-- CreateTable
CREATE TABLE "RequestRentPolicy" (
    "id" TEXT NOT NULL,
    "requestId" TEXT NOT NULL,
    "unit" "RentUnit" NOT NULL,
    "price" INTEGER,
    "minDuration" INTEGER NOT NULL,
    "maxDuration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestRentPolicy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequestRentPolicy_requestId_key" ON "RequestRentPolicy"("requestId");

-- AddForeignKey
ALTER TABLE "RequestRentPolicy" ADD CONSTRAINT "RequestRentPolicy_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;
