/*
  Warnings:

  - The values [INNAPPROPRIATE] on the enum `ReportReason` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `dummy` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReportReason_new" AS ENUM ('SPAM', 'INAPPROPRIATE', 'MISLEADING', 'OTHER');
ALTER TABLE "Report" ALTER COLUMN "reason" TYPE "ReportReason_new" USING ("reason"::text::"ReportReason_new");
ALTER TYPE "ReportReason" RENAME TO "ReportReason_old";
ALTER TYPE "ReportReason_new" RENAME TO "ReportReason";
DROP TYPE "public"."ReportReason_old";
COMMIT;

-- DropTable
DROP TABLE "dummy";
