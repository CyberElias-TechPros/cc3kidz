# CC3 Teens Church & Youth Church — Complete Website Specifications, Product Requirements & Build Plan
**Christ Embassy Central Church 3 · Port Harcourt Zone 3 · LoveWorld Nation**
**Project decisions confirmed 2026-11-24 · Architect: Independent deployments, Local audience, Full digital experience**

---

## Decision Record

| Decision | Confirmed |
|---|---|
| **Website scope** | Both — full ministry presentation **and** digital experiences (not brochure-only): teachings, devotionals, events, registration, media, outreach reports |
| **Architecture** | Two separate, independent websites — Teens (13–19) and Youth (20–35), visibly connected to CC3 family, aligned to LoveWorld directorates |
| **Audience** | Primarily CC3 and Port Harcourt community (local-first discovery, local safeguarding, local venue/times) |
| **Administration** | Separate ministry administration (no cross-access to private records) |
| **Design** | Two distinct visual identities sharing CC3/LoveWorld affiliation |
| **Technology** | Modern, mobile-first, scalable — React + Vite + MUI + Framer Motion · Cloudflare Workers/D1/R2 · separate CMS/backends |

This document is the single source of truth for scope, architecture, pages, functions, data, privacy, design and roadmap for both products.

---

## 1. Product Definition

### Product 01 — CC3 Teens Church
**Tagline:** *Growing in the Word. Living with Purpose. Influencing Our World.*
**Audience:** Teenagers (13–19), parents/guardians, Teens workers, prospective visitors, TeeVo Club participants.
**Live at:** `/teens` · **Planned domain:** `teens.cc3.cephzone3.org` (or dedicated domain)
**LoveWorld pillars:** Teens Church, TeeVo, TeeVo Clubs, TITHE, conventions, spiritual/leadership development.

**5 product objectives (shared):**
1. Represent ministry (identity, vision, beliefs, leadership, affiliation)
2. Attract & welcome (first-visit journey)
3. Facilitate participation (services, events, cells, outreach, gifts)
4. Provide continuous engagement (TeeVo, Bible study, messages, resources)
5. Document ministry (announcements, events, reports, testimonies, media) — reliable record

### Product 02 — CC3 Youth Church
**Tagline:** *Rooted in the Word. Empowered for Purpose. Positioned for Impact.*
**Audience:** 20–35 — students, graduates, young professionals, entrepreneurs, young adults.
**Live at:** `/youth` · **Planned domain:** `youth.cc3.cephzone3.org`
**LoveWorld pillars:** Youth Church, YOU R.I.S.E. (Youth Reaching Individuals, Streets, Every City & Nation), Rhapsody of Realities, conferences, Creators Connect, graduate connections.

**Age-boundary rule:** Global 13–19 / 20–35 classification is initial; CC3 leadership must approve admission/transition/membership policy — teenagers approaching adulthood are **not** auto-migrated.

---

## 2. Information Architecture — Final Production Sitemaps

### 2.1 Teens (teens.cc3) — Implemented
```
/teens                 Home
/teens/about           About → Who We Are · Vision & Mission · Our Beliefs · Our Leadership · Our Story · LoveWorld Connection
/teens/church          Teens Church → What to Expect · Service Information · New Here? · For Parents & Guardians · FAQ
/teens/word            Word Centre → TeeVo Today · Bible Study · Bible Reading Plans · Messages & Teachings · Scripture Challenges · Bible Quizzes
/teens/activities      Ministry → TeeVo Clubs · TITHE · Prayer & Fellowship · Creative Ministry · Leadership & Service · Ministry Departments
/teens/gifts           (alias of Creative Ministry) — Music & Worship · Media & Tech · Drama · Dance · Design · Leadership
/teens/events          Events → Upcoming · Event Details · Registration · Past Events · Event Reports · Gallery
/teens/resources       Media → Videos · Audio · Photo Gallery · Testimonies · Articles
/teens/connect         Connect → Join Us · Parent Enquiries · Visit CC3 · Contact
```

