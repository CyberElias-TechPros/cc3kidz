# Plan: Whole-Site Research & Build — CC3 Group (Main + Kids + Teens + Youth)

> Toolchain: `WorldFlowAI/everything-claude-code` cloned to `/tmp/everything-claude-code` (432485b, 13 skills, 9 agents, 4 rule sets). Using its **planner → architect → tdd → code-review → security-review** loop. This doc is the `/plan` output, awaiting your `yes` before any code.

## 0. What you installed

`everything-claude-code` is **not** a standalone AI that auto-builds sites. It's a Claude Code plugin pack — battle-tested agents/skills/hooks from an Anthropic hackathon winner. What you get:

- **Agents**: `planner`, `architect`, `tdd-guide`, `code-reviewer`, `security-reviewer`, `build-error-resolver`, `e2e-runner`, `refactor-cleaner`
- **Skills**: `coding-standards`, `frontend-patterns`, `backend-patterns`, `security-review`, `tdd-workflow`, `verification-loop`, etc.
- **Rules**: `security.md`, `coding-style.md`, `testing.md`, `git-workflow.md`
- **Commands**: `/plan`, `/tdd`, `/code-review`, `/build-fix`, `/verify`

**Installed now**: `git clone --depth 1 https://github.com/WorldFlowAI/everything-claude-code.git /tmp/everything-claude-code`. No global `~/.claude` mutation done (Arena sandbox is ephemeral). All planning below follows its `planner.md` template: Requirements → Architecture → Phases → Tests → Risks.

---

## 1. Requirements restatement

Build/maintain the **single Next.js 15.1.6 repo `CyberElias-TechPros/cc3kidz`** that serves:

1. **Main church** (`/`) — LoveWorld Nation → PH Zone 3 → CC3 Group → Central Church 3 (30B Rumuokwuta, Pastor Kelson Onoriode, Group Pastor & only Pastor at Group Church). Must handle first-time visitor → member → leader funnel; Sunday Service 8AM, Mon Prayer & Prophecy 6PM, Wed Midweek 5:30PM; cells, departments, Foundation School, giving, testimonies, prayer, media.
2. **7 Group churches** (`/churches/[slug]` + `/group` directory) — each a full clone of main layout with church-specific pastor/address/times/cells, 9 pages each (63 SSG pages).
3. **Kids Church** (`/kids`) — 12 pages, Fredoka/Poppins, `.kids-scope` isolated CSS, no bleed.
4. **Teens** (`/teens`) & **Youth** (`/youth`) — Taste/Swiss visuals, taste-hero, shared MinistryFamilyBar.
5. **Member portal** (`/member`) + **Admin** (`/admin` 12 modules: cells, cms, giving, prayer, etc.) backed by Prisma + Postgres (User, Visit, Prayer, Testimony, Volunteer, etc.).
6. **Ops**: responsive, SEO (sitemap/robots), performance (105kB First Load), accessibility, safeguarding, offline-ready assets, LoveWorld brand fidelity, Pastor Chris voice.

**Recent corrections already shipped** (branch `arena/ef4e301e-cc3kidz` @ `6cf44b2`):
- Pastoral: Central Church 3 IS Group Church HQ; only Pastor Kelson Onoriode (removed Victor/Grace, Daniel/Joy, Michael).
- Services: `Sunday Celebration → Sunday Service`, removed Friday Prayer (Monday Prayer & Prophecy is the meeting).
- Font: `Nunito Sans → Plus Jakarta Sans` (bolder rounded official, scoped to `.font-display`).
- CSS: fixed invalid `--font-.kids-scope` and global `h1` leak that broke Kids (now scoped).
- Churches: `/churches/[slug]` 63 pages with redirects `/group/:slug → /churches/:slug`.

---

## 2. Architecture review (research findings)

**Inventory** (current branch):

