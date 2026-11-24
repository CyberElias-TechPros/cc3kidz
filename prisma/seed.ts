import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

const funds = [
  { name: 'Tithe', slug: 'tithe', description: 'Tithe — 10% acknowledgment', sortOrder: 1 },
  { name: 'Offering', slug: 'offering', description: 'General offering & thanksgiving', sortOrder: 2 },
  { name: 'Partnership — Rhapsody', slug: 'partnership-rhapsody', description: 'Reach every home with Rhapsody of Realities', sortOrder: 3 },
  { name: 'Healing Streams', slug: 'healing-streams', description: 'Healing Streams Live Healing Services', sortOrder: 4 },
  { name: 'Building Project', slug: 'building', description: 'CC3 Permanent Site & Expansion', sortOrder: 5 },
  { name: 'Missions & Outreach', slug: 'missions', description: 'Evangelism, cell outreaches, LoveWorld missions', sortOrder: 6 },
  { name: 'Welfare', slug: 'welfare', description: 'Benevolence & member support', sortOrder: 7 },
  { name: 'LoveWorld TV / Media', slug: 'loveWorld-tv', description: 'Broadcast & media partnership', sortOrder: 8 },
]

async function main(){
  const hash = (p:string)=> bcrypt.hash(p, 10)
  for (const u of [
    { email: 'member@cc3.local', name: 'Demo Member', password: 'member123', role: 'member' as const, cellId: 'cell-1', department: 'Ushering & Hospitality' },
    { email: 'leader@cc3.local', name: 'Cell Leader', password: 'leader123', role: 'leader' as const, cellId: 'cell-1' },
    { email: 'admin@cc3.local', name: 'Admin', password: 'admin123', role: 'admin' as const },
  ]){
    const existing = await prisma.user.findUnique({ where: { email: u.email }})
    if (!existing) await prisma.user.create({ data: { email: u.email, name: u.name, passwordHash: await hash(u.password), role: u.role, cellId: (u as any).cellId, department: (u as any).department }})
  }
  for (const f of funds){
    const existing = await prisma.givingFund.findUnique({ where: { slug: f.slug }})
    if (!existing) await prisma.givingFund.create({ data: f })
    else if (!existing.description) await prisma.givingFund.update({ where:{ id: existing.id }, data:{ description: f.description }})
  }
  // one placeholder bank account per fund if missing, so verify route finds fund
  for (const f of funds){
    const fund = await prisma.givingFund.findUnique({ where: { slug: f.slug }})
    if (!fund) continue
    const has = await prisma.bankAccount.findFirst({ where: { fundId: fund.id }})
    if (!has) await prisma.bankAccount.create({ data: { fundId: fund.id, bankName: 'Update in Admin → Giving', accountName: 'Christ Embassy Central Church 3', accountNo: '0000000000', instructions: 'Set real bank accounts in admin. Until then POP submissions are stored as pending for manual verification.' }})
  }
  console.log('seed done — funds', funds.length)
}
main().finally(()=> prisma.$disconnect())
