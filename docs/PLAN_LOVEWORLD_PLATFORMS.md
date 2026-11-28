# Plan: Introducing the LoveWorld Platforms — CC3's 4 Church Websites (per Areas of Concern)

> Branch `arena/ef4e301e-cc3kidz` · Planning doc (no code yet) · Follows `docs/PLAN_WHOLE_SITE_CC3.md` conventions.
> Scope: **Main Church (`/`)**, **Children Church (`/kids`)**, **Teens (`/teens`)**, **Youth (`/youth`)** — the 7 group churches (`/churches/[slug]`) inherit the Main plan automatically.
> Standing constraints honoured: Children Church design untouched (additions only, existing kid classes), heavy effects minimized on mobile, contextual header/footer, announcements never directly above navbar, link-out only (we never republish Pastor Chris/LoveWorld content).

---

## 1. Goal

Every CC3 page should hand each visitor — child, teen, youth, adult — the **right LoveWorld platform for their season of life** ("area of concern"), in the right place, without cluttering the church site or breaking the design systems we've already tuned.

One central data source, one light component family, four contextual placements.

## 2. Guiding principles

1. **Link-out first** — CC3 never embeds heavy iframes or republishes devotionals. We deep-link to official platforms with descriptive cards ("Open Official →" pattern already established on `/youth/rhapsody`).
2. **One source of truth** — `src/data/loveworld-platforms.ts` exports a typed list tagged by audience; every church page filters its own slice. No duplicated link soup.
3. **One component family** — `PlatformCard` (single card), `PlatformStrip` (horizontal chip row), `PlatformHub` (grid section). Static, zero-JS links; lazy images; no WebGL/scroll effects inside these sections.
4. **Placement respects the flows we fixed** — platforms appear *after* the hero value sections (never above navbar), matching the announcement-bar rules; kids additions go inside existing sections using existing `.kids-scope` styles.
5. **URL confidence gate** — every official URL marked ✅ (seen/used) or ⚠️ (verify before merge). A tiny `scripts/check-platform-links.mjs` (P5) will curl-status all of them so the PR shows link health.

## 3. Platform inventory (with official URLs)

| # | Platform | Official URL | What it is | Audience tag |
|---|----------|--------------|------------|--------------|
| 1 | Rhapsody of Realities | ✅ `rhapsodyofrealities.org` | Adult daily devotional, 8000+ languages | main, youth |
| 2 | Rhapsody Bible (app) | ⚠️ `rhapsodybible.org` | Free Bible + devotional app | main, youth |
| 3 | TeeVo | ✅ `teevotogo.org` / `teevo.org` (both already linked) | Teens devotional by Pastor Chris | teens |
| 4 | TeeVo Club | ✅ `teevotogo.org/teevo-club/` (already linked) | Teen-led school outreach clubs | teens |
| 5 | Teens Rhapsody Wonders | ✅ `teevotogo.org/trwc/` (already linked) | Annual teens miracles conference | teens |
| 6 | Affirmation Train | ✅ `affirmation-train.org` | Daily faith affirmations & talking sessions | teens, youth |
| 7 | LoveWorld Teens Ministry (TAP / ITPLC) | ⚠️ `loveworldteensministry.ca` (TAP/ITPLC art already on site) | Teens ministry hub, Teens Advance Partners | teens |
| 8 | Global Youth Leaders' Forum (GYLF) | ✅ `globalyouthleadersforum.org` (+ `gylf.org` mentorship center) | Youth leadership training network | youth |
| 9 | Campus Ministry / Campus Connect | ⚠️ via GYLF site | Campus evangelism & student cells | youth |
| 10 | ReachOut World | ⚠️ `reachoutworld.org` (already announced in `site.ts` ann-2) | Global Rhapsody distribution campaign | main, youth |
| 11 | Healing Streams TV | ✅ `healingstreams.tv` (already in `site.ts`) | Live healing services with Pastor Chris | main, youth |
| 12 | Enter the Healing School | ⚠️ `enterthehealingschool.org` | Healing school sessions & testimonies | main |
| 13 | PCDL — Pastor Chris Digital Library | ✅ `pcdl.co` (already linked) | Sermon/message library | main, youth |
| 14 | Pastor Chris Online | ✅ `pastorchrisonline.org` (already in `site.ts`) | Digital ministry hub | main |
| 15 | KingsChat | ✅ `kingschat.online` (already in `site.ts`) | LoveWorld social platform | main, youth |
| 16 | LoveWorld TV Ministry | ✅ `loveworldtelevisionministry.org` (already linked) | TV networks & live broadcasts | main |
| 17 | LoveWorld News | ⚠️ `loveworldnews.org` | Ministry news & testimonies | main |
| 18 | InnerCity Mission | ⚠️ `theinnermission.org` | Children's humanitarian arm | main |
| 19 | LoveWorld Books / Bookstore | ✅ `loveworldbooks.org` / `loveworldchristianbookstore.com` | Book resources | main |
| 20 | Rhapsody for Early Readers / SuperKids | ⚠️ via `rhapsodyofrealities.org` family | Beginner-reader devotional | children |
| 21 | LoveWorld Children's Ministry TV | ⚠️ via `loveworldtelevisionministry.org` | Kids TV programs & songs | children |

