-- CreateEnum
CREATE TYPE "RequestType" AS ENUM ('BUY', 'RENT', 'BORROW', 'FREE');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('OPEN', 'FULLFILLED', 'CLOSED');

-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "RequestType" NOT NULL,
    "budget" INTEGER,
    "duration" INTEGER,
    "status" "RequestStatus" NOT NULL DEFAULT 'OPEN',
    "categoryId" TEXT NOT NULL,
    "requesterId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Request_categoryId_idx" ON "Request"("categoryId");

-- CreateIndex
CREATE INDEX "Request_requesterId_idx" ON "Request"("requesterId");

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