### 2.2 Youth (youth.cc3) — Implemented
```
/youth                 Home
/youth/about           About → Who We Are · Vision & Mission · Our Beliefs · Leadership · Our Story · LoveWorld Connection
/youth/church          Youth Church → What to Expect · Service Information · New Here? · Fellowship · FAQ
/youth/word            Word & Spirit → Rhapsody of Realities · Messages & Sermons · Bible Study · Prayer · Reading Plans · Spiritual Growth
/youth/rise            Outreach → YOU R.I.S.E. · Evangelism · Outreach Calendar · Outreach Reports · Testimonies
/youth/growth          Growth → Purpose & Calling · Leadership Development · Career & Professional Growth · Entrepreneurship · Skills & Technology · Creative Ministry
/youth/community       Community → Youth Cells · Fellowship Groups · Students · Graduates · Young Professionals · Ministry Departments
/youth/media           Media & Events → Video Library · Podcasts · Articles · Gallery · Events & Conferences
/youth/events          (integrated in media) → Calendar · Conferences · Workshops · Special Meetings · Registration
/youth/connect         Connect → Join Youth Church · Join a Cell · Volunteer · Visit CC3 · Contact
```

Internal mesh: **MinistryFamilyBar** (`Main | Kids 4–12 | Teens 13–19 | Youth 20–35`) on all three; **GenerationSwitcher** (Teens ↔ Youth) on each home; cross-links to `/kids`, `/cells`, `/foundation-school`, `/services`, `/events`, `/media`, `/testimonies`, `/prayer`, `/outreach`, etc. No orphan.

---

## 3. Functional Requirements

### 3.1 Common (both)
| ID | Feature | Spec |
|---|---|---|
| COM-01 | Navigation | Responsive desktop/tablet/mobile + sticky sub-nav per ministry |
| COM-02 | Homepage | Dynamic assembly from CMS (hero, welcome, Word, activities, gifts, events, parents/stories) |
| COM-03 | About | Editable vision/mission/history/beliefs |
| COM-04 | Leadership | Approved profiles, controlled publication, no private phones |
| COM-05 | Service info | Day/time/venue/directions, What to Expect, FAQ |
| COM-06 | Events | Listing, detail, registration (moderated), reports |
| COM-07 | Announcements | Scheduled/priority/expiry |
| COM-08 | Media library | Searchable video/audio/images with consent metadata |
| COM-09 | Articles | Categorized, dated, related |
| COM-10 | Resources | Internal + external (TeeVo, Rhapsody, PCDL, ministryofteensandyouth.org) |
| COM-11 | Testimonies | Submission → moderation → publication |
| COM-12 | Gallery | Albums/event-based |
| COM-13 | Contact | Routed to authorized contacts, parent-aware for Teens |
| COM-14 | Search | Across published content |
| COM-15 | CMS | Full CRUD, draft/review/published/archived |
| COM-16 | SEO | Titles, descriptions, OG, sitemap, robots, structured data (Organization, Event) |
| COM-17 | Accessibility | Keyboard, contrast, labels, skip links |
| COM-18 | Analytics | Privacy-conscious, content performance |

### 3.2 Teens-only
| ID | Feature |
|---|---|
| TNS-01 | **TeeVo Today** — official link + daily reading + Scripture + related study |
| TNS-02 | **Bible Learning Centre** — quizzes, memory challenges, reading plans, topic studies |
| TNS-03 | **TeeVo Clubs** — school/community listings (authorized), activity reports, join enquiry |
| TNS-04 | **TITHE Centre** — outreach announcements, materials, reports, photos (consent), participation enquiry |
| TNS-05 | **Parent & Guardian Centre** — teachings, leadership, service info, safeguarding, parent enquiry channel |
| TNS-06 | **Creative Discovery** — departments, gifts, showcases |
| TNS-07 | **New Teenager Welcome** — guided, parent-aware journey |

