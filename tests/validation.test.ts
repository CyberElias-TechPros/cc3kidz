import { describe, it, expect } from 'vitest'
import { visitSchema, prayerSchema, testimonySchema, givingSchema, authRegisterSchema } from '@/lib/validation'

describe('validation', () => {
  it('visitSchema happy path', () => {
    const r = visitSchema.safeParse({ name: 'John Doe', phone: '08012345678', date: '2026-11-30', visitors: 2 })
    expect(r.success).toBe(true)
  })
  it('prayerSchema requires body', () => {
    expect(prayerSchema.safeParse({ body: 'hi' }).success).toBe(false)
    expect(prayerSchema.safeParse({ body: 'Please pray for my family healing' }).success).toBe(true)
  })
  it('testimonySchema enforces consent', () => {
    expect(testimonySchema.safeParse({ name: 'Grace', title: 'Healed', category: 'Healing', body: 'A long testimony body that is over twenty characters', consent: false }).success).toBe(false)
  })
  it('givingSchema rejects negative amount', () => {
    expect(givingSchema.safeParse({ fundSlug: 'tithe', amount: -100 }).success).toBe(false)
    expect(givingSchema.safeParse({ fundSlug: 'tithe', amount: 5000 }).success).toBe(true)
  })
  it('authRegisterSchema validates email', () => {
    expect(authRegisterSchema.safeParse({ name: 'A', email: 'bad', password: 'short' }).success).toBe(false)
  })
})
