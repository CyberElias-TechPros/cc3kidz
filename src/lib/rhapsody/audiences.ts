/** Rhapsody audiences → CC3 church mapping.
 * Source corpus: rhapsody-blog (853 devotionals across 3 audiences).
 * This file is the single source of truth for how the corpus is used in CC3.
 */

export type AudienceId = 'adults' | 'teens' | 'early-readers'

export interface AudienceMeta {
  id: AudienceId
  label: string
  shortLabel: string
  series: string
  blurb: string
  editionSuffix: string
  slugToken: string
  church: {
    scope: 'main' | 'teens' | 'kids' | 'youth'
    audiences: AudienceId[]
    label: string
    href: string
    description: string
  }
}

export const AUDIENCES: Record<AudienceId, AudienceMeta> = {
  adults: {
    id: 'adults',
    label: 'For Adults',
    shortLabel: 'Adults',
    series: 'Rhapsody of Realities',
    blurb: 'Rhapsody of Realities — the daily devotional by Pastor Chris Oyakhilome.',
    editionSuffix: '',
    slugToken: '',
    church: {
      scope: 'main',
      audiences: ['adults'],
      label: 'Main Church & Youth',
      href: '/rhapsody',
      description: 'Adult Rhapsody for Main Church and Youth (20–35).',
    },
  },
  teens: {
    id: 'teens',
    label: 'For Teens',
    shortLabel: 'TeeVo',
    series: 'Rhapsody of Realities for Teens',
    blurb: 'TeeVo — the same day’s message for teenagers, with something to do and say.',
    editionSuffix: '-teens',
    slugToken: '-teens',
    church: {
      scope: 'teens',
      audiences: ['teens'],
      label: 'Teens Church',
      href: '/teens/word',
      description: 'TeeVo for Teens 13–19 — Pastor Binta Alex, Teens Church Pastor.',
    },
  },
  'early-readers': {
    id: 'early-readers',
    label: 'For Early Readers',
    shortLabel: 'Early Readers',
    series: 'Rhapsody of Realities for Early Readers',
    blurb: 'One page, large type, and a confession a child can read aloud — Kiddies Rhapsody.',
    editionSuffix: '-early-readers',
    slugToken: '-early-readers',
    church: {
      scope: 'kids',
      audiences: ['early-readers'],
      label: "Children's Church",
      href: '/kids/rhapsody',
      description: 'Kiddies Rhapsody (Early Readers) for Children’s Church — Coordinator Sister Christy Olajide Abiola.',
    },
  },
}

/** Church → audience mapping for the 4 CC3 ministries */
export const CHURCH_AUDIENCE: Record<string, AudienceId | AudienceId[]> = {
  main: 'adults',
  youth: 'adults',
  teens: 'teens',
  kids: 'early-readers',
}

export const CHURCH_LEADERS = {
  teens: {
    name: 'Pastor Binta Alex',
    title: 'Pastor, Teens Church',
    church: 'CC3 Teens Church · PH Zone 3 · 13–19',
    image: '/assets/images/leaders/teens-pastor-binta-alex.jpg',
    bio: 'Pastor Binta Alex shepherds the Teens Church of Christ Embassy Central Church 3 — raising teenagers established in the Word, filled with the Spirit and empowered to influence their schools and generation.',
  },
  youth: {
    name: 'Brother Kelvin',
    title: 'Leader, Youth Church',
    church: 'CC3 Youth Church · PH Zone 3 · 20–35',
    image: '/assets/images/leaders/youth-brother-kelvin.jpg',
    bio: 'Brother Kelvin leads the Youth Church of Christ Embassy Central Church 3 — building young adults established in the Word, Spirit-empowered and positioned to influence their generation for Christ.',
  },
  kids: {
    name: 'Sister Christy Olajide Abiola',
    title: "Coordinator, Children's Church",
    church: "CC3 Children's Church · Ministry of Children's Affairs · PH Zone 3",
    image: '/assets/images/leaders/kids-coordinator-christy-abiola.jpg',
    bio: 'Sister Christy Olajide Abiola coordinates the Children’s Church of CC3 — nurturing children in God’s Word with excellence, joy and godly character, in partnership with parents and teachers.',
  },
} as const

export function audienceOfChurch(church: string): AudienceId {
  const a = CHURCH_AUDIENCE[church]
  if (!a) return 'adults'
  return Array.isArray(a) ? a[0] : a
}

export function audiencesForChurch(church: 'main' | 'youth' | 'teens' | 'kids'): AudienceId[] {
  const a = CHURCH_AUDIENCE[church]
  return Array.isArray(a) ? a : [a as AudienceId]
}