- **Routes**: `src/app` has 27 top-level segments; `admin` 12 subroutes; `api` 14 groups; `member` 10; `churches/[slug]` 9 pages ×7; `kids` 12; `teens` 9; `youth` 9; `services/[slug]` 5; `media/[slug]` etc. Total 216 SSG pages (`next build` ok).
- **Data**: 22 JSON files in `src/data` drive 90% of public UI (services, groupChurches, cells 92, leaders, ministries, events, history, etc.). Prisma handles transactional data (giving, visits, prayer).
- **Components**: ~80 in `src/components` — `Header`, `Footer`, `SiteShell` (excludes kids/admin), `HeroSlider`, `ZoneMap`, `GroupSwitcher`, `CellFinder`, `church/ChurchHeader+Nav`, `giving/*`, ministry bars.
- **Lib**: `site.ts` canonical config, `churches.ts` helpers, `dates.ts`, `auth.ts`, `prisma.ts`, `rbac.ts`, `validation.ts` (zod).
- **Styling**: `globals.css` (River Light & Ankara tokens), `kids-layout.css` (kl-hero etc), `kids/kids-*.css` scoped to `.kids-scope`, Tailwind 3.4.17, no stylelint config.
- **Scripts**: `scripts/sync-kids.mjs` runs on build.
- **Known gaps** (from `docs/FRONTEND_CRITIQUE.md`, `AUDIT_PASTOR_CHRIS_VOICE.md`, `SPEC_CC3_TEENS_YOUTH_COMPLETE.md`):
  - Teens/Youth still reference taste placeholders, not Taste+Swiss final mock (23cb242 partially done, youth word page still thin).
  - LoveWorld taxonomy (ReachOut, Healing Streams, Rhapsody) under-linked.
  - Giving flow has 4 bank accounts stubbed `0000000000`.
  - Search is `/search` stub (no index).
  - No e2e tests, no Playwright; lint ignores builds.
  - No image optimization for fbcdn (remotePatterns allowed but unoptimized false).
  - Accessibility: no skip-link on youth? TeensSubNav missing aria.

**Dependencies**: Next 15, React 19, Prisma 6.3, leaflet/react-leaflet for ZoneMap, qrcode, bcryptjs, zod. DB is `DATABASE_URL` Postgres; dev fallback is `file-json`.

**Risks already seen**: stale `.next` chunks after asset copy (`5994.js` outage), CSS scope regressions, diverging `ae47ce9` remote (needed rebase), `next` missing after fresh clone (requires `npm install`).

---

## 3. Plan — 7 phases, incremental, no breakage

### Phase 0: Guardrails (pre-flight)
1. **Lock toolchain** — pin `~/.claude` rules copy (security, git-workflow, testing) to repo `.claude/` for visibility; add `.claude/hooks.json` from everything-claude-code.
2. **Baseline metrics** — capture Lighthouse (perf/a11y/SEO), `next build` size, `npm audit`, `tsc --noEmit`, dead-code scan via `refactor-cleaner`.
3. **Evals harness** — add `tests/eval-harness` per skill: home render, cell finder, giving flow, kids gallery.

### Phase 1: Design System Consolidation
1. **Tokens audit** (`src/app/globals.css` + `kids-layout.css` + `teens/teens.css`): unify `--navy/--gold/--vermilion/--haze` usage; remove duplicate `--kl-*` that duplicates main tokens; document in `docs/DESIGN_TOKENS.md`.
2. **Typography lock** — Plus Jakarta Sans final (already), add `next/font` variant later to remove `<link>` FOUC; verify kids/teens isolation with visual regression (Playwright screenshot per route).
3. **Component inventory** — extract `SectionHeading`, `Card`, `Eyebrow`, `Timeline` to `src/components/ui/` with Storybook-ish `examples/` preview; enforce via `coding-style.md` (max 50 lines/fn, no deep nesting).

### Phase 2: Main Church Hardening
1. **Home (`/`)** — apply `FRONTEND_CRITIQUE` fixes: hero kicker, feature grid icons, services sticky image alt already fixed, testimonies real data, newsletter wiring to `/api/newsletter`.
2. **About/Services/Pastors** — replace remaining “Impact” phrasing per `AUDIT_PASTOR_CHRIS_VOICE.md` table; ensure only Pastor Kelson on CC3 HQ card.
3. **Group/Churches** — complete church micro-sites: each of the 9 clones already scaffolded; add per-church ministries/events filtering (currently global), verify WhatsApp numbers are distinct (currently `8030003000` placeholder).
4. **Cells/CellFinder** — wire `cells.json` grouping by `churchId` + live ZoneMap leaflet markers; test JoinCellForm flow to DB.
5. **Content loops**: Prayer → Testimony → Visit forms fully backed by Prisma (already api/prayer, testimony, visit) + admin moderation + email notify.

### Phase 3: Kids + Teens + Youth completion
1. **Kids** — keep `.kids-scope` isolation; sync assets via `scripts/sync-kids.mjs`; finish `kids/kids-corner` and `lessons` pagination; add safeguarding footer already present.
2. **Teens** — finish Taste+Swiss: `teens/teens.css` already has taste-hero/taste-card; apply to `word`, `gifts`, `activities` stubs using `SPEC_CC3_TEENS_YOUTH_COMPLETE.md` mock.
3. **Youth** — same, plus R.I.S.E. outreach pages (`youth/rise`, `youth/word`, growth) fill with real curricula; reuse `TeensSubNav` with youth copy.

