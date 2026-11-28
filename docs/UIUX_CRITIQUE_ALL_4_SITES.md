# UI/UX Critique — All 4 CC3 Sites (Main · Children · Teens · Youth)

> Date: 2026-11-28 · Branch tip `588dabb` · Evidence cited as `file:line` from the live build.
> Method: full code + rendered-HTML audit of every section, token check, WCAG contrast math, mobile-breakpoint analysis, cross-site consistency pass.
> Tone: brutal on purpose. What's good is listed once per site; everything else is what's wrong.

---

## 0. Executive summary — the 10 things a visitor notices before anything else

1. **Teens page contradicts itself four times about when it meets.** Hero pills: "Sundays 8AM · Wednesdays 6PM". Footnote under Upcoming: "Sundays 10:00AM · Wednesdays 7:00PM". Parents section: "Wednesdays 7PM Fellowship Hall". Contextual footer: "Sunday 8AM · Wednesday 6PM". A parent deciding whether to bring a 14-year-old gets four answers. This is the single worst trust-killer on the site.
2. **Youth's signature serif font is never loaded.** `youth.css:37,65,87` all specify `'DM Serif Display', Georgia, serif` — but no `<link>`, no `next/font`, no import anywhere loads it. Every "editorial serif" headline on `/youth` silently renders in **Georgia**. The whole Swiss look the page was designed around is broken and nobody noticed.
3. **Two different golds and two different navys ship on sibling pages.** Global/gold `#C6A04A` + navy `#0E1B33` (main, teens, footer, platform system) vs youth's hardcoded `#C6A66B` + `#0F172A`. Navigate `/teens` → `/youth` and the brand shifts by a few degrees — enough to feel "off" without knowing why.
4. **Gold-on-white text fails WCAG everywhere it's used as copy.** `#C6A04A` on `#FFFFFF` = **2.46:1** (needs 4.5). Youth's "UPCOMING EVENTS"/"LOVEWORLD PLATFORMS" eyebrows, gold link text, `lw-trust` star accents — all fail. Vermilion `#E84C30` on white = 3.81:1 — also fails for normal text.
5. **Youth's upcoming events are stale and fake.** "OCT 18", "OCT 25", "NOV 08" — hardcoded, no year, first two already in the past (today: Nov 23, 2026), no links to `/youth/events`, photos don't match event names (choir photo on "CC3 Night").
6. **Reduced-motion is honoured in exactly one of 5552+ lines of kids CSS and nowhere else.** Kids has a `prefers-reduced-motion` guard; the main, teens, youth scopes have zero — while running WebGL shaders, autoplaying crossfade sliders, a bouncy help button and hover lifts. Vestibular users get motion on every page.
7. **408KB hero image.** `youth-arena-crusade.jpg` is the youth hero slider's first slide — unoptimized JPEG in an `<img>` tag, no `next/image`, no srcset. On a 3G phone in Port Harcourt that's the LCP element.
8. **The announcement bar's dismiss forgets itself.** `AnnouncementBar.tsx:8` keeps dismissal in `useState` only — no localStorage. Close it, navigate, it's back. Users will stop seeing the bar as UI and start seeing it as pop-up spam.
9. **The main church's font identity quietly collapsed.** The Nov-23 critique praised the "Cinzel (Trajan) + gold ecclesial" system; root layout now maps `--font-display` to **Plus Jakarta Sans** (`layout.tsx:47`), and every `var(--font-display), serif` declaration across the site resolves to that one sans. Four sites, zero display-font contrast, and a design decision nobody actually made.
10. **Inline-style anarchy.** Home: **114** inline `style={{}}` blocks. Teens: **58**. Kids: 22. Youth: 8. The same pill/chip/badge recipe (`.62rem · 800 · uppercase · 999px`) is copy-pasted with magic numbers dozens of times instead of being a class. Every future brand change is now a find-and-replace hunt across 400 style props.

---

## 1. Systemic issues (all four sites)

