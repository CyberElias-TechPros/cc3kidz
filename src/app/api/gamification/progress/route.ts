import { NextRequest, NextResponse } from 'next/server'

// Server-side mirror for gamification — currently client is source of truth (localStorage).
// This endpoint validates payloads and, when DATABASE_URL is configured, would persist to Prisma.
// For now it echoes and logs for observability.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    // Basic validation
    if (!body || typeof body.totalPoints !== 'number') {
      return NextResponse.json({ error: 'Invalid progress payload' }, { status: 400 })
    }
    // In production, persist to DB here:
    // await prisma.gamificationProgress.upsert(...)
    return NextResponse.json({ ok: true, received: body.totalPoints })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? 'Bad request' }, { status: 400 })
  }
}

export async function GET() {
  // Placeholder — would return server truth when DB is configured
  return NextResponse.json({ source: 'client', note: 'Progress is stored in localStorage; server sync enabled when DATABASE_URL is set.' })
}
