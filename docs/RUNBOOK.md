# CC3 Production Runbook (2026-11-26)

## Deploy (Vercel)
1. Push to `main` → Vercel auto-builds (framework: Next.js, build `npm run build`, output `.next`).
2. Env vars (Vercel → Project → Settings → Environment Variables):
   - `DATABASE_URL` (Neon — required for persistence, else file-json ephemeral and lost on cold start)
   - `SESSION_SECRET` (32+ chars random — `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"` — **must** differ from dev default)
   - `APP_URL` / `NEXT_PUBLIC_APP_URL` = `https://cecentralchurch3.org`
   - `RESEND_API_KEY` + `EMAIL_FROM` (optional but required for password-reset emails; else logged)
   - `BLOB_READ_WRITE_TOKEN` (Vercel Blob for POP uploads; without, POPs ephemeral)
   - `UPLOAD_MAX_MB` default 8
3. One-time DB: `npx prisma db push` then `npx tsx prisma/seed.ts` (creates 3 demo users + 8 funds + bank accounts).

## Health & audit
- `GET /api/health` → `{ok, db, version}`; set up UptimeRobot pinging `/api/health` every 5m.
- `GET /api/audit-log?limit=100` (admin) — review daily.
- `GET /api/admin/export?kind=giving|visits|events|attendance` for finance/ops CSV.

## Backups
- Neon: daily PITR (7d retention on paid). Additionally `pg_dump` weekly to S3 via GitHub Action.
- File-json fallback: not backed up — migrate to Postgres before launch.

## Security checklist (pre-launch)
- [ ] `SESSION_SECRET` rotated from default (fails hard in middleware if not).
- [ ] `DATABASE_URL` set (else data loss).
- [ ] `APP_URL` set (CSP + email links).
- [ ] `BLOB_READ_WRITE_TOKEN` set (else POPs lost).
- [ ] `RESEND_API_KEY` set + domain verified (password resets fail silently).
- [ ] HSTS preload, CSP verified in browser devtools.
- [ ] RBAC tested: member can't hit `/api/prayer` GET full, etc.
- [ ] Rate limits verified: login 8/min per IP, giving 10/min.

## Incident response
- **Data leak / unauthorized access**: rotate `SESSION_SECRET` → all sessions invalidated. Audit `GET /api/audit-log`.
- **POP abuse**: verify `GET /api/giving/submit` list, reject via `POST /api/giving/verify {action:'reject'}`.
- **Spam**: lower `RATE_PRESETS` in `src/lib/rate-limit.ts`, add Cloudflare Turnstile captcha to forms.
- **Downtime**: check Vercel Deployments → logs, rollback to previous deployment.

## Known gaps (next)
- Forgot-password tokens in-memory without DB → move to Prisma `PasswordResetToken` model for cross-instance persistence.
- Rate limiting in-memory → migrate to Upstash Redis when traffic grows.
- No Sentry — add `SENTRY_DSN` and `@sentry/nextjs` before 10k users.
