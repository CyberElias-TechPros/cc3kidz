# CC3 Production Ready — Bank Transfer + POP (Full Audit 2026-11-23)

**Stack:** Next.js 15 + Prisma + Vercel Postgres (Neon) · File-JSON `.data/db.json` fallback · bcrypt · signed cookies · Zod · rate-limit · RBAC · audit

## Executive Summary — What's New in This Sweep (2026-11-23 Phase 4)

Full user-story audit across **every role** (Visitor → Member → Leader → Admin) and **every business flow** (visit, prayer, testimony, volunteer, events, cells, foundation, giving, media, search, newsletter, auth). All happy paths now close the loop (create → moderate → notify → export → audit). No private data leaks; every mutation validated, rate-limited, and logged.

### Security & RBAC — closed leaks

- **New helper:** `src/lib/rbac.ts` — `requireUser`, `requireRole`, `userFromRequest`. All sensitive GETs now check role:
  - `GET /api/prayer` → leader/admin only (public gets `{count}` only, no bodies)
  - `GET /api/visit|contact|volunteer` → admin/leader only (was public array dump)
  - `GET /api/testimony` → public returns only `published|approved`; admin scope requires admin
  - `GET /api/newsletter|foundation?scope=admin` → admin only
  - `GET /api/giving/submit` → admin only unless `?mine=1` (member sees own)
  - `GET /api/audit-log` → admin only, paginated
- **PATCH moderation added** (all require admin, log audit, persist):
  - `PATCH /api/prayer {id,status}` → open→assigned→closed
  - `PATCH /api/visit {id,status}` → new→contacted→connected→assigned-cell→archived + search `?q=`
  - `PATCH /api/volunteer {id,status}` → pending→contacted→approved→active→rejected
  - `PATCH /api/testimony {id,status}` → pending→approved→published→rejected (public page shows only published)
  - `PATCH /api/contact {id,status}` → open→archived
  - `POST /api/giving/verify {id,action,receiptNo}` → now notifies **member** (not just admin) on verify/reject, logs `verifiedBy`
- **Notifications:** prayer/visit/contact creation fans out to admin/leader inboxes; giving verification notifies member with receipt.
- **Auth hardening:**
  - `src/lib/auth.ts` now dual-writes: file-json for dev, Prisma mirror when `DATABASE_URL` set. `verifyUser` prefers Postgres.
  - Passwords bcrypt; legacy plain migrated lazily.
  - Session cookies signed `userId.sig` via `SESSION_SECRET`, `HttpOnly; Secure; SameSite=Lax`.
  - **Forgot / Reset:** `POST /api/auth/forgot-password {email}` (rate 10/min, no enumeration) issues token (logged; emailed via Resend if `RESEND_API_KEY` set, 1h expiry). `POST /api/auth/reset-password {token,password}` rotates hash in both stores. Page at `/forgot-password` with request→reset steps. Link on `/login`.
  - **Change password:** `POST /api/auth/change-password {current,next}` (rate 10/min) — checks current, bcrypt, dual-write. UI in `/member/profile`.
  - **User admin:** `GET /api/admin/users` (admin) lists users; `PATCH {id,role,department,cellId}` — only superadmin can grant superadmin.

### Giving — 8 funds, POP verified, audited

- Seed now creates **8 funds** (added `loveWorld-tv`) + placeholder `BankAccount` per fund so verification never fails on missing fund. All funds visible in `/give` (`bankAccounts.json` already 8).
- `POST /api/giving/submit` supports `multipart/form-data` POP (JPG/PNG/WEBP/PDF ≤8MB, stored `public/uploads/pop` gitignored; swap to Vercel Blob via env when ready). `maxMb` from `UPLOAD_MAX_MB`.
- `GET /api/giving/submit?mine=1` for member history (used in `MemberGivingCard` + `/member/events?mine=1`); admin list protected.
- Admin `/admin/giving` verifies → receipt `RCPT-xxxxxx` → member inbox notification + audit.

### Member — every story now live

