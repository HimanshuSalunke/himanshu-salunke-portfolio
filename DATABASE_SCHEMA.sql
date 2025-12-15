-- Complete ServiceInquiry table schema (updated)
CREATE TABLE IF NOT EXISTS "ServiceInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "clientType" TEXT,
    "studyYear" TEXT,
    "projectTitle" TEXT NOT NULL,
    "domain" TEXT,
    "projectDetails" TEXT NOT NULL,
    "dataset" TEXT,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "deadline" TIMESTAMP(3),
    "fileUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX IF NOT EXISTS "ServiceInquiry_email_idx" ON "ServiceInquiry"("email");
CREATE INDEX IF NOT EXISTS "ServiceInquiry_createdAt_idx" ON "ServiceInquiry"("createdAt");

