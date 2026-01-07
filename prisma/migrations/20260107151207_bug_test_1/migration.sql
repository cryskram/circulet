-- CreateTable
CREATE TABLE "dummy" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dummy_pkey" PRIMARY KEY ("id")
);