### 1.1 Brand tokens drift — the multi-site system has no single source of truth
- `globals.css:7-10` declares navy `#0E1B33` / gold `#C6A04A`. Teens re-declares its own copies (`teens.css:2-12` — same values, fine). **Youth invents new ones** (`youth.css`: `#0F172A`, `#C6A66B`). Footer/platform components use globals. Result: three navy-gold palettes in one domain.
- Teens adds `--ce-violet:#6B5BFF` and `--ce-teal:#00B6A0` used once each (pill, icon) — accents that exist nowhere else in the brand. They read as imported from another project.
- The TeeVo panel gradient runs to `#2B3EAA` — a bright blue that matches nothing else on the site.
- **Fix:** one `tokens.css` consumed by all scopes; per-scope accents only as *documented* overrides.

### 1.2 Typography — four systems, one accidental
- Main: Plus Jakarta Sans everywhere (after the `--font-display` collapse) — clean but monotone; headings and body differ only by weight.
- Kids: Fredoka + Poppins (loaded via `<link>` inside `<body>` in `kids/layout.tsx:11-19` — should be `next/font`; also duplicated with root's Google Fonts link = three font CDNs).
- Teens: `var(--font-display)` (= Plus Jakarta) with `font-weight:900` — the "serif cathedral" intent in comments is not what renders.
- Youth: DM Serif Display — **never loaded** (renders Georgia).
- Heading scale is arbitrary: teens H1 `clamp(2.4→3.9rem)`, main H1 `clamp(2.8→5rem)`, youth title `clamp(2.8→4.4rem)`, kids unmeasured. No shared type ramp.

### 1.3 Motion without mercy
- WebGL shader in main + teens + youth heroes; ChurchSlider autoplay crossfades (4.8–6s); bouncy `FloatingHelpButton`; hover lifts on cards; scale-on-hover event images.
- `prefers-reduced-motion` exists **only** in `kids-animations.css`. ChurchSlider doesn't check it (`ChurchSlider.tsx:31-37`). The bouncy help button doesn't check it.
- Slider autoplay also can't be paused by keyboard users (no pause button; only hover-pause on desktop).
- **Fix:** global `@media (prefers-reduced-motion: reduce)` kill-switch + a pause control on autoplaying sliders.

### 1.4 Contrast failures (measured)
| Pair | Ratio | Where | Verdict |
|---|---|---|---|
| gold `#C6A04A` on white | 2.46 | youth eyebrows, gold text links, teens `.lw-trust span`, platform `badge--free-app` borderless gold text | **Fail AA (4.5)** |
| white on gold `#C6A04A` | 2.46 | any white-on-gold button text | **Fail AA** |
| vermilion `#E84C30` on white | 3.81 | teens event category text, warning accents | **Fail AA normal text** |
| `#64748B` on white | 4.76 | body copy everywhere | Pass, barely — don't lighten |
| navy on gold | 6.97 | primary CTAs | Pass |

### 1.5 Chrome & flow inconsistencies
- **Announcement double-stack on /teens:** the global `AnnouncementBar` + `TeensAnnouncement` render back-to-back (`teens/page.tsx:100-101`) — two banners stacked with different visual languages. Same on youth.
- **Dismissal not persisted** (see exec #8).
- **Kids is walled off:** `SiteShell` excludes `/kids` from main chrome, KidsNav/KidsFooter replace it — good isolation, but there's **no visible "back to CC3 main" affordance** for a parent who landed on a kids page from a WhatsApp link. They're stranded in Fredoka-land.
- **Search is a dead room:** `/search` exists as a page but no header exposes it.
- Floating help button overlaps the footer's bottom-right legal row on mobile (z-index 50, fixed).

### 1.6 Image pipeline
- All sliders use raw `<img>` — no `next/image`, no srcset, no AVIF/WebP for the new photos (`youth-arena-crusade.jpg` 408KB, `youth-limitless-banner.jpg` 196KB at 1400px wide).
- Platform icons are 240px squares white-padded onto JPEG — some are logos (PCDL, KingsChat), some are full event posters with tiny unreadable text (LW-TV "GLOBAL DAY OF PRAYER", Rhapsody title art). At 38px they read as noise. The icon system needs consistent cropping: logo-marks only.

### 1.7 Content authenticity leaks (copied-source text)
- Teens: *"Spanish & Russian available in some zones"* (`teens/page.tsx:250`) — copied from a US church's copy; meaningless in Port Harcourt.
- Teens footnote: *"Services: Sundays 10:00AM • Wednesdays 7:00PM … Teens Church runs concurrently in every Christ Embassy location"* — generic CE boilerplate contradicting CC3's own times.
- Youth hero captions present another ministry's crusade as ambient branding ("Crusade night — packed arena") without attribution — an authenticity question a sharp visitor will ask.

---

## 2. Main church (`/`) — the flagship

**What works:** coherent navy/gold platform system; PlatformHub is genuinely useful; testimonies section is human; JSON-LD is real; group-church inheritance of the hub is smart architecture; the 8AM pill in the hero is confident.

**What doesn't:**

1. **The hero is a pastor photo carousel** — the first thing a stranger sees is three portraits sliding (Chris → Linda → Kelson). That's leadership-forward branding, not visitor-forward. The visitor's questions ("where are you, when do I come, what happens to my kids") are answered *below* the fold, in the kicker at best. Hero hierarchy serves the org chart, not the convert.
2. **114 inline style blocks** — the design system died and was replaced by vibes. The "Your Journey in Christ" panel, bento, services list, testimonies panel all hand-roll their own padding/borders/radii. Kl- classes exist but are bypassed constantly.
3. **Section sequence is a maze:** hero → 8 sections before the PlatformHub → testimonies → hub → final CTA → contact/map → newsletter. A first-timer hits "Join a Service Unit" (department signup) before they've ever been told *how to visit*. The funnel is inverted: member-actions above visitor-actions.
4. **Service times appear in 4 places with 4 formats** (hero kicker "Sunday 8AM", kl-panel pill, JSON-LD, footer) — none rendered as an actual schedule table; the `services.json` data exists but the homepage hand-copies it.
5. **Google Maps iframe** loads unconditionally (3rd-party JS, ~1MB) at the bottom — no click-to-load facade. Same for the WhatsApp/phone links that could be `tel:`-first on mobile.
6. **NewsletterForm is the last thing before the footer** — the weakest offer in the weakest position, directly under the map. It also lacks visible success/error states (check `forms/NewsletterForm` — no aria-live).
7. **Testimonies = one quote.** A "Read all testimonies" CTA pointing to a page, next to a single static quote, feels thin — either carousel 3 real ones or cut the panel.
8. **The hero shader + slider + countdown + announcement bar** stack four JS behaviors in the first viewport. Any one hiccup delays LCP on a mid-range Android.
9. **"One Church Family — Every Platform You Need"** heading is insider language — members know what PCDL is; a newcomer doesn't. Cards need one-line "what it is for *you*" framing (some blurbs do; PCDL's "stream or download" doesn't say *why*).

## 3. Children Church (`/kids`)

**What works:** total scope isolation (own nav/footer/fonts, `.kids-scope` prefix, zero bleed — genuinely well-engineered); voice reader on devotionals with rate control; quiz + XP loop is real product thinking; the design language (stickers, blobs, Fredoka) is age-true; `prefers-reduced-motion` present here (the only place).

**What doesn't:**

1. **5,552 lines of CSS for a 12-page section** — `kids-components.css` alone is 3,893 lines. There's dead weight here; every new kids page inherits a monolith nobody dares prune.
2. **Main home imports `kids-layout.css`** (`page.tsx:3`) — the adult flagship's layout lives in a file named *kids*-layout. Architecturally confusing and dangerous (one refactor away from a kid style leaking onto main or vice versa).
3. **Fonts via `<link>` inside the layout body** (`kids/layout.tsx:11-19`) — not `next/font`: FOUT on every kids page, no preload, layout shift, and a duplicate load of font CSS already requested at root.
4. **KidsNav strands users** — no "← Main Church" affordance for adults; no church switcher; a parent cannot tell this is the same organization as the navy site they just came from (different logo treatment, different voice, zero visual bridge).
5. **Platform integration is second-class by design** (per constraint), but the two text links (Early Readers, Children's TV) are buried — the Early Readers line sits *below* three buttons in the Kiddies panel; parents will never scroll-past the CTAs to see it.
6. **Kiddies Rhapsody panel** shows a 140-char scripture slice + prayer slice ending in "…" — truncated quotes read as broken content, not teasers, when the full text is one click away. Trim to a clean excerpt or show all.
7. **Quiz/XP gaming** — the achievements page exists now, but kids get a "leaderboard" with mock names (`LeaderboardMock`) presented as if real. For children that's a trust/expectations issue: label it "sample".
8. **Contrast inside playfulness:** yellow-on-cream and pink-on-white sticker combos hover near 3:1 — playful is fine for decoration, but any *text* sticker must clear 4.5.

## 4. Teens (`/teens`)

**What works:** strongest page architecture on the site (hero → offer → TeeVo → announcements → upcoming → pictures → platforms → cells → visit — a real narrative); authentic PH Zone 3 photography; slider discipline (mobile autoplay off); contextual CTA trio.

**What doesn't:**

1. **Service-time chaos** (exec #1) — four conflicting statements. This is a P0 content bug.
2. **The hero's split-background trick (62% navy / 38% white) fights its own content.** The photo card straddles the seam; on tablets the seam cuts through the float card; at <360px `lw-float{left:-8px}` can clip off-screen.
3. **Violet + blue-gradient intruders** (see 1.1) — the teens palette reads as three projects stapled together: cathedral navy, CE-blue TeeVo gradient, violet pills.
4. **58 inline style blocks** duplicating `.62rem` pill styles 3× verbatim (`page.tsx:56-60`), event cards, chips — all should be 5 classes.
5. **"In pictures" slider captions** repeat the alt text nearly verbatim — screen readers hear it twice; sighted users read a caption that adds nothing beyond the photo.
6. **TeeVo disclaimer typography**: the "we do not republish" line is `.68rem opacity .8` — an important legal/ethical note set as fine print within an already-dense gradient panel.
7. **Teens Wonders banner image** (1400×252) is a *poster with text* crammed into a 120px-tall event card — illegible. Event cards need photos, posters need posters' placement.
8. **CTA trio on the footer "Join Teens"/"Contact"** vs hero "Join Teens Church" vs mid "Find a cell" — three different CTA verbs for the same conversion; pick one per scope ("Join Teens") and make everything else secondary.

## 5. Youth (`/youth`)

**What works:** boldest art direction (Swiss midnight + gold italic serif *intended*); best hero concept (full-bleed crossfade + wired 01/03 nav); "Our Heart" section is the best copywriting on the site; R.I.S.E. × ReachOut pairing is smart ministry design.

**What doesn't:**

1. **The look is an accident** (exec #2): DM Serif Display never loads → Georgia renders. The italic-gold "Purpose." that defines the page is a fallback font. Also the page's whole grid is tuned for that serif's metrics.
2. **Wrong palette** (exec #3): `#0F172A`/`#C6A66B` hardcoded in ~20 places; the footer/platform system next to it uses `#0E1B33`/`#C6A04A`. The seam is visible in the footer: brand row (global gold) sits directly under a page in youth-gold.
3. **No mobile hero plan:** `.youth-swiss-hero__inner{grid-template-columns:1fr 80px}` has **no breakpoint** — the vertical JESUS/PEOPLE/PURPOSE rail eats 80px on a 375px phone; the overlay gradient (dark on left 38%) doesn't match mobile text position; `hero__nav` (01/03) overlaps the rail at bottom-right. The flagship youth experience is desktop-only by neglect.
4. **Stale ghost events** (exec #5) — hardcoded OCT/NOV dates with no year, no links, mismatched photos. Either wire to `events.json` or replace with "Sundays · midweek cells" evergreen copy.
5. **Gold eyebrows at 2.46:1** — "UPCOMING EVENTS", "LOVEWORLD PLATFORMS", "IN PICTURES" are the section rhythm of the page and they're all sub-contrast.
6. **Slider caption claims** — "Crusade night — packed arena" implies CC3's own event; these are national/zonal photos. Caption honestly ("Christ Embassy youth crusade") — the sub-line does this; the bold line shouldn't contradict it.
7. **youth-swiss-heart's white caption card** covers 36% of a B&W photo on desktop with 10px type stacked vertically — the "SAME PEOPLE A BRIGHTER TOMORROW CC3" block is a poster fragment pretending to be UI.
8. **"Led by Brother Kelvin" appears 3×** (hero visit strip, footer, rhapsody header) — good consistency; but "Youth Community Nights" (footer service line) is never explained anywhere on the site. Named things must exist somewhere.

---

## 6. Prioritized fix list

### P0 — credibility & correctness (fix this week)
1. Teens service times: single source (`services.json`), rendered once in hero, echoed verbatim in footer; delete the 10AM/7PM footnote & "Spanish & Russian" line.
2. Youth events: wire to `events.json` (or evergreen copy); add year + links; fix photo/caption mismatches.
3. Load DM Serif Display for youth (or drop the serif pretense and commit to Plus Jakarta 800 italic — but *decide*).
4. Persist announcement dismissal (localStorage + TTL).
5. Fix gold-on-white text: darken gold text token to `#8F6E2A`-class for on-white use (keep `#C6A04A` on navy), or switch those eyebrows to navy.
6. Pause/stop slider autoplay under `prefers-reduced-motion`; add pause button.

### P1 — brand coherence
7. One `tokens.css`: navy/gold/ink + per-scope accent vars; migrate youth hex values.
8. Kill violet/teal/blue-gradient one-offs in teens or promote them to documented scope accents.
9. Decide the display-font story per scope (e.g. main=Cinzel-loaded-properly, youth=DM Serif, teens=Jakarta 900, kids=Fredoka) and actually load them via `next/font`.
10. Platform icon set: re-crop to logo-marks (LW-TV, Rhapsody) — no poster thumbnails.

### P2 — craft & performance
11. Convert inline-style mountains to classes (home 114, teens 58) — start with the pill/chip/badge recipe.
12. `next/image` for slider + event images; compress `youth-arena-crusade.jpg` (<150KB target), add WebP.
13. Mobile hero breakpoints for youth (rail hidden <768px, gradient re-tuned, nav repositioned); teens float-card guard at <360px.
14. Google Maps click-to-load facade; `tel:`-first contact actions.
15. KidsNav: add "← Main Church" bridge; label LeaderboardMock as sample; de-truncate kids quotes.
16. NewsletterForm: aria-live status; move offer higher on main; give testimonies carousel ≥3 real entries.
17. Rename `kids-layout.css` → `home-layout.css` (it styles the adult home) and separate the two concerns properly.
18. Expose or delete `/search`.

---

## 7. Scorecard (honest)

| Dimension | Main | Kids | Teens | Youth |
|---|---|---|---|---|
| Visual identity coherence | 7 | 9 | 6 | 4 |
| Information architecture | 6 | 8 | 8 | 7 |
| Copy authenticity | 7 | 8 | 5 | 6 |
| Accessibility (contrast/motion) | 5 | 6 | 5 | 4 |
| Mobile experience | 6 | 7 | 6 | 3 |
| Performance discipline | 6 | 5 | 7 | 4 |
| Content truthfulness (times/dates) | 7 | — | 3 | 3 |
| Design-system hygiene | 3 | 6 | 5 | 6 |

**Bottom line:** Kids is a real product. Main is a good site buried under inline-style entropy and an org-chart hero. Teens is the best *page* with the worst *facts*. Youth is the best *concept* with a broken font, a drifted palette, and no mobile plan — it looks right only on a desktop that loads Georgia by accident.
