import { z } from 'zod'

const emptyToUndef = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? undefined : v)

const schema = z.object({
  DATABASE_URL: z.preprocess(emptyToUndef, z.string().optional()),
  // SESSION_SECRET may be set to "" in Vercel when user creates empty var — treat empty as missing so default applies instead of ZodError
  SESSION_SECRET: z.preprocess(emptyToUndef, z.string().min(16).optional().default('cc3-dev-secret-change-in-prod-32chars!!')),
  RESEND_API_KEY: z.preprocess(emptyToUndef, z.string().optional()),
  EMAIL_FROM: z.preprocess(emptyToUndef, z.string().optional().default('CC3 <no-reply@cecentralchurch3.org>')),
  UPLOAD_MAX_MB: z.preprocess(emptyToUndef, z.coerce.number().optional().default(8)),
  APP_URL: z.preprocess(emptyToUndef, z.string().optional()),
  NEXT_PUBLIC_APP_URL: z.preprocess(emptyToUndef, z.string().optional()),
  BLOB_READ_WRITE_TOKEN: z.preprocess(emptyToUndef, z.string().optional()),
  SENTRY_DSN: z.preprocess(emptyToUndef, z.string().optional()),
})

let _parsed: z.infer<typeof schema> | null = null
function getEnv(){
  if (_parsed) return _parsed
  try {
    _parsed = schema.parse(process.env)
  } catch (e: any) {
    // Never throw at import time — return safe defaults so app can still render (500 prevention)
    console.warn('[env] zod parse failed, using defaults:', e?.message)
    _parsed = {
      DATABASE_URL: process.env.DATABASE_URL || undefined,
      SESSION_SECRET: (process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16) ? process.env.SESSION_SECRET : 'cc3-dev-secret-change-in-prod-32chars!!',
      RESEND_API_KEY: process.env.RESEND_API_KEY || undefined,
      EMAIL_FROM: 'CC3 <no-reply@cecentralchurch3.org>',
      UPLOAD_MAX_MB: 8,
      APP_URL: process.env.APP_URL || undefined,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || undefined,
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN || undefined,
      SENTRY_DSN: process.env.SENTRY_DSN || undefined,
    } as any
  }
  return _parsed
}

export const env = getEnv()

export function hasDb(){ return !!process.env.DATABASE_URL }
export function isProd(){ return process.env.NODE_ENV === 'production' }
export function assertProdSecret(){
  if (isProd() && env.SESSION_SECRET === 'cc3-dev-secret-change-in-prod-32chars!!') {
    console.warn('[env] SESSION_SECRET is default dev value in production — set a strong random secret')
  }
}
export function requireProdSecret(){
  if (isProd() && env.SESSION_SECRET === 'cc3-dev-secret-change-in-prod-32chars!!') {
    throw new Error('[env] SESSION_SECRET must be set to a strong random value in production')
  }
}
export function appUrl(){
  return env.APP_URL || env.NEXT_PUBLIC_APP_URL || (isProd() ? 'https://cc3.example.com' : 'http://localhost:3000')
}
