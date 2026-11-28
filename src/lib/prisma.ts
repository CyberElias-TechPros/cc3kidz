import { PrismaClient } from '@prisma/client'
import { hasDb } from './env'

declare global { var __prisma: PrismaClient | undefined }

export function getPrisma(){
  if (!hasDb()) return null
  if (global.__prisma) return global.__prisma
  const p = new PrismaClient()
  if (process.env.NODE_ENV !== 'production') global.__prisma = p
  return p
}