*(✅ = domain already used or directly confirmed this session; ⚠️ = to verify with the P5 link checker before merge.)*

## 4. Areas of concern → platform mapping

| Church | Ages | Area of concern (ministry focus) | Platforms introduced |
|--------|------|----------------------------------|----------------------|
| **Main** `/` | all | Congregational maturity, healing, global vision, partnership | Rhapsody, Rhapsody Bible, Healing Streams, Healing School, Your-LoveWorld-type specials via TV Ministry, PCDL, Pastor Chris Online, KingsChat, LoveWorld News, InnerCity Mission, ReachOut World, LoveWorld Books, Foundation School (internal `/foundation-school`) |
| **Children** `/kids` | 4–12 | Salvation foundations, Bible fun, parent trust, reading | Rhapsody Early Readers/SuperKids card, Children's Ministry TV (songs/stories), parent guidance card — **added inside existing sections only** |
| **Teens** `/teens` | 13–19 | Identity, academic excellence, daily Word habit, school clubs, talents | TeeVo (existing), TeeVo Club (existing), Wonders (existing), + Affirmation Train, TAP partnership, ITPLC, Teens Ministry hub |
| **Youth** `/youth` | 20–35 | Purpose & leadership, campus/career, evangelism, partnership | Rhapsody (existing at `/youth/rhapsody`), Rhapsody Bible, GYLF, Campus Connect, ReachOut World (ties into R.I.S.E.), Affirmation Train, PCDL, Healing Streams volunteer, KingsChat community |

## 5. Where exactly — page-by-page placement

### 5.1 Main Church (`/`) — "LoveWorld Platforms Hub"
- **New section** after the Media/Sermons area (below existing value sections, above footer), built with `PlatformHub` — a 12-card bento grid mirroring the home bento style.
- Cards: Rhapsody (featured, gold), Healing Streams (live badge when near service time), PCDL, Pastor Chris Online, KingsChat, TV Ministry, LoveWorld News, ReachOut World (links to existing announcement context), InnerCity Mission, LoveWorld Books, Rhapsody Bible, Foundation School (internal link).
- The 7 group churches (`/churches/[slug]`) inherit this section via their shared layout component.
- Files: `src/data/loveworld-platforms.ts` (new), `src/components/PlatformHub.tsx` (new), `src/app/page.tsx` (insert section), `src/app/churches/[slug]/layout` hook-in if a shared slot exists.

### 5.2 Children Church (`/kids`) — gentle additions inside existing sections
- **Kiddies Rhapsody panel** (the centralized "Kiddies Rhapsody — Today" block, `src/app/kids/page.tsx:~138`): append one small card *"Rhapsody for Early Readers"* linking to the official early-readers platform — styled with existing `kids-panel` classes, no new CSS, design preserved.
- **Parents section**: one card *"LoveWorld Children's Ministry TV"* (songs & Bible stories) under the parent-trust copy.
- Nothing else moves; voice reader stays; zero new effects.
- Files: `src/data/loveworld-platforms.ts` (children slice), `src/app/kids/page.tsx` (2 card insertions), no CSS changes.

