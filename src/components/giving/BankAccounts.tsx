'use client'
import funds from '@/data/givingFunds.json'
import bankJson from '@/data/bankAccounts.json'

export default function BankAccounts(){
  const accounts = (bankJson as any).accounts as any[]
  return (
    <div className="space-y-3">
      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-2 text-xs">{(bankJson as any).notice}</div>
      {(funds as any[]).map(f=>{
        const accs = accounts.filter(a=>a.fundSlug===f.slug)
        return (
          <div key={f.slug} className="card p-4">
            <div className="flex justify-between items-start gap-3">
              <div><div className="font-display font-extrabold">{f.name}</div><div className="text-xs text-muted">{f.desc}</div></div>
              <span className={`rounded-full px-2 py-1 text-xs font-bold ${accs.length&&accs[0].active?'bg-emerald-500 text-white':'bg-sand'}`}>{accs.length&&accs[0].active?'Active':'Update needed'}</span>
            </div>
            {accs.length===0 ? <div className="mt-2 text-xs text-muted">No account yet — add in Admin → Giving</div> :
              accs.map((a:any)=>(
                <div key={a.accountNo} className="mt-2 rounded-xl bg-sand p-3 text-sm">
                  <div className="font-semibold">{a.bankName}</div>
                  <div>{a.accountName}</div>
                  <div className="font-mono font-bold">{a.accountNo} · {a.currency}</div>
                </div>
              ))}
          </div>
        )
      })}
    </div>
  )
}
