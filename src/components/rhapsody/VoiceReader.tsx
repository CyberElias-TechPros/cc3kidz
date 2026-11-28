'use client'
import { useEffect, useState, useRef, useCallback } from 'react'

type Props = {
  text: string
  title?: string
  lang?: string
}

export function VoiceReader({ text, title, lang = 'en-US' }: Props) {
  const [supported, setSupported] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [selected, setSelected] = useState<string>('')
  const [rate, setRate] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window)
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || /iPhone|iPad|Android/i.test(navigator.userAgent))
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const loadVoices = useCallback(() => {
    if (!supported) return
    const vs = window.speechSynthesis.getVoices()
    if (vs.length) {
      setVoices(vs)
      if (!selected) {
        // Prefer English voice
        const pref = vs.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('google')) || vs.find(v => v.lang.startsWith('en')) || vs[0]
        if (pref) setSelected(pref.name)
      }
    }
  }, [supported, selected])

  useEffect(() => {
    if (!supported) return
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
    // cleanup on unmount
    return () => {
      try { window.speechSynthesis.cancel() } catch {}
    }
  }, [supported, loadVoices])

  const speak = useCallback(() => {
    if (!supported || !text) return
    // Cancel any ongoing
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    const voice = voices.find(v => v.name === selected)
    if (voice) utter.voice = voice
    utter.lang = voice?.lang || lang
    utter.rate = Math.min(1.2, Math.max(0.7, rate))
    utter.pitch = 1
    utter.onstart = () => { setIsPlaying(true); setIsPaused(false) }
    utter.onend = () => { setIsPlaying(false); setIsPaused(false) }
    utter.onerror = () => { setIsPlaying(false); setIsPaused(false) }
    utter.onpause = () => setIsPaused(true)
    utter.onresume = () => setIsPaused(false)
    utterRef.current = utter
    window.speechSynthesis.speak(utter)
  }, [supported, text, voices, selected, lang, rate])

  const handleToggle = () => {
    if (!supported) return
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    } else if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    } else {
      // Load voices lazily on first play for mobile perf
      if (!voices.length) loadVoices()
      speak()
    }
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  if (!supported) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        Voice reading not supported in this browser. Try Chrome or Edge for audio.
      </div>
    )
  }

  // Minimal mobile UI
  if (isMobile) {
    return (
      <div className="rounded-xl border border-black/5 bg-white p-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="hidden sm:inline text-xs font-bold tracking-widest uppercase text-gold">Listen</span>
          <span className="text-xs font-semibold text-navy truncate">{title ? `Hear: ${title.slice(0, 28)}…` : 'Listen to this Rhapsody'}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleToggle}
            aria-label={isPlaying && !isPaused ? 'Pause voice' : 'Play voice'}
            className={`h-9 w-9 grid place-items-center rounded-full border text-sm transition ${isPlaying && !isPaused ? 'bg-navy text-white border-navy' : 'bg-gold text-navy border-gold hover:brightness-105'}`}
          >
            {isPlaying && !isPaused ? '❚❚' : '▶'}
          </button>
          {(isPlaying || isPaused) && (
            <button onClick={handleStop} aria-label="Stop" className="h-8 w-8 grid place-items-center rounded-full border border-black/10 bg-white text-xs">■</button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-black/5 bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-3 p-3">
        <div className="flex items-center gap-2">
          <span className="h-8 w-8 grid place-items-center rounded-full bg-gold text-navy text-sm">🔊</span>
          <div>
            <div className="text-xs font-black tracking-widest uppercase text-navy">Voice Reading</div>
            <div className="text-[0.68rem] text-muted leading-none">{title ? title.slice(0, 40) : 'Listen with natural voice'} · {rate}x</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border transition ${isPlaying && !isPaused ? 'bg-navy text-white border-navy' : 'bg-gold text-navy border-gold hover:brightness-105'}`}
          >
            <span>{isPlaying && !isPaused ? '❚❚ Pause' : isPaused ? '▶ Resume' : '▶ Listen'}</span>
          </button>
          {(isPlaying || isPaused) && (
            <button onClick={handleStop} className="h-9 w-9 grid place-items-center rounded-full border border-black/10 bg-white text-navy text-xs hover:bg-haze">■ Stop</button>
          )}
          <button onClick={() => setShowSettings(v => !v)} className="h-9 w-9 grid place-items-center rounded-full border border-black/10 bg-white text-navy text-xs" aria-label="Voice settings">⚙</button>
        </div>
      </div>
      {showSettings && (
        <div className="border-t border-black/5 bg-haze p-3 grid sm:grid-cols-2 gap-3 text-xs">
          <label className="flex flex-col gap-1">
            <span className="font-bold text-navy">Voice</span>
            <select value={selected} onChange={e => setSelected(e.target.value)} className="rounded-lg border border-black/10 bg-white px-2 py-1.5 text-xs">
              {voices.filter(v => v.lang.startsWith('en')).slice(0, 12).map(v => (
                <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
              ))}
              {!voices.length && <option>Default</option>}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-bold text-navy">Speed: {rate.toFixed(1)}x</span>
            <input type="range" min={0.8} max={1.2} step={0.1} value={rate} onChange={e => setRate(parseFloat(e.target.value))} />
            <span className="text-[0.68rem] text-muted">Slower on mobile for clarity · Minimal processing</span>
          </label>
        </div>
      )}
      <div className="px-3 pb-2 text-[0.68rem] text-muted">🔒 Private — uses your device's voice engine. No audio sent to server.</div>
    </div>
  )
}
