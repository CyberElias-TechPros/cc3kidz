'use client'
import { useEffect, useState } from 'react'
import funds from '@/data/givingFunds.json'
import { getBankAccounts } from '@/lib/giving'

export default function GivingFlow(){
  const [fundSlug, setFundSlug] = useState('tithe')
  const fund = (funds as any[]).find(f=> f.slug===fundSlug)
  const accounts = getBankAccounts(fundSlug)
  const [amount, setAmount] = useState('')
  const [reference, setReference] = useState('')
  const [note, setNote] = useState('')
  const [file, setFile] = useState<File|null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState<any>(null)
  const [err, setErr] = useState<string|null>(null)
  const [mine, setMine] = useState<any[]>([])

  const refreshMine = ()=> fetch('/api/giving/submit?mine=1').then(r=>r.json()).then(j=> setMine(j.giving||[])).catch(()=>{})
  useEffect(()=>{ refreshMine() }, [])

  const submit = async (e: React.FormEvent)=>{
    e.preventDefault()
    setErr(null); setLoading(true)
    try{
      const fd = new FormData()
      fd.set('fundSlug', fundSlug)
      fd.set('amount', amount)
      fd.set('reference', reference)
      fd.set('note', note)
      if (file) fd.set('pop', file)
      const r = await fetch('/api/giving/submit', { method:'POST', body: fd })
      const j = await r.json()
      if (!j.ok) throw new Error(j.error||'Failed')
      setDone(j); refreshMine()
    } catch(e:any){ setErr(e.message) } finally{ setLoading(false) }
  }

  if (done) return (
    <div className="card p-8 text-center">
      <div className="h-12 w-12 rounded-full bg-emerald-500 text-white grid place-items-center mx-auto">✓</div>
      <h3 className="font-display font-extrabold text-xl mt-3">POP Received — pending verification</h3>
      <p className="text-sm text-muted mt-2">{done.message} ID {done.id}. Finance will verify within 24–48h and issue receipt {accounts[0]?.accountNo ? `to the ${fund.name} account` : ''}.</p>
      <button onClick={()=>{ setDone(null); setAmount(''); setReference(''); setNote(''); setFile(null)}} className="btn btn--navy mt-4">Submit another</button>
      <div className="mt-3 text-xs text-muted">Check <a href="/member" className="underline">Member → Giving history</a> for status.</div>
    </div>
  )

  return (
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
      <form onSubmit={submit} className="card p-6 space-y-4">
        <div className="eyebrow">1. Choose arm · 2. Transfer · 3. Upload POP</div>
        <h3 className="font-display font-extrabold text-xl">Bank Transfer — Upload Proof</h3>
        {err && <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">{err}</div>}
        <div>
          <div className="text-xs font-bold tracking-widest uppercase text-gold">Arm / Fund</div>
          <div className="mt-2 grid sm:grid-cols-2 gap-2">
            {(funds as any[]).map(f=>(
              <button type="button" key={f.slug} onClick={()=> setFundSlug(f.slug)} className={`rounded-xl border px-3 py-3 text-left ${fundSlug===f.slug?'bg-navy text-white border-navy':'bg-white border-black/10'}`}>
                <div className="font-semibold text-sm">{f.name}</div><div className="text-xs opacity-70">{f.desc}</div>
              </button>
            ))}
          </div>
          <div className="mt-2 text-xs text-muted">{fund.desc} — {fund.purpose}</div>
        </div>

        <div className="rounded-xl bg-sand p-4">
          <div className="font-semibold text-sm">Account for {fund.name}</div>
          {accounts.length===0 && <div className="text-xs text-muted mt-1">No account configured — admin must add in Admin → Giving.</div>}
          {accounts.map(a=>(
            <div key={a.accountNo} className="mt-2 text-sm">
              <div><span className="font-semibold">{a.bankName}</span> — {a.accountName}</div>
              <div className="font-mono font-bold tracking-widest text-base mt-1">{a.accountNo}</div>
              <div className="text-xs text-muted mt-1">Ref: “{fund.name} + phone” e.g. 080…</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="text-sm"><span className="font-semibold">Amount NGN *</span><input required placeholder="e.g. 5000" value={amount} onChange={e=>setAmount(e.target.value)} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm" /></label>
          <label className="text-sm"><span className="font-semibold">Bank reference / Narration</span><input placeholder="e.g. UBA 12:34 J DOE" value={reference} onChange={e=>setReference(e.target.value)} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm" /></label>
        </div>
        <label className="text-sm"><span className="font-semibold">POP — screenshot / receipt (JPG/PNG/PDF, ≤8MB) *</span>
          <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={e=> setFile(e.target.files?.[0]||null)} className="mt-1 w-full rounded-xl border border-black/10 px-4 py-3 text-sm bg-white" />
          {file && <div className="text-xs text-muted mt-1">{file.name} — {(file.size/1024).toFixed(0)} KB</div>}
        </label>
        <textarea placeholder="Note (optional) — e.g. August tithe" value={note} onChange={e=>setNote(e.target.value)} rows={2} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm" />
        <button disabled={loading || !amount} className="btn btn--navy w-full justify-center">{loading?'Uploading…':'Submit POP for Verification'}</button>
        <p className="text-xs text-muted text-center">After submit you can track status in Member dashboard. Finance verifies and issues receipt — ask finance office if urgent.</p>
      </form>

      <div className="space-y-4">
        <div className="card p-6">
          <h4 className="font-display font-extrabold">How it works</h4>
          <ol className="mt-2 list-decimal list-inside text-sm text-muted space-y-1">
            <li>Choose arm — correct bank account appears.</li>
            <li>Do transfer from your bank app (use phone as narration).</li>
            <li>Upload screenshot/PDF + amount + reference.</li>
            <li>Finance verifies → issues receipt → you’re notified.</li>
            <li>Rejected? Fix reference/amount and resubmit.</li>
          </ol>
          <div className="mt-3 rounded-xl bg-gold/15 border border-gold/20 p-3 text-xs">
            <b>Bank accounts per arm:</b> Admin can add/edit banks for each fund in <a href="/admin/giving" className="underline">Admin → Giving</a> without touching code. Until real accounts are set, POPs are held pending.
          </div>
        </div>
        {mine.length>0 && (
          <div className="card p-6">
            <h4 className="font-display font-extrabold">Your recent submissions</h4>
            <div className="mt-3 space-y-2 max-h-[300px] overflow-auto">
              {mine.slice(0,6).map((g:any)=>(
                <div key={g.id} className="rounded-xl border border-black/10 px-3 py-2 flex justify-between items-center text-sm">
                  <div><div className="font-semibold">{g.fundName} — ₦{Number(g.amount).toLocaleString()}</div><div className="text-xs text-muted">{g.createdAt.slice(0,10)} · {g.reference||'no ref'}</div></div>
                  <span className={`rounded-full px-2 py-1 text-xs font-bold ${g.status==='verified'?'bg-emerald-500 text-white': g.status==='rejected'?'bg-red-500 text-white':'bg-amber-100 text-amber-800'}`}>{g.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
