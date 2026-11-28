import type { Metadata } from 'next'
import '@/components/rhapsody/rhapsody.css'

export const metadata: Metadata = {
  title: 'Rhapsody of Realities — Daily Devotional | CC3 Main Church',
}

export default function RhapsodyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
