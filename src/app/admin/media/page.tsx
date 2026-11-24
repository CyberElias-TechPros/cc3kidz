'use client'
import { useEffect, useState } from 'react'

export default function AdminMedia() {
  const [pending,setPending]=useState<any[]>([])
  const [tab,setTab]=useState<'testimonies'|'messages'>('testimonies')
  const load=()=>{
    fetch('/api/testimony?scope=admin').then(r=>r.json()).then(j=> setPending(j.testimonies||[]))
  }
  useEffect(()=>{ load() },[])
  const moderate=async(id:string,status:string)=>{
    await fetch('/api/testimony',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})})
    load()
  }
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h1 className="font-display font-black text-xl">Media & Testimonies</h1>
        <p className="text-sm text-muted">Video/audio/photos/docs + testimony moderation (Pending → Approved → Published). Search by speaker/topic/scripture/series — player with fullscreen/speed/resume/captions.</p>
        <div className="mt-3 flex gap-2 text-xs">
          <button onClick={()=>setTab('testimonies')} className={`rounded-full px-3 py-1 font-bold ${tab==='testimonies'?'bg-navy text-white':'bg-sand'}`}>Testimonies ({pending.filter(p=>p.status==='pending').length} pending)</button>
          <button onClick={()=>setTab('messages')} className={`rounded-full px-3 py-1 font-bold ${tab==='messages'?'bg-navy text-white':'bg-sand'}`}>Messages</button>
        </div>
      </div>
      {tab==='testimonies' && (
        <div className="card p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-navy text-white"><tr><th className="text-left px-3 py-2">Person</th><th className="text-left px-3 py-2">Title</th><th className="text-left px-3 py-2">Body</th><th className="text-left px-3 py-2">Status</th><th className="text-left px-3 py-2">Action</th></tr></thead>
            <tbody>
              {pending.length===0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-muted">No submissions — members submit via /testimonies.</td></tr>}
              {pending.map((t:any)=>(
                <tr key={t.id} className="border-t">
                  <td className="px-3 py-2 font-medium">{t.name}<div className="text-xs text-muted">{t.category}</div></td>
                  <td className="px-3 py-2">{t.title}</td>
                  <td className="px-3 py-2 max-w-[280px] truncate text-xs">{t.body.slice(0,120)}</td>
                  <td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs font-bold ${t.status==='published'?'bg-emerald-500 text-white': t.status==='approved'?'bg-navy text-white':'bg-amber-100 text-amber-800'}`}>{t.status}</span></td>
                  <td className="px-3 py-2 flex gap-1 flex-wrap">
                    <button onClick={()=>moderate(t.id,'approved')} className="rounded-full bg-navy text-white px-2 py-1 text-xs">Approve</button>
                    <button onClick={()=>moderate(t.id,'published')} className="rounded-full bg-emerald-600 text-white px-2 py-1 text-xs">Publish</button>
                    <button onClick={()=>moderate(t.id,'rejected')} className="rounded-full bg-red-600 text-white px-2 py-1 text-xs">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab==='messages' && (
        <div className="card p-6 text-sm text-muted">Messages are curated in <code>src/data/messages.json</code> — video/audio with search. CMS editor for non-dev publishing coming next (draft→review→published workflow).</div>
      )}
    </div>
  )
}
