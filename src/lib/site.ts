export const site = {
  name: 'Christ Embassy Central Church 3',
  shortName: 'CE Central Church 3',
  zone: 'Port Harcourt Zone 3',
  group: 'CC3 Group',
  tagline: 'The Word. The Spirit. The Victorious Life.',
  description:
    'Christ Embassy Central Church 3, Port Harcourt — a LoveWorld family raised in the Word, led by the Spirit, taking the divine presence of God to our world. Giving your life a meaning.',

  address: '30B Rumuokwuta/NTA Road, Opposite Patcoin Filling Station, Port Harcourt, Rivers State, Nigeria',
  addressShort: '30B Rumuokwuta/NTA Road, Port Harcourt',
  lat: 4.8427161194266155,
  lng: 6.984262611031861,
  phone: '+234 905 862 8386',
  phones: [
    '+234 905 862 8386',
    '+234 708 913 8631',
    '+234 803 408 8916',
    '+234 703 664 3514',
  ] as const,
  whatsapp: '+234 905 862 8386',
  whatsappNumbers: [
    '+234 905 862 8386',
    '+234 708 913 8631',
    '+234 803 408 8916',
    '+234 703 664 3514',
  ] as const,
  email: 'info@cecentralchurch3.org',
  socials: {
    facebook: 'https://web.facebook.com/cc3phzone3',
    instagram: 'https://www.instagram.com/cephzone3',
    youtube: 'https://www.youtube.com/@ChristEmbassyPHZone3',
    kingschat: 'https://kingschat.online',
    whatsapp: 'https://wa.me/2349058628386'
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Pastors', href: '/pastors' },
    { label: 'Services', href: '/services' },
    { label: 'Group', href: '/group' },
    { label: 'Cells', href: '/cells' },
    { label: 'Events', href: '/events' },
    { label: 'Media', href: '/media' },
    { label: "I'm New", href: '/new-here' }
  ],
  quickActions: [
    { label: 'Watch Live', href: '/online' },
    { label: 'Give', href: '/give', variant: 'gold' as const },
    { label: 'Prayer', href: '/prayer', variant: 'ghost' as const }
  ],
  serviceTimes: [
    { name: 'Sunday Celebration Service', day: 'Sunday', time: '8:00 AM', duration: '3 hrs' },
    { name: 'Prayer & Prophecy Service', day: 'Monday', time: '6:00 PM', duration: '1 hr' },
    { name: 'Midweek Service', day: 'Wednesday', time: '5:30 PM', duration: '2 hrs' },
    { name: 'Prayer Meeting', day: 'Friday', time: '5:30 PM', duration: '1.5 hrs' },
    { name: "Children's Church", day: 'Sunday', time: '8:00 AM', duration: 'During main service', href: '/kids' }
  ],
  footerLinks: {
    church: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Pastors', href: '/pastors' },
      { label: 'Our Vision & Mission', href: '/about#vision' },
      { label: 'Statement of Faith', href: '/about#faith' },
      { label: 'Our History', href: '/about#history' }
    ],
    connect: [
      { label: "I'm New", href: '/new-here' },
      { label: 'Services', href: '/services' },
      { label: 'Cells & Groups', href: '/cells' },
      { label: 'Foundation School', href: '/foundation-school' },
      { label: 'Prayer & Counselling', href: '/prayer' }
    ],
    ministry: [
      { label: 'Ministries', href: '/ministries' },
      { label: 'Events & Programmes', href: '/events' },
      { label: 'Media & Messages', href: '/media' },
      { label: 'Testimonies', href: '/testimonies' },
      { label: 'Give / Partnership', href: '/give' }
    ]
  }
}

export const announcements = [
  {
    id: 'ann-1',
    badge: 'Upcoming',
    title: 'Special Miracle Service — Sunday 8AM · 30B Rumuokwuta/NTA Road',
    href: '/events/special-miracle-service',
    expiresAt: '2026-12-31'
  },
  {
    id: 'ann-2',
    badge: 'Global',
    title: 'ReachOut World Campaign — Join as a Sponsor & Soul-Winner',
    href: '/outreach',
    expiresAt: '2026-12-31'
  }
]
