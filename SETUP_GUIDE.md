# Setup Guide: Database & File Storage

This guide will help you set up PostgreSQL database and Vercel Blob storage for the Services inquiry form.

---

## 📋 Prerequisites

1. **PostgreSQL Database** - You can use:
   - [Vercel Postgres](https://vercel.com/storage/postgres) (Free tier available)
   - [Supabase](https://supabase.com) (Free tier available)
   - [Neon](https://neon.tech) (Free tier available)
   - [Railway](https://railway.app) (Free tier available)
   - Any PostgreSQL database

2. **Vercel Blob Storage** - For file uploads
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Create a Blob store

---

## 🗄️ Step 1: Setup PostgreSQL Database

### Option A: Using Vercel Postgres (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create one)
3. Go to **Storage** → **Create Database** → **Postgres**
4. Create a new Postgres database
5. Copy the **Connection String** (it looks like: `postgresql://user:password@host:port/database?sslmode=require`)

### Option B: Using Supabase (Free)

1. Go to [Supabase](https://supabase.com) and sign up
2. Create a new project
3. Go to **Settings** → **Database**
4. Copy the **Connection String** (under "Connection string" → "URI")

### Option C: Using Neon (Free)

1. Go to [Neon](https://neon.tech) and sign up
2. Create a new project
3. Copy the **Connection String** from the dashboard

---

## 📦 Step 2: Install Required Packages

Run these commands in your project directory:

```bash
npm install @prisma/client @vercel/blob
npm install -D prisma
```

---

## 🔧 Step 3: Initialize Prisma

1. Initialize Prisma:
```bash
npx prisma init
```

This will create:
- `prisma/schema.prisma` - Database schema file
- `.env` - Environment variables file (if it doesn't exist)

---

## 📝 Step 4: Configure Prisma Schema

Open `prisma/schema.prisma` and replace it with:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model ServiceInquiry {
  id            String   @id @default(cuid())
  name          String
  email         String
  phone         String?
  studyYear     String?
  projectTitle  String
  domain        String?
  projectDetails String
  dataset       String?
  budgetMin     Int?
  budgetMax     Int?
  deadline      DateTime?
  fileUrl       String?  // Stores newline-separated file URLs
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

---

## 🔑 Step 5: Setup Environment Variables

Create or update your `.env` file in the project root:

```env
# Database Connection
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token-here"
```

### Getting Vercel Blob Token:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Go to **Storage** → **Blob** (or create a new Blob store)
3. Go to **Settings** → Copy the **Read-Write Token**

---

## 🗃️ Step 6: Create Database Tables

Run this command to create the database tables:

```bash
npx prisma migrate dev --name init
```

Or if you want to just push the schema without migrations:

```bash
npx prisma db push
```

This will:
- Create the `ServiceInquiry` table in your database
- Generate Prisma Client

---

## 📚 Step 7: Create Database Client File

Create `src/lib/db.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? 
  (process.env.DATABASE_URL ? new PrismaClient() : undefined)

// Export 'db' as an alias for 'prisma'
export const db = prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

---

## 📤 Step 8: Update API Endpoint

The API endpoint in `server.js` needs to be updated. I'll create the updated version for you.

---

## ✅ Step 9: Generate Prisma Client

After setting up the schema, generate the Prisma Client:

```bash
npx prisma generate
```

This creates the TypeScript types for your database models.

---

## 🧪 Step 10: Test the Setup

1. Start your development server:
```bash
npm run dev
```

2. Go to `/services` page
3. Fill out the form and submit
4. Check your database to see if the data was saved

---

## 🔍 Step 11: View Your Data

You can view your data using:

### Prisma Studio (Visual Database Browser):
```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can view and edit your data.

---

## 🚨 Troubleshooting

### Database Connection Issues:
- Make sure your `DATABASE_URL` is correct
- Check if your database allows connections from your IP
- For Vercel Postgres, make sure SSL is enabled (`?sslmode=require`)

### File Upload Issues:
- Verify `BLOB_READ_WRITE_TOKEN` is correct
- Check Vercel Blob storage quota
- Make sure files are under 50MB total

### Prisma Issues:
- Run `npx prisma generate` after schema changes
- Run `npx prisma migrate dev` to sync schema
- Check Prisma logs for detailed errors

---

## 📝 Environment Variables Summary

Add these to your `.env` file:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# File Storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

**Important:** 
- Never commit `.env` to git (it should be in `.gitignore`)
- Add these same variables to your hosting platform (Vercel, etc.) in the environment variables section

---

## 🎯 Next Steps

Once everything is set up:
1. Test the form submission
2. Check database for saved inquiries
3. Verify file uploads in Vercel Blob storage
4. Set up environment variables in your production hosting

---

## 📞 Need Help?

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set
3. Make sure Prisma Client is generated (`npx prisma generate`)
4. Check database connection string format