### 3.3 Youth-only
| ID | Feature |
|---|---|
| YTH-01 | **Rhapsody Centre** — official access + featured devotional |
| YTH-02 | **Spiritual Growth Centre** — Bible study series, message library, audio/video, prayer, reading plans |
| YTH-03 | **YOU R.I.S.E. Centre** — initiative, calendar, campaign reports, volunteer enquiry, testimonies |
| YTH-04 | **Youth Community Directory** — cells/fellowship/groups/communities (no private member data) |
| YTH-05 | **Development Centre** — career, entrepreneurship, tech, leadership, personal development |
| YTH-06 | **Creative Ministry Showcase** — curated youth-created work (photo, graphics, film, music) |
| YTH-07 | **Young Adult Welcome** — adult-oriented journey |

---

## 4. Homepage Section Order (Implemented)

### Teens — *A Generation Set Apart. Growing in the Word. Full of the Spirit. Making a difference.*
1. Welcome to Teens Church (13–19, CC3 affiliation) + CTAs: Discover Teens Church / Explore TeeVo
2. Spiritual foundation (Vision/Mission/Beliefs)
3. Grow every day (TeeVo, Bible study, challenges)
4. Be part of something (TeeVo Clubs, TITHE)
5. Discover your gifts (Music, Media, Creative, Leadership)
6. What's happening (Upcoming events, announcements, reports)
7. Parents & guardians (leadership, service details, safeguarding) → Connect

### Youth — *Made for Purpose. Established in the Word. Empowered to influence.*
1. Welcome to Youth Church (20–35, CC3 affiliation)
2. Built on the Word (teachings, Rhapsody, prayer)
3. Purpose and influence (spiritual growth, calling, leadership, development)
4. Take the Gospel to the world (YOU R.I.S.E.)
5. Find your community (cells, students, graduates, professionals)
6. Events & experiences (conferences, workshops, specials)
7. Stories & impact (testimonies, media, creative)

---

## 5. Page Content Model (every page)
Title, short intro, body, imagery, author/ministry, published date, last updated, related content, search + social metadata, publication status (draft/review/approved/published/archived), approval record, media consent flags (esp. minors).

---

## 6. Visitor Journeys

**Teens (6 steps):** Discovery (search/publicity) → Understanding (ministry, beliefs, activities) → Welcome (parent info + New Here) → Enquiry (minimal, parent-aware) → Physical participation (Teens Church, safeguarding) → Continued growth (TeeVo, resources, events).

**Youth (6 steps):** Discovery → Exploration (CC3, Youth Church) → Connection (fellowship/interest) → Enquiry/Registration → Participation (Youth Church/activity) → Development & service (fellowship, growth, evangelism, service).

**UX requirements:** Works on low-cost Android, efficient on NG mobile networks, readable type, no registration for public content, no excessive pop-ups, service info easy to find, clear home affordance, accessible controls, accurate contact/venue, useful empty states.

---

## 7. Content Management & Administration (Separate)

### Teens Admin — Dashboard · Pages & Articles · Events & Programs · Devotional & Learning Resources · Leadership & Departments · TeeVo Clubs · TITHE & Outreach · Media & Gallery · Enquiries & Submissions · Moderation & Safeguarding · Reports & Analytics · Settings & Permissions
Capabilities: create/edit/publish/archive, schedule/expire announcements, manage events/registrations (authorized), upload/approve media, maintain club/outreach reports, moderate enquiries/testimonies, safeguarding incident queue (restricted), analytics.

### Youth Admin — Dashboard · Pages & Articles · Events & Conferences · Word & Spiritual Resources · Leadership & Community · YOU R.I.S.E. & Outreach · Development Opportunities · Media & Creative Showcase · Enquiries & Submissions · Reports & Analytics · Settings & Permissions
Capabilities: content, events/conferences, teachings/media, YOU R.I.S.E., community descriptions, development opportunities, creative showcase, testimony moderation, enquiry management, analytics/reports.

