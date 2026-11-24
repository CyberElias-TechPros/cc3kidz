import churches from '@/data/groupChurches.json'
import cells from '@/data/cells.json'
import leaders from '@/data/leaders.json'

export type Church = (typeof churches)[number] & {
  pastorBio?: string
  pastorImage?: string
}

export function getAllChurches() {
  return churches as any[]
}

export function getChurchBySlug(slug: string) {
  return (churches as any[]).find((c: any) => c.slug === slug) as any | undefined
}

export function getChurchById(id: string) {
  return (churches as any[]).find((c: any) => c.id === id) as any | undefined
}

export function getCellsForChurch(churchId: string) {
  return (cells as any[]).filter((c: any) => c.churchId === churchId)
}

export function getPastorForChurch(church: any) {
  // Central Church 3 is pastored by Kelson (group leader)
  if (church.id === 'central-church-3') {
    return leaders.find((l: any) => l.id === 'group')
  }
  // For other churches, construct pastor object from church data
  return {
    id: church.id,
    name: church.pastor,
    title: church.title,
    church: church.name,
    zone: 'Port Harcourt Zone 3',
    bio: `${church.pastor} shepherds ${church.name} in ${church.area} — raising a vibrant LoveWorld family, nurturing cells, and taking the divine presence to ${church.area.split('·')[0].trim()} and beyond. Under the oversight of Pastor Kelson Onoriode (Group Pastor) and Pastor Linda Okocha (Zonal Pastor).`,
    image: '/assets/images/leaders/pastor-kelson-onoriode.jpg', // fallback until specific pastor images available
  }
}

export function getChurchStats(church: any) {
  const myCells = getCellsForChurch(church.id)
  const totalMembers = myCells.reduce((sum: number, c: any) => sum + (c.members || 0), 0)
  return {
    cells: myCells.length,
    membersApprox: totalMembers,
    serviceCount: church.serviceTimes?.length || 0,
  }
}
