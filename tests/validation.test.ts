import { describe, it, expect } from 'vitest'
import { visitSchema, prayerSchema, testimonySchema, givingSchema, authRegisterSchema, attendanceSchema, deptAttendanceSchema, foundationProgressSchema, givingVerifySchema, newsletterSchema, contactSchema, volunteerSchema, eventRegSchema } from '@/lib/validation'

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
  it('attendanceSchema validates cellId', () => {
    expect(attendanceSchema.safeParse({ cellId:'', date:'2026-11-26', present: 12 }).success).toBe(false)
    expect(attendanceSchema.safeParse({ cellId:'cell-1', date:'2026-11-26', present: 12 }).success).toBe(true)
  })
  it('deptAttendanceSchema caps present', () => {
    expect(deptAttendanceSchema.safeParse({ departmentId:'ushering', date:'2026-11-26', present: 600 }).success).toBe(false)
  })
  it('foundationProgressSchema requires moduleSlug', () => {
    expect(foundationProgressSchema.safeParse({ moduleSlug:'', completed:true }).success).toBe(false)
    expect(foundationProgressSchema.safeParse({ moduleSlug:'new-creation', completed:true }).success).toBe(true)
  })
  it('givingVerifySchema requires action', () => {
    expect(givingVerifySchema.safeParse({ id:'1', action:'bad' }).success).toBe(false)
    expect(givingVerifySchema.safeParse({ id:'1', action:'verify' }).success).toBe(true)
  })
  it('newsletterSchema validates email', () => {
    expect(newsletterSchema.safeParse({ email:'not-email' }).success).toBe(false)
    expect(newsletterSchema.safeParse({ email:'a@b.co' }).success).toBe(true)
  })
  it('contactSchema requires name/message', () => {
    expect(contactSchema.safeParse({ name:'', message:'hi' }).success).toBe(false)
    expect(contactSchema.safeParse({ name:'John', message:'Hello church, please pray for me' }).success).toBe(true)
  })
})
