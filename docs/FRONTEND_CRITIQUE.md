# CC3 Main Church Website — Design Critique & Proposal
> Skill applied: `frontend-design` from `anthropics/skills` (installed to `.claude/skills/frontend-design/SKILL.md`)
> Site: **Christ Embassy Central Church 3, Port Harcourt — CC3 Group / PH Zone 3 / LoveWorld Nation**
> Live: `http://127.0.0.1:3000/` (Next.js 15.1.6, dev `file-json`, commit `d21cdf0`)
> Date: 2026-11-23 — Crit by design lead, studio lens

---

## 0. Installation

```bash
git clone https://github.com/anthropics/skills.git /tmp/skills
mkdir -p .claude/skills/frontend-design
cp /tmp/skills/skills/frontend-design/SKILL.md .claude/skills/frontend-design/
# also staged: webapp-testing skill for future screenshot audits
```

Verification: `cat .claude/skills/frontend-design/SKILL.md | head -20` → `name: frontend-design` present.
All subsequent critique follows that skill's **plan → review against brief → build → critique** workflow and its anti-default guardrails.

---

## 1. Grounding: What Is This, For Whom, To Do What?

**Subject:** Not a SaaS, not a fintech, not a generic church template. A *LoveWorld Nation* church in Port Harcourt — charismatic, Word-and-Spirit, highly participatory (cells, departments, Foundation School, Rhapsody, Healing Streams), intergenerational (0–100, with dedicated `kids` + `teens` sub-sites), and embedded in a larger hierarchy (President → Zonal Pastor → Group Pastor → Resident Pastors).

**Audience in order:**
1. **First-time visitor** in Rumuokwuta/Orazi/GRA deciding Sunday 8am whether to walk in.
2. **New member** seeking next step (cell, Foundation School, department).
3. **Existing member** needing service times, giving POP, media messages, prayer.
4. **Leader/admin** routing 7 churches, 92 cells, outreach accounting.

**Primary job:** Convert anonymous interest into *bodily presence* (visit, join cell, attend). Secondary: sustain discipleship loop (Word → fellowship → serve → give → send).

> Skill principle: *ground designs in subject matter*. Port Harcourt is not Minnesota. The vernacular is: bold colour, celebration, riverine light, fabric (Ankara geometry), high-energy praise, not muted Scandi minimalism. LoveWorld's own editorial already leans Trajan/Cinzel + Gold — that's the right instinct; we keep it but push it further toward PH specificity.

---

## 2. What Already Works (Keep)

- **LoveWorld Editorial tokens** are coherent: `navy #10172B / gold #C6A04A / paper #FFFBF5 / sand #F5EFE6`, Cinzel (Trajan) + Montserrat + Outfit, `--radius-xl 1.25rem`, `shadow lifted`. This reads instantly as *ecclesial + premium*, not startup. Good — do not regress to generic indigo/purple church template.
- **Hierarchy made visible:** `ZoneBreadcrumb (LoveWorld → PH Zone 3 → CC3 Group)`, `MinistryAppsBar (Rhapsody/PCDL/KingsChat/CEFlix)`, `GroupSwitcher (7 churches)`, `ImpactStrip` — these teach the LoveWorld system instead of hiding it.
- **Real photos integrated:** hero now uses `fb.com/cc3phzone3` cover + 8 `scontent.fphc2` service photos, leaders use verified portraits (`pastor-chris 61k, linda 326k, kelson 22k`). No more AI placeholders — credibility restored.
- **Progressive disclosure:** `About` splits Vision/Mission/Purpose, Statement of Faith, History timeline, Leadership — exactly what a newcomer interrogates.
- **Accessibility floor is present:** `focus-visible: gold`, `sr-only skip link`, `semantic nav`, `backdrop-blur` header. Keep these.

---

## 3. What Reads as Templated Default (Critique per Skill)

The skill lists five AI-default clusters to avoid unless brief demands them. This site currently hits **three heavily**:

### 3.1 — Cluster 1: Warm-cream + terracotta/clay (partial hit)
- `paper #FFFBF5` + `navy + gold` *is* defensible for a church (not terracotta), but the **entire page is bathed in `paper→sand→white` wash** with navy only as hero/footer islands. Result: the middle 60% feels like a generic SaaS pricing page, not a Port Harcourt celebration. The skill warns: *"warm cream background with high-contrast serif display"* appears regardless of subject — here it's appearing regardless of a subject that should be *vivid*.

### 3.2 — Cluster 4: The SaaS-Card Kit (strong hit)
- Every section is `grid sm:grid-cols-2 lg:grid-cols-4 gap-6` → `card p-5/6` with identical `border: var(--line)` + `shadow: 0 4px 24px rgba(16,23,43,.06)` + `border-radius: var(--radius-xl)`.
- Events, ministries, testimonies, global programs, group churches, messages — all chopped into *identical rounded cards, one radius on everything, same soft grey shadow, gradient wash*.
- Skill: *"content chopped into identical rounded cards, one border-radius on everything regardless of hierarchy, same soft grey shadow under each"* — that's exactly here. It flattens hierarchy: a Sunday Miracle Service card has same visual weight as a generic "Media & Technical" ministry card.
- **Borders + pill overdose:** Count eyebrow labels: `Upcoming`, `LoveWorld Nation`, `Ministry Apps`, `PH Zone 3`, `Rhapsody 2.4k`, `7 Churches · One Group Family`, `Sunday Celebration · 8:00 AM • 3 hrs` — each is a `rounded-full bg-white/10 border`. The header alone has 9 pills + 9 nav pills. Skill flags: *"tracked-out ALL-CAPS eyebrow above every heading; meta strings joined with middle dots; labels as WORD — fragment"* — we hit all.