### Publishing Workflow
Draft → Submitted for review → Returned for revision / Approved → Published or scheduled → Updated or archived. Teens media involving minors requires additional consent/safeguarding check.

---

## 8. Technical Architecture

### 8.1 Architecture — Two Independent Deployments (Current: unified codebase, independently deployable)

```
PUBLIC 01 — CC3 Teens Church (React+Vite, MUI, Framer Motion)
PUBLIC 02 — CC3 Youth Church (React+Vite, MUI, Framer Motion)
INDEPENDENT CMS — Teens CMS (separate DB boundary) | Youth CMS (separate DB boundary)
BACKEND — Cloudflare Workers (API) + Cloudflare D1 (structured data) + Cloudflare R2 (media) + Auth (RBAC, session, MFA where practical)
INFRA — Cloudflare Pages · CDN · DNS · Security · Analytics · Backups
```

**Current implementation:** Monorepo Next.js App Router (`/teens/*`, `/youth/*`) with isolated layouts/navs/data boundaries, shared design tokens, independently shippable to separate domains (`teens.cc3.*`, `youth.cc3.*`) — no private data shared.

### 8.2 Stack
| Layer | Tech | Purpose |
|---|---|---|
| Frontend | React | UI |
| Build | Vite (Next.js current, Vite on split) | Builds |
| Components | MUI | Accessible reusable UI |
| Animation | Framer Motion | Transitions & micro-interactions |
| Routing | React Router (Next App Router current) | Navigation |
| API | Cloudflare Workers | Server logic |
| DB | Cloudflare D1 | Content & ops |
| Media | Cloudflare R2 | Images/audio/video |
| Hosting | Cloudflare Pages | Delivery |
| CDN | Cloudflare | Perf/cache |
| Auth | Secure session, RBAC | Admin |
| Validation | Zod | API/input |
| Forms | React Hook Form | Forms |
| Monitoring | Cloudflare analytics | Health |

**Repo shape (each):**
```
cc3-teens-church/ — frontend/src/{components,pages,features,hooks,services,theme,routes} · backend/src/{routes,middleware,services,validators,database} · migrations · tests · docs
cc3-youth-church/ — (same)
```

### 8.3 Database — Common tables
`users, roles, permissions, pages, articles, announcements, events, registrations, leaders, departments, media, galleries, testimonies, enquiries, categories, audit_logs`
**Teens-only:** `teevo_resources, teevo_clubs, outreach_activities, learning_resources, scripture_challenges, parent_enquiries, media_consents`
**Youth-only:** `youth_cells, fellowship_groups, outreach_campaigns, development_opportunities, creative_projects, community_categories`

### 8.4 Auth & Security
Password hashing, sessions, MFA (privileged), RBAC, rate limiting, CSRF, validation/sanitization, upload restrictions, audit logs, backups, restricted private submissions, secret management. Teens: no public account creation without safeguarding assessment.

---

## 9. Privacy, Safeguarding & Legal

### Teens — minors-first
| Area | Requirement |
|---|---|
| Registration | Minimal only |
| Parent information | Guardian-facing route |
| Photography/Video | Appropriate permissions, pre-publication consent |
| Testimonials | Moderated, permissioned |
| Contact | Routed to authorized adults |
| UGC | Pre-publication moderation |
| Accounts | Avoid public teen accounts |
| Personal info | Restricted collection/retention |
| Safeguarding | Published reporting/escalation route |

Comply with **Nigeria Data Protection Act** + church leadership review. Youth: privacy notice, marketing consent, retention, restricted member info, secure enquiries, media permissions.

**Both:** Privacy policy, cookie/analytics notice, Terms, Media/Photography policy, Event registration policy, Safeguarding info, Submission/moderation policy, Copyright policy — separately published, audience-appropriate.

---