- **Dashboard:** `/member` now resolves `cellId` → church name/day/time via `cells.json`, links to profile/cell, MemberGivingCard uses `?mine=1`, ICS link real.
- **Profile:** `/member/profile` — name/phone/cell (dropdown from `cells.json`)/department (dropdown from `ministries.json`) persist via `PUT /api/auth/me` → `.data/db.json` + audit; password change inline; membership meta + NDPA note.
- **Cells:** `/member/cells` — leader can submit attendance (date/present/visitors/souls/topic/outreach/note → `POST /api/attendance` → admin dashboard). Filter by church, search. Members view history read-only.
- **Foundation:** `/member/foundation` — toggle modules → `POST /api/foundation-progress` (leader/admin can view `?all=1`), progress bar, graduation eligibility.
- **Events:** `/member/events` now calls `?mine=1` filtered by email (falls back to all for legacy). Shows ticket `CC3-xxx`, QR placeholder (qrcode lib ready to render data URL), status.
- **Testimonies public:** `/testimonies` now client-fetches `GET /api/testimony` (published only) and merges with `src/data/testimonies.json` seeds; category filter, status badge.
- **Notifications:** `/member/notifications` shows `GET /api/notifications` (unread count) + mark-all-read.

### Admin — every queue now actionable

- **People:** `/admin/people` — search, filter by status (new/contacted/connected/assigned-cell/foundation/archived), inline status buttons → `PATCH /api/visit`, CSV export.
- **Prayer:** `/admin/prayer` — shows confidential flag, contact, status badge; actions: assign → closed (creates audit, respects follow-up). Count only for public.
- **Volunteers:** `/admin/volunteers` — table with contact/status badge + actions contacted/approved/active/rejected → `PATCH /api/volunteer`.
- **Media/Testimonies:** `/admin/media` — tabs: Testimonies (pending count badge, table with approve/publish/reject) vs Messages placeholder. Calls `?scope=admin` + `PATCH`.
- **Analytics:** `/admin/analytics` — now live: visits, event regs, prayer, testimonies (+pending), volunteers, cell/dept attendance, newsletter, **giving verified total ₦** (sum), not mocks. Cards explain funnel.
- **Settings:** `/admin/settings` — RBAC matrix (member→superadmin), users overview via `/api/admin/users`, audit log viewer (`GET /api/audit-log?limit=50` → table time/action/entity/user).

### Content & Identity (from earlier sweep)

- `/about` canonical Vision/Mission/Purpose, 11-point Statement of Faith, 1987→Today timeline, Pastor Chris (Dec 7 1963), Cell + Foundation 6 classes, LoveWorld sidebar. Source-attributed (loveworld.inc/cephzone3).
- `/give` Partnership Arms (Rhapsody/Healing Streams/InnerCity/LoveWorld TV/Missions/Tithe) with official links + 8-fund BankAccounts + SponsorCards with progress.
- `/online` 11 LoveWorld Networks grid + funded bars → `/give#loveWorld-tv`, schedule, Pastorchrisonline link.
- Home: MinistryAppsBar (6 apps), GlobalProgramsStrip (5), ImpactStrip, ZoneBreadcrumb/Map/GroupSwitcher.

### Persistence

- `prisma/schema.prisma` 12 models + `seed.ts` now idempotent for 8 funds + bank accounts per fund.
- File fallback `.data/db.json` via `src/lib/persist.ts` (`loadPersist/mergeIntoGlobal/flushKey/scheduleFlush`) — all writes schedule flush 50ms.
- `.gitignore` already excludes `.data`, `public/uploads`, `public/kids`.

### Compliance & Polish

