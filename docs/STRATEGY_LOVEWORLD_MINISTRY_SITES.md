# Strategy: Christ Embassy / LoveWorld — CC3 website design strategy (Adults, Teens, Youth)

> Source: user-provided ministry-strategy document (2026-11-28). Condensed to the decisions that govern implementation.
> Reference anchors: christembassy.org · loveworld.inc · ministryofteensandyouth.org (official Teens & Youth ministry site — teens 13–19, youth 20–35)

## Core verdict
Three independent audience experiences inside one coordinated CC3 digital ecosystem. Local sites are **gateways into the global LoveWorld platforms** (Rhapsody, PCDL, CeFlix, KingsChat, Healing School/Streams, TV networks, Radio, App Store) — never rebuilds of them.

## Design directions (settled)
| Site | Direction | Mix |
|---|---|---|
| Adults | **Cinematic Ministry Editorial** | 30% cinematic · 30% bespoke editorial · 20% premium minimalism · 10% institutional · 10% immersive |
| Teens | **Immersive Expressive Editorial** | 25% immersive · 25% editorial · 20% illustrative · 15% experimental · 10% motion · 5% minimal |
| Youth | **Cinematic Futuristic Editorial** | 25% cinematic · 25% futuristic · 20% editorial · 15% experimental · 10% motion · 5% minimal |

Personality: Adults = established, excellent, spiritually rich · Teens = vibrant community where they belong · Youth = purposeful movement developing gifts & impacting the world.
Rule: "a visitor should not scroll through elaborate animation to find the Sunday service time."

## Integration matrix (implemented in src/data/loveworld-platforms.ts)
Primary Adults: Rhapsody, PCDL, CeFlix, KingsChat, Healing School/Streams, TV networks, Radio, News, Foundation School, Cell Ministry.
Primary Teens: TeeVo, TeeVo Clubs, T.I.T.H.E. (Teens In The Hood Evangelical), Trumpets Conference, ITPLC, TAP, Ministry hub.
Primary Youth: Y.O.U-Rise, Creators Connect, Graduate Network, Campus Ministry/GYLF, InnerCity relevance.

## Non-negotiables
- Curated platform cards/links, not "20 app icons in a footer" (footer chips ≤6, curated order).
- Parents & guardians area for Teens: consent, safeguarding, photography policy, leader contact — never expose teen personal data publicly.
- Content collection & verification before development (no invented history/times/bios) — service times single-source (`serviceTimes` in site.ts).
- Governance hierarchy: LoveWorld identity → Christ Embassy identity → CC3 local identity → per-ministry creative.
- Seek approval for logos, photography, doctrinal content, leadership bios before presenting as official.

## Implementation status on branch
- Ecosystem integration matrix ✅ (commit eecb33f) — 28 platforms, official artwork, curated footer chips
- Service-time single source ✅ (4ee2d0b) · P0 UX fixes ✅ · authentic PH Zone 3 photography ✅ (b5a6b60)
- Remaining from doc: parents/safeguarding area depth (teens/connect exists — expand), Graduate Network & Creators Connect narrative pages, admin dashboard capabilities (already scaffolded /admin), PWA/mobile polish.