## 10. Design System & Creative Direction

### Teens — Energetic, confident, welcoming
| Element | Direction |
|---|---|
| Personality | Energetic, confident, welcoming |
| Primary | Electric blue & deep indigo (CC3 navy #0E1B33 base, vermilion accents) |
| Accent | Violet, coral & warm gold highlights |
| Background | Bright, clean, varied |
| Typography | Bold contemporary sans (Nunito Sans current, Fredoka for Kids) |
| Photography | Authentic teenagers & actual ministry (no stock) |
| Layout | Editorial cards, asymmetric sections, visual storytelling |
| Motion | Smooth, subtle reveals, interactive |
| Mobile | Optimized single-column |

### Youth — Mature, purposeful, confident
| Element | Direction |
|---|---|
| Primary | Deep navy & charcoal |
| Accent | Restrained gold & warm neutrals |
| Background | Light editorial + selective dark |
| Typography | Elegant display + readable body |
| Photography | Cinematic real-life young adults |
| Layout | Editorial grids, immersive features |
| Motion | Subtle, deliberate, polished |

**Shared standards:** Spacing, type scale, buttons/forms, contrast, light/dark, image ratios, loading/empty/skeleton, motion as aid — never decoration.

---

## 11. Content Production
| Content | Teens | Youth |
|---|---|---|
| Homepage | 1 | 1 |
| About | 1 | 1 |
| Vision/Mission | 1 | 1 |
| Beliefs | 1 | 1 |
| Leadership | As confirmed | As confirmed |
| Service info | 1 | 1 |
| New visitor | 1 | 1 |
| Parent info | 1 | — |
| Events | Actual calendar | Actual calendar |
| Articles | Approved collection | Approved collection |
| Media | Approved archive | Approved archive |
| FAQs | 1 collection | 1 collection |
| Policies | Required | Required |

Every article/teaching needs title, intro, body, Scripture where relevant, imagery, attribution, date, related, review, metadata. Media needs title, description, category, thumbnail, source, date, attribution, permission, transcript/captions where practical. Governance: writer → editor → theological review → approver → publisher; outdated removal; no implied official position.

---

## 12. SEO & Local Discovery (Local-first)

**Teens keywords:** *Teens Church in Port Harcourt, Christ Embassy Teens Church Port Harcourt, CC3 Teens Church, Christian activities for teenagers in Port Harcourt, TeeVo Teens Ministry Port Harcourt, Christian teenagers fellowship Port Harcourt*
**Youth keywords:** *Youth Church in Port Harcourt, Christ Embassy Youth Church Port Harcourt, CC3 Youth Church, Young adults Christian fellowship Port Harcourt, Christian youth activities Port Harcourt, Christian young professionals fellowship Port Harcourt*

Technical: unique titles/descriptions, canonical, XML sitemaps, robots.txt, OG images, Organization/Event structured data, internal linking, optimized images/alt, fast delivery, Search Console, privacy-aware analytics. Venue to confirm: 11 Haastrup St, Opp. Bosom Hospital, Orazi, Port Harcourt (Zone 3 directory) — confirm before publishing Teens/Youth venue.

---

## 13. Testing & QA
| Category | Checks |
|---|---|
| Visual | Desktop/tablet/mobile |
| Navigation | All menus/routes |
| Performance | Load, images (low-data) |
| Forms | Validation/submission/errors |
| CMS | Create/edit/publish/archive |
| Permissions | No unauthorized access |
| Security | Auth, validation, uploads |
| SEO | Metadata, indexing, structured data |
| Accessibility | Keyboard, contrast, labels |
| Media | Playback, thumbnails, responsive |
| Events | Timezones, dates, registration, expiry |
| Privacy | Consent, retention, access |
| Backup | Recovery |
| Reliability | API failures, empty states |

**Acceptance:** Works mobile+desktop, real content tested, loading/failure states, permissions tested, no info leak, documented, approved.

---

## 14. Roadmap (6 Phases)

1. **Phase 1 — Discovery (Foundation)** Confirm leadership, gather info, align LoveWorld, collect branding/media, approve sitemap/functionality → PRD ✓
2. **Phase 2 — Creative & UI/UX** Separate brand directions, desktop/mobile, homepages, inner templates, admin, visitor journeys → Design systems
3. **Phase 3 — Teens Development** Frontend + CMS, TeeVo, events/media, parent info, outreach/moderation, staging → Functional Teens ✓ (implemented: 9 routes + layouts, MinistryFamilyBar, safeguarding placeholders)
4. **Phase 4 — Youth Development** Independent frontend + admin, Word centre, YOU R.I.S.E., community/development, events/media, staging → Functional Youth ✓ (implemented: 9 routes + layouts)
5. **Phase 5 — Content, QA & Safeguarding** Populate approved content, media permissions, form/registration tests, mobile perf, privacy review, leadership acceptance → Launch-ready
6. **Phase 6 — Deployment & Ops** Domains, Cloudflare, backups, monitoring, training, publish, ongoing CMS → Two operational sites

**Delivery priorities:** P0 launch-critical (Home, About, leadership, service info, CMS, events, contact, privacy) → P1 ministry-essential (Word resources, media, outreach, registration, parent info) → P2 enrichment (quizzes, challenges, creative showcase, advanced reports) → P3 future (PWA, personalization, advanced analytics). Do not delay launch for P2/P3.

---

## 15. Deliverables
| Deliverable | Qty |
|---|---|
| Product requirements documents | 2 ✓ |
| Sitemap & page specs | 2 ✓ |
| Creative direction docs | 2 (draft — navy/gold system; distinct Teens/Youth to be formalized) |
| Design systems | 2 (tokens live; full component lib pending) |
| Responsive websites | 2 ✓ (functional MVP) |
| Independent admin systems | 2 (scaffold pending) |
| Backend/API | 2 (D1/R2 schema proposed) |
| DB schemas | 2 (common + teens/youth tables) |
| Content migration | 2 (awaiting CC3 info) |
| QA reports | 2 (pending Phase 5) |
| Privacy/safeguarding docs | 2 (structures live; policies pending) |
| Deployment docs | 2 (pending domains) |
| Training | 2 (pending) |

---

## 16. Information Still Required From CC3 Leadership (Launch Dependencies)
| Information | Teens | Youth |
|---|---|---|
| Official ministry name | Required | Required |
| Pastor's name | Required | Required |
| Assistant leadership | If applicable | If applicable |
| Service schedule | Required | Required |
| Venue | Required | Required |
| Approved vision/mission | Required | Required |
| Existing departments | Required | Required |
| Current programs | Required | Required |
| Official contact channel | Required | Required |
| Logo/branding | Required | Required |
| Historical records | Desirable | Desirable |
| Social media | Desirable | Desirable |
| Approved photographs | Required | Required |
| Safeguarding procedures | Required | N/A (adult) |
| Outreach records | Required | Required |

Also confirm whether CC3 has adopted TITHE, YOU R.I.S.E., TeeVo Clubs locally — sites explain global initiatives without claiming unconfirmed local programs.

---

## 17. Project Identity (Next Milestone)
Proposed next: produce two high-fidelity homepage designs + inner-page design systems for Teens & Youth, then implement one website at a time — establishing quality/identity before full build. Decisions needed:
1. Official Teens Ministry name
2. Official Youth Ministry name
3. Branding direction (completely distinct vs shared CC3 identity vs Follow LoveWorld closely)
4. Existing content availability (most / some / confirm)

---

*Build status 2026-11-24: Teens & Youth homepages + 16 inner pages + layouts + MinistryFamilyBar + GenerationSwitcher live, 154 routes SSG, 200 on all routes, CSS 200, mobile-first, internal mesh complete. Ready for Phase 2 design finalization and Phase 5 content.*

