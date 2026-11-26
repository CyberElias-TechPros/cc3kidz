/**
 * Email abstraction — production uses Resend when RESEND_API_KEY is set,
 * otherwise logs (dev) so forgot-password still works in local/CI.
 * Swap provider by replacing `send()` implementation.
 */
import { env } from './env'

type SendOpts = { to: string; subject: string; html?: string; text?: string; from?: string }

export async function sendEmail(opts: SendOpts){
  const from = opts.from || env.EMAIL_FROM
  if (!env.RESEND_API_KEY) {
    console.log(`[email:stub] To=${opts.to} Subject="${opts.subject}"\n${opts.text || opts.html || ''}`)
    return { ok: true as const, stub: true }
  }
  try {
    // Lazy import to avoid bundling when not needed
    const { Resend } = await import('resend').catch(()=> ({ Resend: null as any }))
    if (!Resend) {
      console.warn('[email] resend package not installed, falling back to log')
      console.log(`[email:stub] To=${opts.to} Subject="${opts.subject}"`)
      return { ok: true as const, stub: true }
    }
    const resend = new Resend(env.RESEND_API_KEY)
    const r = await resend.emails.send({ from, to: opts.to, subject: opts.subject, html: opts.html, text: opts.text })
    if ((r as any).error) throw new Error(String((r as any).error))
    return { ok: true as const, id: (r as any).data?.id }
  } catch (e:any) {
    console.error('[email] send failed', e?.message)
    return { ok: false as const, error: e?.message }
  }
}

export function resetPasswordEmail(to: string, token: string, origin: string){
  const link = `${origin}/forgot-password?token=${encodeURIComponent(token)}`
  return {
    subject: 'Reset your CC3 password',
    text: `You requested a password reset for your CC3 account (${to}).\n\nOpen this link to set a new password (expires in 1 hour):\n${link}\n\nIf you didn't ask for this, ignore this email.`,
    html: `<p>You requested a password reset for <b>${to}</b>.</p><p><a href="${link}">Set new password</a> — expires in 1 hour.</p><p>If you didn't ask for this, ignore this email.</p>`,
  }
}
