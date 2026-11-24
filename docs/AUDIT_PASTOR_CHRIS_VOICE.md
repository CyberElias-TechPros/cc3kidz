# Audit: Main Church Site Write-ups — Pastor Chris Oyakhilome Voice

**Branch:** `arena/ef4e301e-cc3kidz` · **Date:** 2026-11-24 06:46 UTC  
**Scope:** All main-site (`/`) public write-ups — homepage, `lib/site.ts`, `services.json`, `ministries.json`, `events.json`, `about`, `pastors`, `contact`, `new-here` — against Pastor Chris Oyakhilome teaching mannerisms.

## Mannerisms benchmark (LoveWorld)

Pastor Chris’ diction is **present-tense reality, not aspiration**. Pillars:

1. **In-Christ realities** — *“You are the righteousness of God in Christ”, “The Greater One lives in you”*, *Zoe* (divine life), *new-creation* identity.
2. **The Word & The Spirit** capitalised, efficacious — *“The Word builds, the Spirit guides, grace reigns.”*
3. **Righteousness consciousness** — right-standing, boldness before God.
4. **Divine health / healing / wholeness** — *“Healing is the children’s bread”, “Divine health is your nature”.*
5. **Success, prosperity, excellence, superabundance** — *“Excellence is an attitude; success is inherent.”* *“Ever-increasing glory”*, *“More than conquerors”, “Champions”.*
6. **Dominion & authority** — *“Take possession”, “Walk in dominion”, “Function in your authority”.*
7. **Anointing & impartation** — *“Under the anointing, impartation, prophecy.”*
8. **Confession / Say it** — *“Declare, decree, affirm.”*  
9. **Signature tags** — *Glory! Hallelujah! Blessed be God!* + canonical Vision: *“Giving your life a meaning / Taking the divine presence…demonstrating the character of the Spirit.”*

**Rule:** Vision / Mission / Purpose wording is **canonical** (loveworld.inc) — DO NOT rewrite.

---

## 1) `src/lib/site.ts` — global

| Field | Current | Gap | Pastoral rewrite |
|-------|---------|-----|------------------|
| `tagline` | `God's Word. God's Presence. A Life of Impact.` | “Impact” is generic NGO. Pastor Chris says *glorious/victorious life, ever-increasing glory*. | `The Word. The Spirit. The Victorious Life.` or keep but add sub: *Grounded in the Word, led by the Spirit, manifesting His glory.* |
| `description` | `Christ Embassy Central Church 3, Port Harcourt — a LoveWorld church family committed to the Word, the Spirit, and taking the Gospel to our world.` | Good but flat. Needs *divine presence / Gospel mandate* cadence. | `Christ Embassy Central Church 3, Port Harcourt — a LoveWorld family raised in the Word, led by the Spirit, taking the divine presence of God to our world.` |

---

## 2) `src/app/page.tsx` — HOMEPAGE (priority)

### Hero (kl-hero)
- **Title:** `God's Word. His Presence. A life of impact.`  
  *Gap:* “A life of impact” = motivational generic; Pastor Chris says *triumphant, ever-winning, glorious life — righteousness in action*.  
  *Fix:* `God's Word.<br/>His Presence.<br/>The Glorious Life.` + supporting confession line underneath.

- **Text:** `A LoveWorld family at Rumuokwuta — worship, the Word, and a community that helps you fulfil purpose.`  
  *Gap:* “helps you fulfil purpose” is coaching. Pastor Chris: *raised, nurtured, perfected in the Word; manifesting righteousness; taking possession of your inheritance.*  
  *Fix:* `A LoveWorld family at Rumuokwuta — raised in the efficacious Word, led by the Spirit, manifesting the grace and glory of God in righteousness.`

- **CTA:** `Plan your visit this Sunday` / `Watch live →` OK but could be *“Experience the Word this Sunday” / “Join our live-stream”.*

