'use client'
import { useEffect, useRef } from 'react'
import { useIsMobile } from './useIsMobile'

// Kinetic typography - split + stagger reveal, variable font on hover
// Mobile: simple fade only

export function KineticHeading({ children, className, delay = 0, as: Tag = 'h2' }: { children: React.ReactNode; className?: string; delay?: number; as?: any }) {
  const ref = useRef<HTMLElement>(null)
  const { shouldReduce } = useIsMobile()

  useEffect(() => {
    if (shouldReduce) return
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.classList.add('in-view')
            // Stagger children if split
            el.querySelectorAll<HTMLElement>('[data-split]').forEach((child, i) => {
              child.style.transitionDelay = `${delay + i * 60}ms`
              child.classList.add('in-view')
            })
          }
        })
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldReduce, delay])

  // If reduce, no split, just fade
  if (shouldReduce) {
    return <Tag ref={ref} className={className}>{children}</Tag>
  }

  // For string children, split into words for kinetic effect
  const content = typeof children === 'string' ? (
    <span>
      {children.split(' ').map((word, i) => (
        <span key={i} data-split className="inline-block overflow-hidden align-bottom">
          <span className="inline-block translate-y-full opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] in-view:translate-y-0 in-view:opacity-100" style={{ transitionDelay: `${delay + i * 80}ms` }}>
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  ) : children

  return (
    <Tag
      ref={ref}
      className={`${className} [&_[data-split]]:will-change-transform`}
      style={{} as any}
    >
      {content}
    </Tag>
  )
}

export function ScrollReveal({ children, className, delay = 0, y = 24 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { shouldReduce } = useIsMobile()

  useEffect(() => {
    if (shouldReduce) {
      // Mobile: just show, no animation
      if (ref.current) ref.current.style.opacity = '1'
      return
    }
    const el = ref.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = `translateY(${y}px)`
    el.style.transition = `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}ms`
    el.style.willChange = 'transform, opacity'

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [shouldReduce, delay, y])

  return (
    <div ref={ref} className={className} style={shouldReduce ? { opacity: 1 } : undefined}>
      {children}
    </div>
  )
}
