export async function GET(){
  const hasDb = !!process.env.DATABASE_URL
  const checks: Record<string,string> = {
    app: 'cc3-main',
    time: new Date().toISOString(),
    db: hasDb ? 'postgres' : 'file-json (dev)',
    version: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0,7) || process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,7) || '1.0.0',
    status: hasDb ? 'ok' : 'ok (dev mode — set DATABASE_URL for production persistence)',
  }
  // Lightweight DB connect check (no query) — just expose presence; full connectivity tested via Prisma on first write
  return Response.json({ ok: true, ...checks }, { headers:{ 'Cache-Control':'no-store' } })
}
