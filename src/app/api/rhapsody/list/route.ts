import { NextRequest, NextResponse } from 'next/server'
import { getDevotionals } from '@/lib/rhapsody/store'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const audience = searchParams.get('audience') as any
  const edition = searchParams.get('edition') || undefined
  const q = searchParams.get('q') || undefined
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
  const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0
  const { items, total } = getDevotionals({ audience, edition, q, limit, offset })
  return NextResponse.json({ items, total, limit, offset })
}