### Phase 4: Member & Admin depth
1. **Auth** — `bcryptjs` + session already; add RBAC checks per `lib/rbac.ts` to all `/api/admin/*`; add audit-log UI.
2. **Foundation School** (`/member/foundation` + `admin/foundation`) — wire `foundationModules.json` progress tracker; certificates via qrcode.
3. **Giving** — replace placeholder bank accounts with live `prisma.bankAccount` + POP verify flow; add partnerships arms UI; admin giving verify queue.
4. **Prayer/Testimony moderation** — status workflows `pending→approved→published` with assignment.

### Phase 5: Data & Performance
1. **Images** — move fbcdn covers to `/public/assets/images/cc3` already done for hero; enable `next/image` remote optimization (set `unoptimized:false` already, verify `images.remotePatterns`).
2. **Search** — build `/search` index over all JSON + DB testimonies/messages; add command palette (`/cmdk`).
3. **Maps** — lazy-load `react-leaflet` to cut 50kB; cache ZoneMap tiles.
4. **Build** — fix stale `.next` outage by adding `prebuild: rm -rf .next` after asset copy; enforce via hook `PostToolUse` matcher on `*.webp` copy.

### Phase 6: Quality Gates
1. **Tests** — `tdd-workflow`: unit for `lib/churches`, `lib/dates`, `lib/validation`; integration for visit/prayer/testimony POST; e2e Playwright journeys: visitor→cell, visitor→give, admin→approve.
2. **Security** — `security-review` skill: no hardcoded secrets, rate-limit on `/api/*`, CSRF on forms, sanitise testimony HTML.
3. **A11y/SEO** — sitemap.xml + robots.ts already; add JSON-LD for church + events; axe checks via `e2e-runner`.

### Phase 7: Launch readiness
1. **Content freeze** — replace all `803000300X` placeholders with real contacts per church; get sign-off on pastoral bios (Kelson sole pastor).
2. **Vercel** — envs (`DATABASE_URL`, `NEXTAUTH_SECRET`), cron for announcements expiry, domains (`cc3.example.com` → real), analytics.
3. **Docs** — update `README.md` with architecture diagram, `AGENTS.md` with delegation rules, `WORLDFLOWAI.md` with runbooks.

---

## 4. Testing strategy

- **Unit**: `lib/churches.getCellsForChurch`, `getPastorForChurch`, `dates.nextServiceDate`, `validation` schemas.
- **Integration**: POST `/api/visit`, `/api/prayer`, `/api/testimony` → Prisma; GET `/api/health`; `/churches/[slug]/*` SSG 63 counts.
- **E2E (Playwright)**: `welcome → new-here → visit → cell finder → join`, `give → POP → admin verify`, `kids → lessons → progress`, `teens/youth → word → growth`.
- **Visual**: screenshot ` / ` (hero), `/group`, `/churches/central-church-3`, `/kids`, `/teens` before/after token changes.

---

## 5. Risks & mitigations

- **RISK: Brand drift** (LoveWorld voice diluted) — Mitig: enforce `AUDIT_PASTOR_CHRIS_VOICE.md` as rule, add lexicon check hook.
- **RISK: CSS scope regression** (kids bleed, 5994.js outage) — Mitig: keep `.kids-scope` prefix, add `prebuild rm -rf .next` hook, visual tests.
- **RISK: Pastoral misrepresentation** (extra pastors at HQ) — Mitig: single source `groupChurches.json` `central-church-3` only Kelson; CI check count==1.
- **RISK: 216-page SSG bloat** — Mitig: incremental `next build`, share header/footer layout, image lazy-load.
- **RISK: Data split (JSON vs Prisma)** — Mitig: JSON for static content, Prisma for writes; never mix; document in `lib/store.ts`.

---

## 6. Success criteria (tick before merge)

- [ ] `npx next build` → 0 errors, 216 pages, First Load <110kB, Middleware 32kB
- [ ] All 7 churches ×9 pages respond 200; `/group/:slug` redirects 308
- [ ] Sunday Service / Mon Prayer & Prophecy / Wed Midweek reflected everywhere (no Friday)
- [ ] Plus Jakarta Sans loads with `font-display:swap`, no FOUC, kids still Fredoka/Poppins
- [ ] `/kids`, `/teens`, `/youth` pass axe a11y, no console errors
- [ ] Giving POP happy path + admin verify works end-to-end
- [ ] `code-review` & `security-review` agents sign off, 80% coverage on lib

---

## 7. Next step — awaiting you

This plan is **proposed only**. Per `commands/plan.md`, I **will not touch code** until you say:

- `yes / proceed` — execute phases in order
- `modify: …` — e.g., “skip Phase 3, do Phase 2 first” or “different font”
- `research deeper: …` — e.g., inventory just `/admin`

Reply with your choice and I’ll run the first agent (`planner → architect → tdd-guide`) under the everything-claude-code loop and keep `arena/ef4e301e-cc3kidz` green.
