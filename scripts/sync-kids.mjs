import { cpSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const src = join(process.cwd(), 'kids')
const dest = join(process.cwd(), 'public', 'kids')

if (!existsSync(src)) {
  console.log('[sync:kids] no kids/ folder, skipping')
  process.exit(0)
}
mkdirSync(join(process.cwd(), 'public'), { recursive: true })
cpSync(src, dest, { recursive: true, force: true })
console.log(`[sync:kids] copied ${src} -> ${dest}`)
