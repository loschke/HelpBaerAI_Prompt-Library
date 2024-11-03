import { Prisma } from "@prisma/client"

declare global {
  namespace PrismaJson {
    type ActivityMetadata = {
      ipAddress?: string
      userAgent?: string
      [key: string]: any
    }
  }
} 