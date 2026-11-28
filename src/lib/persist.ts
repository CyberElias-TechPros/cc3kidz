import fs from 'node:fs'
import path from 'node:path'

const DATA_DIR = path.join(process.cwd(), '.data')
const FILE = path.join(DATA_DIR, 'db.json')

type PersistShape = Record<string, any>

function ensureDir(){
  try { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }) } catch {}
}
export function loadPersist(): PersistShape {
  try {
    if (!fs.existsSync(FILE)) return {}
    return JSON.parse(fs.readFileSync(FILE, 'utf8'))
  } catch { return {} }
}
export function savePersist(data: PersistShape){
  try {
    ensureDir()
    const tmp = FILE + '.tmp'
    fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf8')
    fs.renameSync(tmp, FILE)
  } catch { /* read-only FS in production — ignore */ }
}
export function mergeIntoGlobal(key: string, fallback: any[]){
  const g: any = globalThis as any
  g.__cc3 = g.__cc3 || {}
  const file = loadPersist()
  if (file[key] && Array.isArray(file[key]) && !g.__cc3[key]?.length){
    g.__cc3[key] = file[key]
  } else if (!g.__cc3[key]){
    g.__cc3[key] = fallback
  }
}
export function flushKey(key: string){
  const g: any = globalThis as any
  const file = loadPersist()
  file[key] = g.__cc3?.[key] ?? []
  file['_updatedAt'] = new Date().toISOString()
  savePersist(file)
}
export function scheduleFlush(key: string){
  // fire-and-forget; next tick
  setTimeout(()=> {
    try { flushKey(key) } catch {}
  }, 50)
}
