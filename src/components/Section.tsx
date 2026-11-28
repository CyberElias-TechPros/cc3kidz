export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="eyebrow">{children}</div>
}
export function SectionHeading({
  eyebrow,
  title,
  desc,
  align = 'left'
}: {
  eyebrow?: string
  title: string
  desc?: string
  align?: 'left' | 'center'
}) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="font-display font-extrabold text-[1.9rem] md:text-[2.4rem] leading-[0.95] tracking-tight text-ink mt-2">
        {title}
      </h2>
      {desc && <p className="mt-3 text-[1.02rem] leading-7 text-slate-600">{desc}</p>}
    </div>
  )
}
