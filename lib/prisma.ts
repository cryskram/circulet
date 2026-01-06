import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionStr = process.env.DATABASE_URL;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "info", "query", "warn"],
    adapter: new PrismaNeon({ connectionString: connectionStr }),
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
