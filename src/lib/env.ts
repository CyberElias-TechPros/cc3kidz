import { z } from 'zod'

const schema = z.object({
  DATABASE_URL: z.string().optional(),
  SESSION_SECRET: z.string().min(16).optional().default('cc3-dev-secret-change-in-prod-32chars!!'),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional().default('CC3 <no-reply@cecentralchurch3.org>'),
  UPLOAD_MAX_MB: z.coerce.number().optional().default(8),
})

export const env = schema.parse(process.env)

export function hasDb(){ return !!process.env.DATABASE_URL }
export function isProd(){ return process.env.NODE_ENV === 'production' }
export function assertProdSecret(){
  if (isProd() && env.SESSION_SECRET === 'cc3-dev-secret-change-in-prod-32chars!!') {
    console.warn('[env] SESSION_SECRET is default dev value in production — set a strong random secret')
  }
}
