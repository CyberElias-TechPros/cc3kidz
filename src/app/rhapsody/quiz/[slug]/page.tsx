import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDevotionalBySlug } from '@/lib/rhapsody/store'
import { generateQuizFor } from '@/lib/rhapsody/quiz'
import { QuizPlayer } from '@/components/rhapsody/QuizPlayer'
import { GamificationBar } from '@/components/rhapsody/GamificationBar'

export default function QuizPage({ params }: { params: { slug: string } }) {
  const d = getDevotionalBySlug(params.slug)
  if (!d) return notFound()
  const quiz = generateQuizFor(d)
  return (
    <div className="min-h-screen bg-haze">
      <div className="bg-navy text-white">
        <div className="container-cc py-4 flex items-center justify-between text-xs">
          <Link href={`/rhapsody/${d.slug}`} className="text-white/80 hover:text-white">← Back to article</Link>
          <span className="bg-white/10 border border-white/20 rounded-full px-3 py-1">Quiz · {d.date}</span>
        </div>
      </div>
      <div className="container-cc py-6">
        <GamificationBar church="main" />
      </div>
      <div className="container-cc pb-8 max-w-3xl">
        <div className="card p-4 bg-white border-gold/20 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-gold">Test your understanding</div>
            <div className="font-display font-extrabold text-navy">{d.title}</div>
            <div className="text-xs text-muted">{d.scriptureReference}</div>
          </div>
          <div className="hidden sm:block text-2xl">🧠</div>
        </div>
        <div className="mt-4">
          <QuizPlayer quiz={quiz} />
        </div>
        <div className="mt-4 flex justify-center gap-2 text-xs">
          <Link href={`/rhapsody/${d.slug}`} className="rounded-full border border-black/10 bg-white px-3 py-1">Read article again</Link>
          <Link href="/rhapsody" className="rounded-full bg-navy text-white px-3 py-1">More devotionals</Link>
        </div>
      </div>
    </div>
  )
}
