import Link from 'next/link'
export default function NotFound(){
  return <section className="section"><div className="container" style={{textAlign:'center'}}><div style={{fontSize:'4rem'}}>😢</div><h1>Page not found</h1><p style={{color:'var(--ink-soft)'}}>That adventure doesn&apos;t exist — yet! Let&apos;s head back.</p><div className="btn-row" style={{justifyContent:'center', marginTop:'1rem'}}><Link className="btn btn--primary" href="/kids">Back to Kids home</Link><Link className="btn btn--secondary" href="/kids/lessons">Bible lessons</Link></div></div></section>
}
