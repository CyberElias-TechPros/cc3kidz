export const metadata = { title: 'Privacy Policy — CE Central Church 3', description: 'How CE Central Church 3 handles your personal data under the Nigerian Data Protection Act 2023.' }
export default function Privacy() {
  return (
    <section className="section"><div className="container-cc prose-cc max-w-3xl">
      <h1 className="font-display font-black text-[2.4rem]">Privacy Policy</h1>
      <p className="text-muted">Last updated: 26 Nov 2026 · CE Central Church 3, PH Zone 3. Contact: info@cecentralchurch3.org · +234 905 862 8386</p>
      <h2>1. What we collect & why</h2>
      <ul>
        <li><b>Visit / contact / prayer / testimony / volunteer / events</b>: name, phone/email, date, message — to respond, pray, follow up, register you. Consent at submission.</li>
        <li><b>Member portal</b>: name, email, phone, cell/department, foundation progress, attendance — to run cell & discipleship.</li>
        <li><b>Giving</b>: amount, fund, reference, POP image/PDF (stored encrypted-at-rest on Vercel Blob / Postgres) — to reconcile & receipt. We never store card PIN.</li>
        <li><b>Kids</b>: no account for children; parent/guardian submits on behalf. We do not directly collect from under-13 without parental consent.</li>
      </ul>
      <h2>2. Legal basis</h2>
      <p>Consent (Art. 25 NDPA 2023) for enquiries & newsletter; contract for membership/foundation; legitimate interest for security & audit logs; legal obligation for financial records (7 years).</p>
      <h2>3. Cookies</h2>
      <p>Essential cookie <code>cc3_session</code> (HttpOnly, Secure, SameSite=Lax, HMAC-signed) for login. No tracking without explicit consent banner. See <a href="/privacy#cookies">Cookie Consent</a>.</p>
      <h2>4. Who sees your data</h2>
      <p>Only authorised roles: Member (own data), Leader (their cell/dept), Admin/Superadmin (all, audit-logged). Prayer follow-up limited to pastoral team. Vendors: Vercel hosting, Neon Postgres, Resend email, Vercel Blob — under DPA.</p>
      <h2>5. Retention & deletion</h2>
      <p>Prayer/contact 24 months; visit follow-up 12 months; giving 7 years (financial law); audit logs 24 months. Request correction/deletion via info@cecentralchurch3.org — we respond within 30 days. Data portability on request.</p>
      <h2>6. Security</h2>
      <p>HTTPS + HSTS, RBAC, rate-limit, HMAC sessions, CSP, encrypted backups, principle of least privilege. Report vulnerability to admin.</p>
      <h2>7. Your rights (NDPA §18)</h2>
      <p>Access, rectify, erase, restrict, object, data portability, withdraw consent. Complaint to <a href="https://ndpc.gov.ng" target="_blank" rel="noreferrer">NDPC</a>.</p>
    </div></section>
  )
}
