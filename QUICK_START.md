# Quick Start: Setup Database & File Storage

## 🚀 Quick Setup (5 minutes)

### Step 1: Install Packages
```bash
npm install @prisma/client @vercel/blob multer
npm install -D prisma @types/multer
```

### Step 2: Get Your Database URL

**Option A: Vercel Postgres (Easiest)**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Storage → Create Database → Postgres
3. Copy the connection string

**Option B: Supabase (Free)**
1. Go to [supabase.com](https://supabase.com)
2. Create project → Settings → Database
3. Copy connection string (URI format)

### Step 3: Get Vercel Blob Token

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Storage → Blob → Create Store
3. Settings → Copy "Read-Write Token"

### Step 4: Add to .env File

Create `.env` in project root:

```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
BLOB_READ_WRITE_TOKEN="vercel_blob_xxxxx"
```

### Step 5: Create Database Tables

```bash
npx prisma generate
npx prisma db push
```

### Step 6: Test It!

```bash
npm run dev
```

Go to `/services` and submit the form. Check your database!

---

## 📊 View Your Data

```bash
npx prisma studio
```

Opens at `http://localhost:5555` - visual database browser!

---

## ✅ Done!

Your form now:
- ✅ Saves to PostgreSQL database
- ✅ Uploads files to Vercel Blob
- ✅ Validates all data
- ✅ Shows success/error messages

---

## 🆘 Troubleshooting

**Database not connecting?**
- Check `DATABASE_URL` format
- Make sure it includes `?sslmode=require`
- Test connection with `npx prisma db push`

**Files not uploading?**
- Check `BLOB_READ_WRITE_TOKEN` is correct
- Verify Vercel Blob store exists
- Check file size (max 50MB total)

**Prisma errors?**
- Run `npx prisma generate` after schema changes
- Run `npx prisma db push` to sync database

---

For detailed instructions, see `SETUP_GUIDE.md`

