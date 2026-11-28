import { NextRequest, NextResponse } from 'next/server'
import { getTodayDevotional, getRecentByAudience } from '@/lib/rhapsody/store'
import type { AudienceId } from '@/lib/rhapsody/audiences'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const audience = (searchParams.get('audience') as AudienceId) || 'adults'
  const d = getTodayDevotional(audience as any)
  if (!d) return NextResponse.json({ error: 'No devotional found' }, { status: 404 })
  // also include recent for context
  const recent = getRecentByAudience(audience as any, 5)
  return NextResponse.json({ devotional: d, recent })
}
