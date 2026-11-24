'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [s, setS] = useState({ name: '', email: '', phone: '', password: '' })
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/auth/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error)
      router.push('/member')
      router.refresh()
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <div className="container-cc max-w-md">
        <div className="card p-8">
          <div className="eyebrow">Member Portal</div>
          <h1 className="font-display font-black text-2xl mt-2">Create account</h1>
          <form onSubmit={submit} className="mt-6 space-y-3">
            {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
            <input required placeholder="Full name" value={s.name} onChange={e => setS({ ...s, name: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <input required placeholder="Email" type="email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <input placeholder="Phone / WhatsApp" value={s.phone} onChange={e => setS({ ...s, phone: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <input required placeholder="Password" type="password" value={s.password} onChange={e => setS({ ...s, password: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
            <button disabled={loading} className="btn btn--navy w-full justify-center">
              {loading ? 'Creating…' : 'Create Account'}
            </button>
          </form>
          <div className="mt-4 text-sm text-center">
            Have account? <Link href="/login" className="text-navy underline">Sign in</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
