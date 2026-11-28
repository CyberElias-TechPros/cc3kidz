'use client'
import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const router = useRouter()
  const sp = useSearchParams()
  const next = sp.get('next') || '/member'
  const [s, setS] = useState({ email: 'member@cc3.local', password: 'member123' })
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const r = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(s) })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error)
      router.push(next)
      router.refresh()
    } catch (e: any) {
      setErr(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-3">
      {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
      <input placeholder="Email" value={s.email} onChange={e => setS({ ...s, email: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <input placeholder="Password" type="password" value={s.password} onChange={e => setS({ ...s, password: e.target.value })} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
      <button disabled={loading} className="btn btn--navy w-full justify-center">
        {loading ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <section className="section">
      <div className="container-cc max-w-md">
        <div className="card p-8">
          <div className="eyebrow">Member Portal</div>
          <h1 className="font-display font-black text-2xl mt-2">Welcome back</h1>
          <p className="text-sm text-muted mt-2">Use demo credentials or register. Member dashboard holds cell, department, events, and Foundation School.</p>
          <div className="mt-4 rounded-xl bg-sand p-3 text-xs">
            <div className="font-semibold">Demo accounts</div>
            <div>member@cc3.local / member123 · leader@cc3.local / leader123 · admin@cc3.local / admin123</div>
          </div>
          <Suspense fallback={<div className="mt-6 text-sm text-muted">Loading…</div>}>
            <LoginForm />
          </Suspense>
          <div className="mt-4 text-sm text-center">
            New here? <Link href="/register" className="text-navy underline">Create account</Link>
          </div>
          <div className="mt-2 text-xs text-center text-muted">
            <Link href="/admin" className="underline">Admin dashboard</Link> requires admin role. · <Link href="/forgot-password" className="underline">Forgot password?</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