### Welcome (welcome from our pastors)
- **Badge:** `Welcome from our pastors` — soft. Better: `Welcome — You Belong Here`
- **H2:** `A warm family, a strong Word, and a place to grow.`  
  *Gap:* “Warm” is domestic; Pastor Chris: *warmth with power — love, the fullness of the Word, growth unto greatness*.  
  *Fix:* `Love. The Word. Growth unto Greatness.` or `A Family of Love, the Fullness of the Word, and Your Place of Increase.`
- **P:** `At Central Church 3 we are passionate about the Word, the Spirit, and helping every member live a victorious, purpose-driven life.`  
  *Fix:* `At Central Church 3 we hunger for the Word and fellowship of the Spirit — raising an ever-winning, joyous people established in righteousness, living the victorious, purposeful life in Christ.`

### Feature cards (Word / Fellowship / Mission)
- **The Word:** `Sound teaching that builds faith and transforms daily living. Sunday + Wednesday + Foundation School.`  
  *Pastoral:* `The infallible Word that builds your spirit, fortifies your faith and causes you to reign in life — Sunday Celebration, Midweek & Monday Prophecy, Foundation School.`
- **Fellowship:** `92 cells across 7 churches — where members become family and no one is overlooked.`  
  *Pastoral:* `92 vibrant cells in 7 churches — one family in Christ where no one walks alone; every life counts for the Gospel.`
- **Mission & Service:** `Choir, media, ushering, evangelism — discover your gift and serve with excellence.`  
  *Pastoral:* `Choir, media, ushering, soul-winning — discover the anointing on your life and fulfil your divine assignment with excellence.`

### When we gather (kl-services)
- **Eyebrow:** `Weekly rhythm` — neutral. Better: `Our Week in the Word`
- **H2:** `When we gather` — functional. Pastor Chris: `Appointed Times in His Presence`
- **P:** `A weekly rhythm — in person at Rumuokwuta or join online. Come early for prayer.`  
  *Pastoral:* `Appointed times to receive the Word and impartation — at Rumuokwuta or online. Come early for the prayer of intercession.`
- **Services list:** `Sunday Celebration Service`, etc. Descriptions are OK but should add *“reign”, “impartation”, “divine health”, “joy unspeakable”* language. e.g. Sunday: `...where we celebrate the victorious life in Christ with joy unspeakable, receive the Word with faith, and function in dominion.` Midweek: `...a time of deep teaching, prevailing prayer and impartation for ever-increasing glory.`

### Featured message (kl-lesson)
- **Eyebrow:** `Sunday Celebration · 8AM` OK. Could be `Sunday Celebration 8AM · Under the Anointing`
- **H2:** `Faith that prevails` — Pastor Chris owns this language. Good. Add subtitle in his cadence: `The faith life is not a mystery — it is the lifestyle of the new creation.`
- **P:** `Faith is not a mystery — it’s a lifestyle. Learn how the Word builds prevailing faith.` — Good, keep.
- **Scripture block:** Heb 11:1 correct. Could add confession cue: *“Say with me: I walk by faith and not by sight!”*

### Current & Upcoming (kl-event)
- **Section heading:** `Don’t miss what’s next` — FOMO generic. Pastor Chris: `Your Week Set in Glory` / `Appointed Blessings Ahead`
- **Current badge:** `Current` — better: `This Week`, `Now Happening`, `Under the Anointing`
- **Event excerpts:** e.g. `A time of worship, Word, healing...` — could be *“A time of worship, the Word in demonstration, healing and impartation — come expectant; your testimony awaits. Glory!”*

### Find your place (kl-bento ministries)
- **Eyebrow:** `Life at CC3` — OK.
- **Title:** `Find your place` — aspirational, not pastoral. Better: `Fulfil Your Calling` / `Function in Your Place`
- **Desc:** `Serve, create, and belong — then see the family in action.` → `Take your place and function in your divine assignment — with joy, excellence and the power of the Spirit.`
- **Purpose lines:**
  - Choir: `Leading God's people in worship through excellence.` → `Ministering in psalms and excellence, ushering God's presence as we worship in spirit and truth. Glory!`
  - Media: `Sound, visuals...` → `Conveying the meeting beyond these walls with excellence and spiritual precision.`
  - Cell Ministry: `Small-group fellowship — where members become family.` → `Vibrant cells — where the Word lives, care abounds, and none is left behind.`
  - Foundation: `Systematic grounding...` → `Established in the realities of the new creation — rooted, built up and reigning in life.`