### 5.3 Teens (`/teens`) — complete the teens platform family
- **TeeVo Daily section** (existing): add an `Affirmation Train` mini-card next to the existing TeeVo Club / TeeVo Bible / Foundation School row (same `lw-card` horizontal pattern).
- **New `PlatformStrip`** "LoveWorld Teens platforms" placed after the "Teens Church — in pictures" slider, before Cells: TAP (partner), ITPLC (leaders' conference), Teens Ministry hub, Affirmation Train — 4 compact cards, `lw-card` styling.
- `/teens/word` (Word Centre): add Affirmation Train + Wonders links to the existing "Start here" checklist card.
- Files: `src/app/teens/page.tsx`, `src/app/teens/word/page.tsx`.

### 5.4 Youth (`/youth`) — leadership & outreach platforms
- **New `PlatformHub` (compact, 6 cards)** "LoveWorld Youth platforms" after the "Youth Church — In Pictures" slider, before Visit: GYLF (featured), Campus Connect, Rhapsody Bible, ReachOut World (paired with R.I.S.E. copy), Affirmation Train, KingsChat.
- `/youth/word` (Word & Spirit): PCDL + Rhapsody Bible deep links appended to existing resource list.
- `/youth/rhapsody`: already links official — add Rhapsody Bible app badge row (2 links max).
- `/youth/rise`: ReachOut World banner card feeding the R.I.S.E. outreach narrative.
- Files: `src/app/youth/page.tsx`, `src/app/youth/word/page.tsx`, `src/app/youth/rhapsody/page.tsx`, `src/app/youth/rise/page.tsx`.

### 5.5 Contextual footer (finishing touch)
- Footer (already contextual): add a 4th link column or a compact chip row "LoveWorld Platforms" filtered by scope (Main → adult platforms; Teens → TeeVo/Affirmation/TAP; Youth → GYLF/ReachOut/Rhapsody; Kids → SuperKids). Chips, not links soup — max 6 per scope.
- Files: `src/components/Footer.tsx` (uses the same data file).

## 6. Architecture

```
src/data/loveworld-platforms.ts     ← single typed source of truth
  export type Platform = { id, name, url, urlAlt?, audience: ('main'|'children'|'teens'|'youth')[],
                           blurb, icon (emoji/img), featured?, badge? ('LIVE'|'PARTNER'|'FREE APP'), cta }
  export const platforms: Platform[]
src/components/PlatformCard.tsx     ← one card (a-tag, no JS; img lazy; external icon)
src/components/PlatformStrip.tsx    ← responsive chip/card row (grid on mobile = 1-col)
src/components/PlatformHub.tsx      ← full grid section w/ heading slot
scripts/check-platform-links.mjs    ← P5: curl HEAD-status every URL, fail PR on non-200/301
```

Rendering rules: no client components needed (static links) → zero JS cost; images lazy; LIVE badge on Healing Streams is server-time based (no interval timers on mobile).

## 7. Phases & acceptance criteria

| Phase | Work | Accept |
|-------|------|--------|
| **P1 — Data + components** | `loveworld-platforms.ts`, `PlatformCard/Strip/Hub`, README of rules | build passes; components render in isolation on a scratch route removed before merge |
| **P2 — Main hub** | Home section + group-church inheritance | curl `/` shows hub after media section; group pages inherit; 105kB first-load unchanged |
| **P3 — Teens** | Affirmation card + teens strip + word-centre checklist | curl `/teens` order: pictures → platforms strip → cells; `lw-card` styles reused |
| **P4 — Youth** | Youth hub + word/rhapsody/rise enrichments | curl `/youth` order: pictures → platforms → visit; R.I.S.E. pairs with ReachOut |
| **P5 — Kids + footer + link checker** | 2 kids cards (design untouched), footer chips, `check-platform-links.mjs` wired into CI | kids visual diff = only 2 new cards; all ⚠️ URLs resolved ✅ or dropped; footer contextual per scope |
| **P6 — Polish** | Live badge timing, SEO (platform names in page descriptions), sitemap unaffected (external links only) | build 298 pages; mobile: no new JS, no new effects |

## 8. Risks & guardrails

- **Link rot** (⚠️ domains): link checker gates the merge; any 404 platform is dropped, not guessed.
- **Clutter**: hard caps — Main 12, Youth 6, Teens 4+1 row, Kids 2 cards, Footer ≤6 chips per scope.
- **Kids design bleed**: only existing `.kids-scope` classes; cards appended inside existing panels; no new CSS file for kids.
- **Mobile perf**: static anchors, lazy images, no autoplay/arrows/dots in platform components (ChurchSlider stays for photos only).
- **Announcement-flow rule respected**: no platform section within the first two sections of any page.
- **Copyright**: blurbs are our own words; devotional content always links out ("Source:" pattern already used on `/teens/word`).

---

*Ready for `yes` — implementation starts at P1 with the data file and component family.*
