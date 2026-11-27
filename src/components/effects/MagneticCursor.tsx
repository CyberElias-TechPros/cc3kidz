'use client'
import { useEffect, useRef, useState } from 'react'
import { useIsMobile } from './useIsMobile'

// Magnetic cursor that morphs to pill - desktop only, disabled on mobile/touch

export function MagneticCursor() {
  const { shouldReduce, isMobile } = useIsMobile()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')
  const [hidden, setHidden] = useState(true)
  const mouse = useRef({ x: 0, y: 0 })
  const pos = useRef({ x: 0, y: 0 })
  const raf = useRef(0)

  useEffect(() => {
    if (shouldReduce || isMobile) return
    // Only desktop with fine pointer
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current!
    const ring = ringRef.current!

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (hidden) setHidden(false)

      // Magnetic attraction to buttons
      const target = e.target as HTMLElement
      const btn = target.closest('a, button, [data-magnetic]') as HTMLElement | null
      if (btn) {
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.hypot(dx, dy)
        const threshold = 120
        if (dist < threshold) {
          const pull = (threshold - dist) / threshold
          btn.style.transform = `translate(${dx * pull * 0.15}px, ${dy * pull * 0.15}px)`
          ring.style.width = '56px'
          ring.style.height = '56px'
          ring.style.borderColor = 'rgba(198,160,74,0.6)'
          setLabel(btn.dataset.cursor || (btn.tagName === 'A' ? 'View' : 'Click'))
        } else {
          btn.style.transform = ''
          ring.style.width = '32px'
          ring.style.height = '32px'
          ring.style.borderColor = 'rgba(14,27,51,0.15)'
          setLabel('')
        }
      } else {
        document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => el.style.transform = '')
      }
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)

    const animate = () => {
      // Spring lerp for buttery follow
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15
      dot.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      // Ring lags slightly more
      const rx = pos.current.x + (mouse.current.x - pos.current.x) * 0.08
      const ry = pos.current.y + (mouse.current.y - pos.current.y) * 0.08
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf.current = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    // Blend mode awareness
    document.documentElement.style.cursor = 'none'

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      cancelAnimationFrame(raf.current)
      document.documentElement.style.cursor = ''
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(el => el.style.transform = '')
    }
  }, [shouldReduce, isMobile, hidden])

  if (shouldReduce || isMobile) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-navy rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ opacity: hidden ? 0 : 1, transition: 'opacity 0.2s' }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-black/15 rounded-full pointer-events-none z-[9998] hidden lg:block items-center justify-center"
        style={{
          opacity: hidden ? 0 : 1,
          transition: 'opacity 0.2s, width 0.2s, height 0.2s, border-color 0.2s',
          display: hidden ? 'none' : 'grid',
          placeItems: 'center',
        }}
        aria-hidden
      >
        {label && (
          <span className="text-[0.60rem] font-bold tracking-widest uppercase bg-navy text-white px-2 py-1 rounded-full">
            {label}
          </span>
        )}
      </div>
    </>
  )
}
