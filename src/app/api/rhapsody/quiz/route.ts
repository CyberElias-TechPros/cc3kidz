import { NextRequest, NextResponse } from 'next/server'
import { generateQuizFor } from '@/lib/rhapsody/quiz'
import { getDevotionalBySlug } from '@/lib/rhapsody/store'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 })
  const d = getDevotionalBySlug(slug)
  if (!d) return NextResponse.json({ error: 'Devotional not found' }, { status: 404 })
  const quiz = generateQuizFor(d)
  return NextResponse.json({ quiz })
}
