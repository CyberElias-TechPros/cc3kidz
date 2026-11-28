import { describe, it, expect, beforeAll } from 'vitest'
process.env.SESSION_SECRET = 'test-secret-32chars-long-enough-for-prod'
import { signUserId, verifySessionCookie } from '@/lib/session'

describe('session HMAC', () => {
  it('signs and verifies', () => {
    const c = signUserId('u123')
    expect(c).toContain('u123.')
    expect(verifySessionCookie(c)).toBe('u123')
  })
  it('rejects tampered', () => {
    const c = signUserId('u123')
    const tampered = c.slice(0, -1) + 'x'
    expect(verifySessionCookie(tampered)).toBe(null)
  })
  it('rejects legacy unsigned in prod', () => {
    const orig = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    expect(verifySessionCookie('u123')).toBe(null)
    process.env.NODE_ENV = orig
  })
})
