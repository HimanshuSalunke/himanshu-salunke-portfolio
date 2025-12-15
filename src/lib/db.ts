import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? 
  (process.env.DATABASE_URL ? new PrismaClient() : undefined)

// Export 'db' as an alias for 'prisma' to maintain compatibility
export const db = prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

