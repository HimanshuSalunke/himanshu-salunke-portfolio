# Database Setup Instructions

## ✅ Database Already Created

You've already created the Neon PostgreSQL database. The connection string is configured in Vercel environment variables.

## 📋 Database Schema

The `ServiceInquiry` table schema is defined in `prisma/schema.prisma`. 

### Table Structure

```sql
CREATE TABLE IF NOT EXISTS "ServiceInquiry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "studyYear" TEXT,
    "projectTitle" TEXT NOT NULL,
    "domain" TEXT,
    "projectDetails" TEXT NOT NULL,
    "dataset" TEXT,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "deadline" TIMESTAMP(3),
    "fileUrl" TEXT,  -- Stores newline-separated file URLs
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);
```

## 🚀 Setup Steps

### Option 1: Run SQL Migration (Recommended)

1. Go to your Neon Console: https://console.neon.tech
2. Open the SQL Editor
3. Copy and paste the SQL from `prisma/migrations/001_add_service_inquiry/migration.sql`
4. Run the SQL

### Option 2: Use Prisma Migrate (If you have DATABASE_URL locally)

If you want to set up locally for testing:

1. Create `.env.local` file (don't commit this):
   ```env
   DATABASE_URL="postgresql://neondb_owner:npg_LwKq5Q4CvUPE@ep-lucky-darkness-a484r65x-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```

2. Run migration:
   ```bash
   npx prisma migrate dev --name add_service_inquiry
   ```

### Option 3: Use Prisma DB Push (Direct sync)

```bash
npx prisma db push
```

This will sync your schema directly to the database without creating migration files.

## ✅ Verification

After running the migration, verify the table exists:

```sql
SELECT * FROM "ServiceInquiry" LIMIT 1;
```

## 🔑 Environment Variables in Vercel

Make sure these are set in your Vercel project settings:

- `DATABASE_URL` - Your Neon PostgreSQL connection string
- `BLOB_READ_WRITE_TOKEN` - Your Vercel Blob storage token

Both are already configured according to your setup!

## 📝 Notes

- The table will be created automatically when the first inquiry is submitted if it doesn't exist
- File URLs are stored as newline-separated strings in the `fileUrl` field
- All timestamps are in UTC