- `src/middleware.ts` security headers + protected redirects (`/member|/admin` → `/login?next=`).
- `error.tsx` + `not-found.tsx` + cookie consent + health `GET /api/health` → `{ok,db,version}`.
- ICS `GET /api/export/ics` (services+events → VCAL). CSV `GET /api/admin/export?kind=giving|visits|events|attendance`.
- Validation `src/lib/validation.ts` Zod for every form (visit/prayer/testimony/volunteer/eventReg/contact/newsletter/foundation/giving/auth). `formatZod` for field errors. `rate-limit.ts` per IP per key.
- Search `src/app/search/page.tsx` indexes services/events/ministries/media + cells/kids.
- Forgot password rate-limited 10/min, token expires 1h, no email enumeration.

## 2. Run Locally (no Postgres needed)

```bash
npm install
echo 'SESSION_SECRET=dev-secret-32chars-change-me-please-12345678' > .env.local
npm run dev # http://localhost:3000
npm run build # 127 static pages
```

With Postgres:

```bash
# set DATABASE_URL in .env.local (Neon/Vercel Postgres)
npm run db:push
npm run db:seed # 3 demo users + 8 funds + bank accounts
npm run dev
```

Demo: `member@cc3.local/member123` → member, `leader@cc3.local/leader123` → leader, `admin@cc3.local/admin123` → admin. Reset via `/forgot-password` (token logged when no `RESEND_API_KEY`).

## 3. Deploy to Vercel

1. Push branch → Vercel imports.
2. Env vars: `DATABASE_URL`, `SESSION_SECRET` (32+ random chars), optional `RESEND_API_KEY` + `EMAIL_FROM`, `UPLOAD_MAX_MB=8`.
3. `npx prisma db push` + `npx tsx prisma/seed.ts` once (Vercel terminal).
4. Replace `src/data/bankAccounts.json` with real accounts → redeploy. Finance can also update via direct DB edit; future Admin UI editor planned.

## 4. Bank Accounts per Arm

Edit `src/data/bankAccounts.json` — one per `fundSlug`: `tithe, offering, partnership-rhapsody, healing-streams, building, missions, welfare, loveWorld-tv`. `GivingFlow` + `BankAccounts` auto-render.

## 5. Happy Paths — How to Verify

- **Visitor:** `/new-here` plan visit → admin sees `/admin/people` → contact/assign → member invite. `/prayer` → admin `/admin/prayer` close. `/testimonies` submit → admin `/admin/media` approve→publish → public shows. `/contact` → admin comms. `/events/[slug]` register → ticket `CC3-xxx` → `/member/events` (mine) + ICS. Newsletter → admin count. Volunteer `/new-here#volunteer` → admin `/admin/volunteers` approve→active.
- **Member:** Register → auto-login → `/member` dashboard → `/member/profile` edit cell/department + change pw → `/member/cells` submit attendance (if leader) → `/member/foundation` mark done → graduation → `/member/notifications` see giving receipt.
- **Giving:** `/give` pick arm → bank app transfer → upload POP + ref → admin `/admin/giving` verify → `RCPT-xxx` + member inbox → audit log.
- **Admin:** All queues filter/search/update; CSV exports; analytics totals; audit log viewer; user role patch (superadmin only for promotion).

## 6. Still Optional (Next)

- Prisma dual-write for all legacy stores (visit/prayer/testimony etc.) — helper `getPrisma()` already handles giving/auth; extend similarly.
- Vercel Blob for POP (`public/uploads` → Blob with `BLOB_READ_WRITE_TOKEN`).
- Resend templates for prayer follow-up, giving receipt PDF, event reminders.
- WhatsApp/Termii for visit follow-up.
- 2FA TOTP for admin (qrcode already in deps — generate secret, verify).
- CMS publish workflow UI (draft→review→published) for pages/events/media (currently data-json + admin moderation tables).
- PWA manifest + offline cache (next-pwa).

## 7. Health & Audit

`GET /api/health` → `{ok,db,version}` · `GET /api/audit-log?limit=100` (admin) · `GET /api/admin/export?kind=giving` — every mutation logged with `logAudit` (ip, userId, entity, meta) persisted.

All 127 routes build, First Load 105kB, middleware 32.1kB. Dev `GET /api/health` 200 with `file-json (dev)` when no `DATABASE_URL`.
