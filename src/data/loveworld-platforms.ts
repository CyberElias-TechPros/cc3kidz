/**
 * LoveWorld Platforms — single typed source of truth.
 *
 * Every platform link is an OUTBOUND link to the official LoveWorld platform.
 * CC3 never republishes devotional content — cards deep-link out ("Open official").
 * Audience tags map each platform to the church scope whose "area of concern"
 * it serves: main (congregation), children (4–12), teens (13–19), youth (20–35).
 *
 * urlVerified: true  = domain already linked on the site or confirmed this session
 * urlVerified: false = verify with `npm run check:links` before relying on it
 */
export type PlatformAudience = 'main' | 'children' | 'teens' | 'youth'

export type Platform = {
  id: string
  image: string
  name: string
  url: string
  blurb: string
  icon: string
  audience: PlatformAudience[]
  featured?: boolean
  badge?: 'LIVE' | 'PARTNER' | 'FREE APP' | 'GLOBAL' | 'CONFERENCE'
  cta?: string
  urlVerified?: boolean
  /** footer-chip priority for this platform's primary scope (1 = first) */
  chip?: number
}

export const platforms: Platform[] = [
  // ─── MAIN (congregational maturity, healing, global vision, partnership) ───
  {
    id: 'rhapsody',
    chip: 1,
    image: '/assets/images/platforms/rhapsody.jpg',
    name: 'Rhapsody of Realities',
    url: 'https://rhapsodyofrealities.org',
    blurb: 'The daily devotional by Pastor Chris Oyakhilome — over 8,000 languages, bringing the Word to every nation.',
    icon: '📖',
    audience: ['main', 'youth'],
    featured: true,
    cta: 'Read today’s devotional',
    urlVerified: true,
  },

  {
    id: 'ceflix',
    chip: 2,
    image: '/assets/images/platforms/ceflix.jpg',
    name: 'CeFlix',
    url: 'https://ceflix.org',
    blurb: 'Live streaming and on-demand ministry video — church services, conferences, specials and teaching, any time.',
    icon: '▶',
    audience: ['main', 'teens', 'youth'],
    badge: 'LIVE',
    cta: 'Watch on CeFlix',
  },  {
    id: 'rhapsody-bible',
    image: '/assets/images/platforms/rhapsody-bible.jpg',
    name: 'Rhapsody Bible',
    url: 'https://rhapsodyofrealities.org',
    blurb: 'Free Bible app with the Rhapsody devotional built in — study plans, audio and every translation.',
    icon: '📱',
    audience: ['main', 'youth'],
    badge: 'FREE APP',
    cta: 'Get the app',
  },
  {
    id: 'healing-streams',
    chip: 3,
    image: '/assets/images/platforms/healing-streams.jpg',
    name: 'Healing Streams TV',
    url: 'https://healingstreams.tv',
    blurb: 'Live healing services with Pastor Chris — millions connected worldwide receive miracles in real time.',
    icon: '✨',
    audience: ['main', 'youth'],
    badge: 'LIVE',
    cta: 'Join a live service',
    urlVerified: true,
  },
  {
    id: 'healing-school',
    image: '/assets/images/platforms/healing-school.jpg',
    name: 'Enter the Healing School',
    url: 'https://enterthehealingschool.org',
    blurb: 'Sessions, testimonies and ministry resources from the Healing School of Pastor Chris Oyakhilome.',
    icon: '🕊️',
    audience: ['main'],
    cta: 'Visit the Healing School',
  },
  {
    id: 'pcdl',
    chip: 4,
    image: '/assets/images/platforms/pcdl.jpg',
    name: 'PCDL — Pastor Chris Digital Library',
    url: 'https://pcdl.co',
    blurb: 'Sermons, teachings and messages from decades of Pastor Chris’s ministry — stream or download.',
    icon: '🎧',
    audience: ['main', 'youth'],
    cta: 'Open the library',
    urlVerified: true,
  },
  {
    id: 'pastor-chris-online',
    image: '/assets/images/platforms/pastor-chris-online.jpg',
    name: 'Pastor Chris Online',
    url: 'https://pastorchrisonline.org',
    blurb: 'The digital ministry hub — daily capsules, live streams, Q&A and specials with Pastor Chris.',
    icon: '🌐',
    audience: ['main'],
    cta: 'Visit hub',
    urlVerified: true,
  },
  {
    id: 'kingschat',
    chip: 5,
    image: '/assets/images/platforms/kingschat.jpg',
    name: 'KingsChat',
    url: 'https://kingschat.online',
    blurb: 'The LoveWorld social platform — chat, timelines, live events, and connection with the global community.',
    icon: '💬',
    audience: ['main', 'youth'],
    cta: 'Join KingsChat',
    urlVerified: true,
  },
  {
    id: 'lw-tv',
    chip: 6,
    image: '/assets/images/platforms/lw-tv.jpg',
    name: 'LoveWorld TV Ministry',
    url: 'https://loveworldtelevisionministry.org',
    blurb: 'LoveWorld networks — cutting-edge media evangelism broadcasting the Gospel to the nations 24/7.',
    icon: '📺',
    audience: ['main'],
    cta: 'Watch & partner',
    urlVerified: true,
  },



  {
    id: 'lw-news',
    image: '/assets/images/platforms/lw-news.jpg',
    name: 'LoveWorld News',
    url: 'https://loveworldnews.org',
    blurb: 'Ministry news, testimonies and impact stories from every zone of Believers’ LoveWorld.',
    icon: '📰',
    audience: ['main'],
    cta: 'Read the news',
  },
  {
    id: 'reachout-world',
    image: '/assets/images/platforms/reachout-world.jpg',
    name: 'ReachOut World',
    url: 'https://reachoutworld.org',
    blurb: 'The global campaign to take Rhapsody of Realities to every person alive, in every nation — join the movement.',
    icon: '🌍',
    audience: ['main', 'youth'],
    badge: 'GLOBAL',
    cta: 'Reach your world',
  },
  {
    id: 'innercity',
    image: '/assets/images/platforms/innercity.jpg',
    name: 'InnerCity Mission',
    url: 'https://theinnermission.org',
    blurb: 'Ministry to children in inner cities and indigent communities — food, education, sponsorship and hope.',
    icon: '🤝',
    audience: ['main'],
    cta: 'Sponsor a child',
  },
  {
    id: 'lw-books',
    image: '/assets/images/platforms/lw-books.jpg',
    name: 'LoveWorld Books',
    url: 'https://loveworldbooks.org',
    blurb: 'Faith-building books and teaching resources from LoveWorld Publishing — for every stage of growth.',
    icon: '📚',
    audience: ['main'],
    cta: 'Browse books',
  },




  {
    id: 'lw-radio',
    image: '/assets/images/platforms/lw-radio.jpg',
    name: 'LoveWorld Radio',
    url: 'https://christembassy.org/loveworld-apps/',
    blurb: 'Ministry radio — worship, teaching and programmes streaming 24/7 from LoveWorld stations.',
    icon: '📻',
    audience: ['main'],
    cta: 'Listen live',
  },
  {
    id: 'lw-appstore',
    image: '/assets/images/platforms/rhapsody-bible.jpg',
    name: 'LoveWorld App Store',
    url: 'https://lwappstore.com',
    blurb: 'Every official LoveWorld app in one place — devotionals, Radio, KingsChat, CeFlix and more, for every device.',
    icon: '📱',
    audience: ['main'],
    cta: 'Browse apps',
  },

  // ─── TEENS (identity, academics, daily Word habit, school clubs, partnership) ───
  {
    id: 'ministry-hub',
    chip: 1,
    image: '/assets/images/platforms/ministry-hub.jpg',
    name: 'Ministry of Teens & Youth',
    url: 'https://ministryofteensandyouth.org',
    blurb: 'The official LoveWorld Ministry of Teens & Youth — teens churches, youth churches, initiatives and resources worldwide.',
    icon: '🔥',
    audience: ['teens', 'youth'],
    featured: true,
    cta: 'Visit the ministry',
    urlVerified: true,
  },
  {
    id: 'tap',
    chip: 2,
    image: '/assets/images/platforms/tap.jpg',
    name: 'TAP — Teens Advance Partners',
    url: 'https://loveworldteensministry.ca',
    blurb: 'Partner with the LoveWorld Teens Ministry — advancing the Gospel among teenagers worldwide.',
    icon: '🚀',
    audience: ['teens'],
    badge: 'PARTNER',
    cta: 'Become a TAP partner',
  },
  {
    id: 'itplc',
    image: '/assets/images/platforms/itplc.jpg',
    name: 'ITPLC',
    url: 'https://loveworldteensministry.ca',
    blurb: 'International Teens Pastors & Leaders’ Conference — training and inspiring teens’ leaders globally.',
    icon: '🎓',
    audience: ['teens'],
    badge: 'CONFERENCE',
    cta: 'About ITPLC',
  },
  {
    id: 'teens-club',
    chip: 3,
    image: '/assets/images/platforms/teens-outreach.jpg',
    name: 'TeeVo Clubs',
    url: 'https://ministryofteensandyouth.org/teevo-clubs/',
    blurb: 'Teen-led evangelism clubs in schools and communities — how to join, how to lead, how to reach every teenager.',
    icon: '◉',
    audience: ['teens'],
    badge: 'GLOBAL',
    cta: 'TeeVo Clubs info',
  },
  {
    id: 'tithe',
    chip: 5,
    image: '/assets/images/platforms/tap.jpg',
    name: 'T.I.T.H.E.',
    url: 'https://ministryofteensandyouth.org',
    blurb: 'Teens In The Hood Evangelical Special — teens taking the Gospel to their streets, schools and neighbourhoods.',
    icon: '✦',
    audience: ['teens'],
    badge: 'OUTREACH',
    cta: 'About T.I.T.H.E.',
  },
  {
    id: 'trumpets',
    chip: 4,
    image: '/assets/images/platforms/trumpets.jpg',
    name: 'Trumpets Conference',
    url: 'https://ministryofteensandyouth.org',
    blurb: 'Training, Reach Out, Upgrade, Missions, Partnership, Empowerment — the conference equipping teens’ structures worldwide.',
    icon: '🎺',
    audience: ['teens'],
    badge: 'CONFERENCE',
    cta: 'About Trumpets',
  },
  {
    id: 'teens-hub',
    image: '/assets/images/platforms/teens-hub.jpg',
    name: 'LoveWorld Teens Ministry',
    url: 'https://loveworldteensministry.ca',
    blurb: 'The global teens ministry hub — events, specials, and stories of teens taking their world for Jesus.',
    icon: '🔥',
    audience: ['teens'],
    cta: 'Visit the hub',
  },
  {
    id: 'affirmation-train',
    chip: 6,
    image: '/assets/images/platforms/affirmation-train.jpg',
    name: 'Affirmation Train',
    url: 'https://affirmation-train.org',
    blurb: 'Daily affirmations & talking sessions — say the same things God says about you, every day.',
    icon: '🚂',
    audience: ['teens', 'youth'],
    cta: 'Board the train',
    urlVerified: true,
  },

  // ─── YOUTH (purpose & leadership, campus/career, evangelism) ───
  {
    id: 'gylf',
    chip: 1,
    image: '/assets/images/platforms/gylf.jpg',
    name: 'Global Youth Leaders’ Forum',
    url: 'https://globalyouthleadersforum.org',
    blurb: 'GYLF — nurturing young people for global leadership: training, inspiration and impact projects worldwide.',
    icon: '⭐',
    audience: ['youth'],
    featured: true,
    cta: 'Join the forum',
    urlVerified: true,
  },
  {
    id: 'campus',
    chip: 5,
    image: '/assets/images/platforms/campus.jpg',
    name: 'GYLF Campus Ministry',
    url: 'https://globalyouthleadersforum.org',
    blurb: 'Campus evangelism and student cells through the Global Youth Leaders’ Forum — own your campus for Christ.',
    icon: '🏛️',
    audience: ['youth'],
    cta: 'Campus outreach',
    urlVerified: true,
  },
  {
    id: 'creators-connect',
    chip: 2,
    image: '/assets/images/platforms/creators-connect.jpg',
    name: 'Creators Connect',
    url: 'https://ministryofteensandyouth.org/creators-connect/',
    blurb: 'For creatively and digitally gifted young people — design, photography, video, film, animation, writing, music, technology.',
    icon: '🎬',
    audience: ['youth'],
    badge: 'GLOBAL',
    cta: 'Join Creators Connect',
  },
  {
    id: 'graduate-network',
    chip: 3,
    image: '/assets/images/platforms/graduate-network.jpg',
    name: 'LoveWorld Graduate Network',
    url: 'https://blwgraduatenetwork.org',
    blurb: 'Stay connected after school — mentorship, career purpose and global impact for graduates and young professionals.',
    icon: '🎓',
    audience: ['youth'],
    cta: 'Join the network',
  },
  {
    id: 'you-rise',
    chip: 4,
    image: '/assets/images/platforms/reachout-world.jpg',
    name: 'Y.O.U-Rise',
    url: 'https://ministryofteensandyouth.org',
    blurb: 'Youth Reaching Individuals, Streets, Every City & Nation — the youth evangelism thrust, locally expressed through CC3.',
    icon: '🌍',
    audience: ['youth'],
    badge: 'OUTREACH',
    cta: 'Rise with us',
  },

  // ─── CHILDREN (foundations, Bible fun, parent trust) ───
  {
    id: 'early-readers',
    image: '/assets/images/platforms/early-readers.jpg',
    name: 'Rhapsody for Early Readers',
    url: 'https://rhapsodyofrealities.org',
    blurb: 'The Rhapsody devotional written for beginner readers — colourful, simple stories of God’s Word for little ones.',
    icon: '🧸',
    audience: ['children'],
    cta: 'Open Early Readers',
    urlVerified: true,
  },
  {
    id: 'childrens-tv',
    image: '/assets/images/platforms/lovetoons.jpg',
    name: 'LoveWorld Children’s Ministry TV',
    url: 'https://loveworldtelevisionministry.org',
    blurb: 'Songs, Bible stories and programmes for children — safe, joyful screen time from LoveWorld TV.',
    icon: '🎵',
    audience: ['children'],
    cta: 'Watch programmes',
    urlVerified: true,
  },
]

export function platformsFor(audience: PlatformAudience): Platform[] {
  return platforms.filter(p => p.audience.includes(audience))
}

/* Footer chip priority per scope (explicit, curated — avoids link soup) */
export const footerChipOrder: Record<PlatformAudience, string[]> = {
  main: ['rhapsody', 'ceflix', 'healing-streams', 'pcdl', 'kingschat', 'lw-tv'],
  teens: ['ministry-hub', 'tap', 'teens-club', 'trumpets', 'tithe', 'affirmation-train'],
  youth: ['gylf', 'creators-connect', 'graduate-network', 'you-rise', 'ministry-hub', 'campus'],
  children: ['early-readers', 'childrens-tv'],
}
