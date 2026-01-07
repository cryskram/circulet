-- AlterTable
ALTER TABLE "User" ADD COLUMN     "gradYear" INTEGER,
ADD COLUMN     "isProfileComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "username" TEXT;
