import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDevotionalBySlug } from '@/lib/rhapsody/store'
import { generateQuizFor } from '@/lib/rhapsody/quiz'
import { QuizPlayer } from '@/components/rhapsody/QuizPlayer'
import { GamificationBar } from '@/components/rhapsody/GamificationBar'

export default function Page({ params }: { params: { slug: string } }) {
  const d = getDevotionalBySlug(params.slug)
  if (!d) return notFound()
  const quiz = generateQuizFor(d)
  return (
    <div className="min-h-screen bg-haze">
      <div className="bg-[#172B76] text-white">
        <div className="container-cc py-4 flex items-center justify-between text-xs">
          <Link href={`/teens/rhapsody/${d.slug}`} className="text-white/80 hover:text-white">← Back to TeeVo</Link>
          <span className="bg-white/10 border border-white/20 rounded-full px-3 py-1">Quiz · {d.date}</span>
        </div>
      </div>
      <div className="container-cc py-6"><GamificationBar church="teens" /></div>
      <div className="container-cc pb-8 max-w-3xl">
        <QuizPlayer quiz={quiz} />
      </div>
    </div>
  )
}
