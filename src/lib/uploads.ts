/**
 * Upload abstraction — writes to Vercel Blob when BLOB_READ_WRITE_TOKEN is set,
 * otherwise to local public/uploads/pop (dev). Provides stable `popUrl` that
 * works in both modes. On Vercel without Blob token, warns and still writes
 * to ephemeral FS (data lost on redeploy — but flow still works).
 */
import fs from 'node:fs'
import path from 'node:path'

export type StoredFile = { url: string; mime: string; size: number }

export async function storePop(file: File, uid: () => string): Promise<StoredFile> {
  const allowed = ['image/jpeg','image/png','image/webp','application/pdf']
  if (file.type && !allowed.includes(file.type)) throw new Error('POP must be JPG, PNG, WEBP or PDF')
  const maxMb = Number(process.env.UPLOAD_MAX_MB || '8')
  if (file.size > maxMb * 1024 * 1024) throw new Error(`POP file too large (max ${maxMb}MB)`)

  const rawExt = (file.name?.split('.').pop() || '').toLowerCase()
  const extByMime: Record<string,string> = { 'image/jpeg':'jpg','image/png':'png','image/webp':'webp','application/pdf':'pdf' }
  const safeExts = new Set(['jpg','jpeg','png','webp','pdf'])
  let ext = safeExts.has(rawExt) ? rawExt : extByMime[file.type] || 'jpg'
  if (ext === 'jpeg') ext = 'jpg'
  const fname = `${Date.now()}-${uid()}.${ext}`.replace(/[^a-zA-Z0-9._-]/g,'_')
  const buf = Buffer.from(await file.arrayBuffer())
  const mime = file.type || 'image/jpeg'

  // Try Vercel Blob first if token present
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN
  if (blobToken) {
    try {
      const { put } = await import('@vercel/blob').catch(()=> ({ put: null as any }))
      if (put) {
        const blob = await put(`pop/${fname}`, buf, { access:'public', contentType: mime })
        return { url: blob.url, mime, size: buf.length }
      }
    } catch (e:any) {
      console.warn('[uploads] blob put failed, falling back to local', e?.message)
    }
  }

  // Local fallback (dev + vercel ephemeral)
  const dir = path.join(process.cwd(), 'public','uploads','pop')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive:true })
  fs.writeFileSync(path.join(dir, fname), buf)
  if (blobToken === undefined && process.env.NODE_ENV === 'production') {
    console.warn('[uploads] No BLOB_READ_WRITE_TOKEN — POP stored ephemerally on Vercel, will be lost. Set token in Vercel env.')
  }
  return { url: `/uploads/pop/${fname}`, mime, size: buf.length }
}
