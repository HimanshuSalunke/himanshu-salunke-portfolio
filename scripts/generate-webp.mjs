/**
 * Generates .webp siblings next to existing JPG/PNG under public/images.
 * Safe to re-run - skips files that already have a webp sibling.
 */
import { readdirSync, statSync, existsSync } from 'fs'
import { join, extname, basename, dirname } from 'path'
import sharp from 'sharp'

const ROOT = join(process.cwd(), 'public', 'images')

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (/\.(jpe?g|png)$/i.test(name)) out.push(full)
  }
  return out
}

async function main() {
  if (!existsSync(ROOT)) {
    console.error('public/images not found')
    process.exit(1)
  }

  const files = walk(ROOT)
  let created = 0
  let skipped = 0

  for (const file of files) {
    const webp = join(dirname(file), `${basename(file, extname(file))}.webp`)
    if (existsSync(webp)) {
      skipped += 1
      continue
    }
    await sharp(file).webp({ quality: 78 }).toFile(webp)
    created += 1
    console.log('created', webp.replace(process.cwd(), ''))
  }

  console.log(`Done. created=${created} skipped=${skipped} total=${files.length}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