### 3.3 — Cluster 5: Template Chrome (strong hit)
- `GOD'S WORD. / GOD'S <gold>PRESENCE.</gold> / <gold>A LIFE OF IMPACT.</gold>` — accenting 2/3 headline words in gold. Skill's top typographic tell: *"accenting just a single word or phrase in a headline in different color"*.
- Eyebrows everywhere (`count: 12+ pages × 2 per section`), `text-[0.60rem] tracking-[0.14em] uppercase` — skill says *avoid unnecessary typographic labels above content*.
- `→` appended to every CTA (`Plan Your Visit →`, `View Details →`, `Meet all pastors →`) — skill's literal example of default chrome.
- `rounded-full` everywhere regardless of tone: a church's primary CTA should not have identical pill shape to a filter chip.

### 3.4 — Layout: Centre-Fade Hero (weak choice for brief)
- Navy hero with `radial-gradient(ellipse_at_top, rgba(198,160,74,.18))` + two floating white cards is the safe church-template hero. For a subject whose *most characteristic thing* is *congregation + worship + Port Harcourt light*, we hide the congregation behind a dark gradient and lead with typographic slogan. Skill: *"hero is first thing viewers see — open with most characteristic thing in subject's world"* — we violate it.

### 3.5 — Typography: Two Serif Display Faces Fighting
- `Cinzel` (600/700/800) + `Cormorant Garamond` (600/700) + `Montserrat` + `Outfit` = 4 families. `display: Cinzel, Cormorant Garamond, serif` declares two serifs as one token — they have contradictory x-heights and will fallback inconsistently. Skill: *"use one family or two, clearly distinct"* — we have 4.

### 3.6 — Other Issues
- **Hero image treatment:** `<img>` not `next/image` for FB CDN, `referrerPolicy no-referrer` hides provenance, and overlay `from-navy/40` dulls real crowd energy.
- **Testimonies as cards with `“body”`** — reads as marketing, not witness. No curation voice.
- **Footer `f / ig / yt` circles** are placeholder — socials in `site.ts` are `facebook: '#'` (broken).
- **Performance:** 6 Google Fonts weights (Cinzel 3 + Cormorant 2 + Montserrat 5 + Outfit 3) = ~180kb blocking, no `display=swap` optimisation beyond hack, no `next/font`.
- **Kids/Teens orphaned:** `btn--gold "Kids Church Ages 0-12 → /kids"` is buried as floating card, not a true intergenerational on-ramp.

---

## 4. Proposal: What Is *Best* For This Church

Per skill: *spend boldness in one place*. For CC3, boldness belongs to **Presence & Gathering** — the moment of congregation, not UI chrome.

### 4.1 Design Direction: “River Light & Ankara”

A distinctive point of view rooted in *Port Harcourt + LoveWorld*:

