# CC3 Main — Christ Embassy Central Church 3 (Port Harcourt Zone 3)

**Live stack:** Next.js 15 (App Router) + Tailwind CSS + Prisma (Postgres) + file-json fallback. Church website for CC3 Group: 6 churches (CC3 HQ + Ozuoba / Rumuekini / Rumuosi / HigherLife / East-West Central), Kids / Teens / Youth, member & admin.

> Old README described a vanilla HTML/CSS kids-only site — replaced. Source of truth is `src/app/page.tsx`, `src/app/kids/`, `src/data/*.json`.

## Quick start

```bash
npm install
cp .env.example .env.local # fill DATABASE_URL, SESSION_SECRET
npm run dev                 # http://localhost:3000
npm run build               # production build (runs scripts/sync-kids.mjs)
npm test                    # vitest (validation + session HMAC)
```

Demo accounts (only when `DATABASE_URL` unset / dev): `member@cc3.local / member123`, `leader@cc3.local / leader123`, `admin@cc3.local / admin123`. In production with DB, seed via `npm run db:seed`.

## Env

| Var | Required | Note |
|-----|----------|------|
| `DATABASE_URL` | prod yes, dev no | Postgres (Neon/Vercel). If empty, app uses file store `.data/db.json` + `globalThis.__cc3` (see `src/lib/store.ts`, `src/lib/persist.ts`). |
| `SESSION_SECRET` | prod yes | Min 16 chars, random. Generated: `node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"`. Validated in `src/lib/env.ts` (fails in prod if default). |
| `RESEND_API_KEY` | no | If set, forgot-password emails via Resend; else logged to server console. |
| `EMAIL_FROM` | no | Default `CC3 <no-reply@cecentralchurch3.org>` |
| `UPLOAD_MAX_MB` | no | Default `8` |

See `.env.example`.

## Project layout

- `src/app/page.tsx` — homepage (hero slider + ServiceCountdown + AnnouncementBar after hero, Service Times, Join a Service Unit)
- `src/app/group/page.tsx` — Group directory; `src/app/churches/[slug]` canonical; `src/components/group/ZoneBreadcrumb.tsx` external `https://cephzone3.org/`
- `src/app/kids/` `teens/` `youth/` — sub-churches with own layout/nav
- `src/app/admin/` `member/` — protected via `src/middleware.ts` (checks `cc3_session` cookie) + client `AdminLayout` guard
- `src/app/api/*` — `auth/*`, `attendance`, `giving/*`, `prayer`, `testimony`, `volunteer`, `contact`, `events/register`, etc. Validation in `src/lib/validation.ts` (Zod)
- `src/lib/session.ts` — HMAC-SHA256 signed `userId.sig` cookie (`HttpOnly; SameSite=Lax; Secure` in prod), `timingSafeEqual` verify
- `src/lib/auth.ts` — file-store users + Postgres mirror (dual-write, PG preferred in prod)
- `src/data/*.json` — `groupChurches.json` (6 churches, phones blank by policy), `services.json`, `ministries.json`, `events.json`, `givingFunds.json`
- `public/assets/images/` — `cc3/`, `ministries/` (generated), `leaders/` etc.
- `prisma/schema.prisma` — User, Visit, Prayer, Testimony, Volunteer, EventReg, ContactMsg, Giving*, etc.

## Security model

- RBAC: `member < leader < admin < superadmin` (`src/lib/rbac.ts`, `roleRank`)
- Middleware redirects unauthenticated `/member/*` `/admin/*` to `/login?next=`
- All `POST` APIs use Zod + `enforceRate` (`src/lib/rate-limit.ts` in-memory; replace with Redis in production)
- POP uploads: MIME + extension safelist (`jpg/png/webp/pdf`), sanitized filename, `public/uploads/pop` (move to S3 for prod) — `src/app/api/giving/submit/route.ts`
- Content: `cells.json`, `testimony` `@db.Text`, `persist.ts` atomic `renameSync` writes

## Deploy

Vercel (Next.js preset). Set `DATABASE_URL` (Neon), `SESSION_SECRET` (random), `RESEND_API_KEY` if using email. `next.config.mjs` handles redirects for old `/group/*` slugs and `X-Content-Type-Options` header.

## Address

CC3 HQ: `30B Rumuokwuta/NTA Road, Opposite Patcoin Filling Station, Port Harcourt, Rivers State, Nigeria`. Zonal HQ (footer only): `Jessy & Jenny St, Peter Odili Rd — cephzone3.org`.

## CI

`.github/workflows/ci.yml` runs `npm ci`, `lint`, `tsc --noEmit`, `vitest`, `next build` on `main` and `arena/*`.
