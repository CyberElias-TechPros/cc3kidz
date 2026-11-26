/**
 * Minimal structured logger — console in dev, forward to Sentry/OTEL in prod.
 * Use everywhere instead of raw console.log to keep audit trail searchable.
 */
type Level = 'debug' | 'info' | 'warn' | 'error'
function log(level: Level, msg: string, meta?: Record<string,unknown>){
  const entry = { t: new Date().toISOString(), level, msg, ...meta }
  // In prod, if SENTRY_DSN present we could forward here
  const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log
  fn(`[${entry.t}] ${level.toUpperCase()} ${msg}`, meta || '')
  // fire-and-forget to external if configured (stub)
  if (process.env.SENTRY_DSN && level === 'error'){
    // lazy dynamic import would go here
  }
}
export const logger = {
  debug: (m:string, meta?:any)=> log('debug', m, meta),
  info: (m:string, meta?:any)=> log('info', m, meta),
  warn: (m:string, meta?:any)=> log('warn', m, meta),
  error: (m:string, meta?:any)=> log('error', m, meta),
}
