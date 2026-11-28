function safeBase(){
  const raw = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://cecentralchurch3.org').trim()
  try { new URL(raw); return raw } catch { return 'https://cecentralchurch3.org' }
}
export default function sitemap() {
  const base = safeBase()
  const routes = [
    '', '/about', '/pastors', '/services', '/group', '/ministries', '/cells', '/events', '/media', '/testimonies', '/prayer', '/new-here', '/foundation-school', '/outreach', '/give', '/contact', '/online', '/gallery', '/resources',
    '/calendar', '/faq', '/safeguarding', '/impact', '/search',
    '/teens', '/teens/about', '/teens/church', '/teens/word', '/teens/activities', '/teens/gifts', '/teens/events', '/teens/resources', '/teens/connect', '/youth', '/youth/about', '/youth/church', '/youth/word', '/youth/rise', '/youth/growth', '/youth/community', '/youth/media', '/youth/events', '/youth/connect', '/kids', '/kids/about', '/kids/classes', '/kids/lessons', '/kids/events', '/kids/gallery', '/kids/kids-corner', '/kids/parents', '/kids/resources', '/kids/contact',
    '/login', '/register', '/privacy', '/terms'
  ]
  const churchSlugs = ['central-church-3','ozuoba-church','rumuekini-church','rumuosi-church','higherlife-church','east-west-central-church']
  churchSlugs.forEach(s=>routes.push(`/group/${s}`))
  churchSlugs.forEach(s=>routes.push(`/churches/${s}`))
  // also include dynamic slugs
  const lessonSlugs = ['noah-and-the-great-ark','david-and-goliath','daniel-in-the-lions-den','esther-the-brave-queen','joseph-the-dreamer','jonah-and-the-big-fish','the-good-samaritan','jesus-feeds-5000','the-prodigal-son','creation-story']
  lessonSlugs.forEach(s=>routes.push(`/kids/lessons/${s}`))
  return routes.map(p => ({ url: `${base}${p}`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: p === '' ? 1 : p.startsWith('/kids') ? 0.9 : 0.8 }))
}
