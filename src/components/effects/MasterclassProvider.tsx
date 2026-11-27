'use client'
import { useEffect } from 'react'
import { SmoothScroll } from './SmoothScroll'
import { MagneticCursor } from './MagneticCursor'
import { useIsMobile } from './useIsMobile'

function EasterEgg() {
  useEffect(() => {
    // Console flex + wireframe toggle
    console.log(
      '%c⚡ CC3 Masterclass %c— Front-end crafted for 120fps. Try pressing %c`%c to toggle wireframe debug. Made with WebGL, spring physics & love.',
      'background:#0E1B33;color:#C6A04A;padding:4px 8px;border-radius:4px;font-weight:800;',
      'color:#0E1B33;font-weight:600;',
      'background:#C6A04A;color:#0E1B33;padding:1px 4px;border-radius:3px;font-weight:800;',
      'color:#0E1B33;'
    )
    console.log(
      '%cHint: %cHover any card for liquid distortion · Drag the hero · Hold Shift to scrub timeline',
      'color:#C6A04A;font-weight:700;',
      'color:#64748B;'
    )

    const onKey = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === 'Backquote') {
        document.documentElement.classList.toggle('debug-wireframe')
        const on = document.documentElement.classList.contains('debug-wireframe')
        console.log(on ? '🔳 Wireframe ON — inspecting compositor layers' : '🔲 Wireframe OFF')
      }
    }
    window.addEventListener('keydown', onKey)

    // Procedural audio hint (Web Audio) - subtle click on interactions
    let audioCtx: AudioContext | null = null
    const ensureAudio = () => {
      if (audioCtx || (window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
      } catch {}
    }

    const playTick = (freq = 600) => {
      if (!audioCtx || audioCtx.state === 'suspended') return
      const osc = audioCtx.createOscillator()
      const gain = audioCtx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.value = 0.02
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12)
      osc.connect(gain).connect(audioCtx.destination)
      osc.start()
      osc.stop(audioCtx.currentTime + 0.12)
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button')) {
        ensureAudio()
        playTick(700 + Math.random() * 200)
      }
    }
    // Only enable sound after user gesture, toggleable via localStorage
    const soundEnabled = localStorage.getItem('cc3-sound') === 'on'
    if (soundEnabled) {
      document.addEventListener('click', onClick)
      ensureAudio()
    }

    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
      try { audioCtx?.close() } catch {}
    }
  }, [])
  return null
}

function PerformanceGuard() {
  const { shouldReduce } = useIsMobile()
  useEffect(() => {
    // Only animate transform/opacity, offload Web Workers hint
    if (shouldReduce) {
      document.documentElement.setAttribute('data-tier', 'lite')
    } else {
      document.documentElement.setAttribute('data-tier', 'full')
    }

    // FPS discipline: drop to lite if frame drops detected
    let frames = 0
    let last = performance.now()
    let raf = 0
    const check = () => {
      frames++
      const now = performance.now()
      if (now - last > 1000) {
        const fps = frames * 1000 / (now - last)
        if (fps < 45 && !shouldReduce) {
          document.documentElement.setAttribute('data-tier', 'lite')
          console.warn('[perf] Low FPS detected, downgrading to lite tier')
        }
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(check)
    }
    // Only monitor on full tier
    if (!shouldReduce) raf = requestAnimationFrame(check)
    return () => cancelAnimationFrame(raf)
  }, [shouldReduce])
  return null
}

export function MasterclassProvider({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <MagneticCursor />
      <EasterEgg />
      <PerformanceGuard />
      {children}
      <style>{`
        /* View Transitions - zero reload */
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.4s;
        }
        @media (prefers-reduced-motion: reduce) {
          ::view-transition-old(root),
          ::view-transition-new(root) { animation: none; }
        }
        /* Debug wireframe */
        .debug-wireframe * {
          outline: 1px solid rgba(255,0,0,0.15) !important;
          background: rgba(255,0,0,0.02) !important;
        }
        /* Compositor-only animations */
        [data-reveal] {
          will-change: transform, opacity;
          contain: layout paint;
        }
        /* Scroll velocity skew */
        html {
          scrollbar-width: thin;
          scrollbar-color: #C6A04A #EAF0F7;
        }
        /* Hide custom cursor on touch */
        @media (pointer: coarse) {
          * { cursor: auto !important; }
        }
        /* GPU layer promotion */
        .gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </SmoothScroll>
  )
}
