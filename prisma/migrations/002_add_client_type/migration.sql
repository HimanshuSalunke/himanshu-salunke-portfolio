-- AlterTable: Add clientType column
ALTER TABLE "ServiceInquiry" ADD COLUMN IF NOT EXISTS "clientType" TEXT;