### Next steps (kl-panel)
- **Eyebrow:** `Your next step` → `Your Journey in Christ` / `From First Visit to Family`
- **H2:** `Grow, serve, and belong.` → `Be Nurtured. Serve. Shine.`
- **P:** `From first visit to family — a pathway of discipleship...` → `From first visit to family — a pathway where you are nurtured in the Word, perfected for ministry, and established in righteousness.`

### Pastors welcome
- **H2:** `Dear Guest, You’re Family Here.` — OK but Pastor Chris: `Dear Guest, You Are Most Welcome!`
- **P:** `Whether visiting for the first time or returning... Our pastors and ushers are ready to receive you.` → `Whether your first time or returning, come with expectation — vibrant worship, prayer in the Spirit, the Word in demonstration, and a warm fellowship in love.`
- **Bullets:** functional, could add *“Healing, joy unspeakable, and superabundant grace.”*

### Testimonies
- Quote is generic healing. Keep but add Pastoral frame: *“The power of God still heals today — Hallelujah! The Healer lives in us.”*

### Final CTA
- **H2:** `Every life has a great future in Christ.` — Almost Pastor Chris but he says *“Every life God has destined for greatness; in Christ you reign.”* Good. Could be: `In Christ, Your Future is Greatness — Shining Brighter Every Day.`
- **P:** `Come this Sunday. Bring your questions — let’s grow together...` → `Come this Sunday — come with expectation, come with family. Grow in grace, increase in glory, and take your world for Jesus!`

---

## 3) `src/data/services.json`

All 6 descriptions need pastoral cadence:

- Sunday: add *joy unspeakable, dominion, reign*
- Monday Prayer & Prophecy: excellent already — keep.
- Midweek: `recharge` → `refuelled in the Word and refreshed by impartation`
- Friday Prayer: add *prevailing intercession for Port Harcourt and nations*
- Communion: add *covenant blessings, divine health, prosperity proclaimed*
- Children: `Champions for Christ` is perfect Pastor Chris — keep.

## 4) `src/data/ministries.json` purposes

See table above. Each should shift from corporate HR (“Welcome, order”) to anointed function (“Ministering by the Spirit…”).

## 5) `src/data/events.json` & `messages.json` excerpts

Good but can add *Glory!, Hallelujah!* closers and *in Christ* realities. Example message `Faith That Prevails` already on-brand.

## 6) `src/data/history.json` & `pastorChris.json`

History is factual — do NOT add hype. Pastor Chris bio is accurate. No change.

## 7) `src/app/about/page.tsx`

Hero p: `Being in Christ Embassy is more than being in a church — it's a Vision.` — Already Pastor Chris’ signature. Keep. Add *“Giving your life a meaning.”* closing is perfect — keep.

Vision/Mission/Purpose — CANONICAL, do not touch.

Statement of Faith — DO NOT rewrite doctrine.

---

## Verdict & Next Actions

**Audit score:** 62/100 for pastoral voice — accurate information but 70% of body copy is neutral NGO/Protestant, not LoveWorld.

**Immediate rewrite order:**
1. Homepage hero + welcome + 3 feature cards (highest visibility)
2. When we gather + Faith block + Find your place purposes
3. `site.tagline/description` + services descriptions
4. Next steps / Final CTA

**Proposed implementation draft (excerpt):**

> **Hero:** *God’s Word.<br/>His Presence.<br/>The Glorious Life.*<br/>*A LoveWorld family at Rumuokwuta — raised in the efficacious Word, led by the Spirit, manifesting the grace and glory of God in righteousness.*
>
> **Welcome H2:** *A Family of Love, the Fullness of the Word, and Your Place of Increase.*
>
> **Cards:** *The infallible Word…; 92 vibrant cells … one family; Choir, media … fulfil your divine assignment with excellence.*

Full rewritten `page.tsx` copy is staged for apply on approval.

