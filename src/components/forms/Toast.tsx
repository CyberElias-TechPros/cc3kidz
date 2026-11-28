'use client'
import { useEffect, useState } from 'react'

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null)
  const show = (m: string) => {
    setMsg(m)
    setTimeout(() => setMsg(null), 3500)
  }
  const el = msg ? (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy text-white px-5 py-3 rounded-full shadow-lifted text-sm font-medium">
      {msg}
    </div>
  ) : null
  return { show, el }
}
