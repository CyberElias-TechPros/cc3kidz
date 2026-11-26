'use client'
import { useState, useEffect } from 'react'
import type { QuizSet } from '@/lib/rhapsody/types'
import { recordQuiz } from '@/lib/gamification/engine'

export function QuizPlayer({ quiz }: { quiz: QuizSet }) {
  const [idx, setIdx] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showExplain, setShowExplain] = useState(false)
  const [done, setDone] = useState(false)

  const q = quiz.questions[idx]
  const total = quiz.questions.length
  const progress = ((idx + 1) / total) * 100

  const handlePick = (i: number) => {
    if (picked !== null) return
    setPicked(i)
    setShowExplain(true)
    if (i === q.answer) setScore((s) => s + 1)
  }

  const next = () => {
    if (idx + 1 >= total) {
      const finalScore = score + (picked === q.answer ? 0 : 0) // score already updated
      const percent = Math.round((finalScore / total) * 100)
      recordQuiz(quiz.id, percent, total)
      setDone(true)
    } else {
      setIdx((v) => v + 1)
      setPicked(null)
      setShowExplain(false)
    }
  }

  // For final score, need to include last question if not yet counted correctly; but score is already mutated
  // We'll compute live score based on picked answers? Simplified: use score state correctly
  // score already holds correct count including current if correct
  useEffect(() => {
    // ensure score reflects current picked when we advance
  }, [score])

  if (done) {
    const percent = Math.round((score / total) * 100)
    const isPerfect = percent === 100
    const xp = percent === 100 ? total * 20 + 10 : Math.round((percent / 100) * total * 20)
    return (
      <div className="card p-6 text-center">
        <div className="mx-auto h-20 w-20 grid place-items-center rounded-full bg-haze border-2 border-gold text-2xl font-black text-navy">
          {score}/{total}
        </div>
        <h3 className="font-display font-extrabold text-xl text-navy mt-3">{isPerfect ? 'Perfect! 💯 Champion' : percent >= 60 ? 'Great job! 🌟' : 'Nice try — keep studying!'}</h3>
        <p className="text-sm text-slate-600 mt-1">{percent}% · +{xp} XP earned</p>
        {isPerfect && <div className="mt-2 text-xs font-bold text-gold">Perfect Score badge unlocked!</div>}
        <div className="mt-4 flex justify-center gap-2">
          <button onClick={() => { setIdx(0); setScore(0); setPicked(null); setShowExplain(false); setDone(false) }} className="btn btn--navy !py-2 text-xs">Retake Quiz</button>
          <a href={`/${quiz.audience === 'teens' ? 'teens' : quiz.audience === 'early-readers' ? 'kids' : quiz.audience === 'adults' ? 'rhapsody' : 'rhapsody'}`} className="btn btn--ghost !py-2 text-xs">Back to devotionals</a>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold tracking-widest uppercase text-gold">Quiz · {quiz.title}</div>
        <div className="text-xs text-muted">Question {idx + 1} of {total}</div>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-haze overflow-hidden">
        <div className="h-1.5 bg-navy rounded-full transition-all" style={{ width: `${progress}%` }} />
      </div>
      <h3 className="font-extrabold text-navy mt-4 leading-6">{q.q}</h3>
      <div className="mt-4 grid gap-2">
        {q.options.map((opt, i) => {
          const isPicked = picked === i
          const isCorrect = i === q.answer
          let cls = 'quiz-option'
          if (picked !== null) {
            if (isCorrect) cls += ' is-correct'
            else if (isPicked) cls += ' is-wrong'
          }
          return (
            <button key={i} disabled={picked !== null} onClick={() => handlePick(i)} className={cls}>
              <span className="quiz-option__letter">{String.fromCharCode(65 + i)}</span>
              <span className="text-sm">{opt}</span>
            </button>
          )
        })}
      </div>
      {showExplain && (
        <div className={`quiz-feedback is-show ${picked === q.answer ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
          {picked === q.answer ? 'Correct! ' : 'Not quite — '}
          <span className="text-slate-700">{q.explain}</span>
          {q.scriptureRef && <div className="text-xs text-muted mt-1">{q.scriptureRef}</div>}
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-bold text-navy">Score: {score}/{total}</div>
        {picked !== null && (
          <button onClick={next} className="btn btn--primary !py-2 text-xs">{idx + 1 === total ? 'See result' : 'Next →'}</button>
        )}
      </div>
    </div>
  )
}
