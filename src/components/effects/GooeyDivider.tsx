'use client'
import { useIsMobile } from './useIsMobile'

export function GooeyDivider({ flip = false }: { flip?: boolean }) {
  const { shouldReduce } = useIsMobile()
  if (shouldReduce) return <div className="h-px bg-black/5" aria-hidden />
  
  return (
    <div className="relative h-12 overflow-hidden" aria-hidden style={{ transform: flip ? 'scaleY(-1)' : undefined }}>
      <svg viewBox="0 0 1440 100" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <filter id="gooey">
            <feTurbulence baseFrequency="0.015 0.08" numOctaves="2" result="turb" seed="2" />
            <feDisplacementMap in="SourceGraphic" in2="turb" scale={shouldReduce ? 0 : 8} />
          </filter>
          <linearGradient id="gooGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0E1B33" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#C6A04A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0E1B33" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q360,80 720,40 T1440,40 L1440,100 L0,100 Z"
          fill="url(#gooGrad)"
          filter="url(#gooey)"
          style={{ animation: shouldReduce ? 'none' : 'wave 12s ease-in-out infinite' }}
        />
      </svg>
      <style>{`
        @keyframes wave {
          0%, 100% { d: path("M0,40 Q360,80 720,40 T1440,40 L1440,100 L0,100 Z"); }
          50% { d: path("M0,60 Q360,20 720,60 T1440,50 L1440,100 L0,100 Z"); }
        }
      `}</style>
    </div>
  )
}