- **Colour — 6 tokens, no cream wash:**
  - `River Navy #0E1B33` (deeper, almost ink, not #10172B — holds gold better on mobile)
  - `Palm Gold #C8A24A` (keep, but use as *light*, not fill)
  - `Ankara Vermilion #E84C30` — *single* celebratory accent for Sundays/testimonies only (PH wrapper fabric, not SaaS clay). Used sparingly = memorable.
  - `Mangrove Ink #0A1222` (hero/footer true black-navy)
  - `Harbour Haze #EAF0F7` (cool off-white replacing warm `paper` — lets photos sing, less SaaS)
  - `Palm White #FFFFFF` (cards)
- Ratio: 60% Haze/White, 30% Navy/Ink, 10% Gold, 3% Vermilion (sparingly). No cream in default — cream becomes an *optional* testimonies texture.

- **Type — 2 families, intentional roles:**
  - **Display:** `Fraunces` (or keep `Cinzel` *alone*, 700/800 only) for liturgical headings. No Cormorant. Tight tracking `-0.02em`, `font-optical-sizing: auto`.
  - **Text/UI:** `Suisse Intl / Inter` (or `Outfit` alone, 400/600/800). Drop Montserrat (saves 40kb). One sans for body + UI = cohesion. `display` for hero + section titles only; everything else in Text.
  - Scale per *Elements of Typographic Style*: hero `clamp(2.6rem, 6vw, 4.2rem)` / 0.9 leading; body `16px / 28px`; labels not ALL-CAPS but `text-transform: none` + small caps where needed.

- **Layout — Editorial + procession:**
  - Left-aligned, never centre. Content width `1180px` stays, but hero becomes **asymmetric**: image 55% (processional congregation, no overlay), text 45% with *single* vertical gold rule (Ankara selvedge) instead of pill.
  - Sections alternate `Harbour Haze` vs `White` with *one* structural device per section, not same card grid every time:
    - **Services:** horizontal timetable (timeline) — not cards (it *is* a sequence).
    - **Ministries:** 2×4 editorial list with left rule, not 8 equal cards.
    - **Testimonies:** full-bleed quote block with large Fraunces pull-quote, not 3-card SaaS.
  - Border-radius hierarchy: hero `1rem`, cards `1rem`, chips `0.5rem` — not everything pill.
  - One motion moment: hero image parallax on load, then stillness. No per-card hover lift.

- **Principles:**
  1. *Presence over UI:* Let congregation photos, not gradients, carry emotion.
  2. *One gold, one red:* Gold for glory, Vermilion for celebration — never both at once.
  3. *Plain language:* “Sunday 8am” not “Celebration Service • 3 hrs”.
  4. *Proof over claim:* Show 92 cells map first, then explain.

### 4.2 Wireframes (ASCII, per skill)

**Hero — before (current):**
```
[Navy gradient full] [Text centre-ish] [Image 40% with 2 floating white cards + gold badge]
```

**Hero — proposed:**
```
+--------------------------------------------------------------+
| NAV  CE | Central Church 3  PH Zone 3   | Home About ... | Watch Live [Visit]
+--------------------------------------------------------------+
| |  River Light bar (2px gold vertical)  |  [PHOTO 55%]               |
| |  Sunday 8am                           |  Congregation procession,    |
| |  A LoveWorld family                   |  Harcourt light, no overlay|
| |  at 30B Rumuokwuta                   |  16:9 crop, Fraunces hero   |
| |  [Come this Sunday] [How to find us] |  credit: fb.com/cc3phzone3  |
+--------------------------------------------------------------+
```

**Services — before:** 3 equal `card` pills
**Services — proposed (timeline, because it IS a sequence):**
```
Sunday 8am ───●─── Wednesday 5:30pm ───●─── Friday 5:30pm (Prayer)
  Celebration      Midweek recharge       Intercession
```

**Testimonies — before:** 3 cards with `“body”`
**Testimonies — proposed:**
```
“ The pain left instantly. I am whole. ”  — Sister Grace E., Healing
  [Full-bleed Harbour Haze, 72px Fraunces, one vermilion rule]
```

### 4.3 Concrete Changes (Ranked)

**Must (week 1):**
1. **Kill SaaS-card monotony:** Give each section a distinct layout (timetable vs list vs quote). Keep `card` only for true objects (events with dates).
2. **De-pill:** Replace top 3 pill rows with single `Ankara rule` or plain text. Keep *one* eyebrow per page (hero only).
3. **Typography cut:** Remove `Cormorant Garamond` + `Montserrat` (saves ~60kb), keep `Cinzel 700/800` + `Outfit 500/600/700`, enable `next/font` with `display: swap`.
4. **Hero inversion:** Text left (45%), image right (55%), no navy wash, proper `next/image` with `priority` + `sizes`.
5. **Fix socials & attribution:** Real FB/IG/YouTube links, not `#`, and move `fb.com/cc3phzone3` from floating black pill to caption.

**Should (month 1):**
6. Swap `paper→Harbour Haze`, introduce Vermilion for Sundays only, audit all `rounded-full` → tiered radii.
7. Re-write CTAs as verbs: `Save changes` not `Submit` → `See Sunday details`, `Find my cell`, `Play testimony`.
8. Replace marquee (decorative) with **live cell map** as trust signal.
9. Intergenerational on-ramp: persistent `Kids / Teens` switcher in header, not hidden card.

**Could (next quarter):**
10. Add Rhapsody live reader (not just App Bar pills) — embeds distinctive LoveWorld IP.

---

## 5. Self-Critique of This Proposal (per skill)

- Does this still read as generic? Test: prompt “design a church in Lagos” — I would *not* propose Vermilion + River Navy for Lagos (which wants lagoon teal); for PH riverine, Vermilion is specific. Pass.
- Is Vermilion too risky? Yes if overused. Mitigation: limit to 3% surface, only Sundays/testimonies. If rejected, fallback to Gold-only but keep Haze wash.
- Am I keeping one bold place? Yes: **hero image as light**, not UI. Everything else quiets.

---

## 6. What to Build Next

1. Implement token swap (`globals.css` + `tailwind.config.ts`) and header de-pilling (single PR).
2. Rebuild `src/app/page.tsx` hero + services timetable + testimonies quote.
3. A/B with current in Playwright (when cdn.playwright.dev whitelisted) or Lighthouse + user test with 5 first-timers at 30B Rumuokwuta.

> **Bottom line:** Keep LoveWorld's editorial authority (Navy/Gold/Cinzel), but trade SaaS-cream + pill + card monotony for *River Light + one celebratory red + editorial asymmetry* — a design that could only be this church in this city, not any template from the gallery.

---
*Skill reference: `frontend-design/SKILL.md` — “Approach this as design lead at studio known for giving every client distinct visual identity… Spend boldness in one place.”*
