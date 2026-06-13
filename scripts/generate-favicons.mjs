import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public')
const svg = readFileSync(join(publicDir, 'favicon.svg'))

const outputs = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'favicon-192x192.png', size: 192 },
  { file: 'favicon-512x512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

for (const { file, size } of outputs) {
  await sharp(svg).resize(size, size).png().toFile(join(publicDir, file))
  console.log(`Generated ${file}`)
}

const icon32 = await sharp(svg).resize(32, 32).png().toBuffer()
writeFileSync(join(publicDir, 'favicon.ico'), icon32)
console.log('Generated favicon.ico')
