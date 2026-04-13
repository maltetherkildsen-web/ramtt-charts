/**
 * @ramtt/icons — Audit Script
 *
 * Checks:
 * 1. Every icon file exports a named component matching its filename
 * 2. Every icon has displayName
 * 3. Every icon uses IconBase (imports from './IconBase')
 * 4. No hardcoded colors (no fill="#..." or stroke="#...")
 * 5. No hardcoded sizes (no width="24" or height="24" — must use size prop via IconBase)
 * 6. ViewBox is always "0 0 24 24" (set by IconBase)
 * 7. strokeWidth is always 1.5 (inherited from IconBase, not overridden)
 *
 * Run: npx tsx scripts/audit-icons.ts
 */

import { readdirSync, readFileSync } from 'fs'
import { join, basename } from 'path'

const ICONS_DIR = join(__dirname, '..', 'components', 'icons')

const files = readdirSync(ICONS_DIR).filter(
  (f) => f.endsWith('.tsx') && f !== 'index.ts',
)

let passed = 0
let failed = 0
const errors: string[] = []

function fail(file: string, msg: string) {
  errors.push(`  FAIL  ${file}: ${msg}`)
  failed++
}

for (const file of files) {
  const name = basename(file, '.tsx')
  const content = readFileSync(join(ICONS_DIR, file), 'utf-8')
  let fileOk = true

  // 1. Exports a named component matching filename
  if (name !== 'IconBase') {
    const exportPattern = new RegExp(`export const ${name}\\b`)
    if (!exportPattern.test(content)) {
      fail(file, `Missing "export const ${name}"`)
      fileOk = false
    }
  }

  // 2. Has displayName
  const displayNamePattern = new RegExp(`\\.displayName\\s*=\\s*'${name}'`)
  if (!displayNamePattern.test(content)) {
    fail(file, `Missing or wrong displayName (expected '${name}')`)
    fileOk = false
  }

  // 3. Non-IconBase files must import from IconBase
  if (name !== 'IconBase') {
    if (!content.includes("from './IconBase'")) {
      fail(file, 'Does not import from ./IconBase')
      fileOk = false
    }
  }

  // 4. No hardcoded colors (allow currentColor, "none", fillOpacity)
  const hardcodedFill = content.match(/fill="(?!none|currentColor)[^"]*"/)
  if (hardcodedFill) {
    fail(file, `Hardcoded fill: ${hardcodedFill[0]}`)
    fileOk = false
  }
  const hardcodedStrokeColor = content.match(
    /stroke="(?!none|currentColor|\{)[^"]*"/,
  )
  if (hardcodedStrokeColor && name !== 'IconBase') {
    fail(file, `Hardcoded stroke color: ${hardcodedStrokeColor[0]}`)
    fileOk = false
  }

  // 5. No hardcoded sizes — no <svg> tag in non-IconBase files
  //    (width/height on <rect>, <circle> etc. is valid SVG geometry)
  if (name !== 'IconBase') {
    if (/<svg[\s>]/.test(content)) {
      fail(file, 'Contains raw <svg> tag (should use IconBase wrapper)')
      fileOk = false
    }
  }

  // 6. IconBase must set viewBox "0 0 24 24"
  if (name === 'IconBase') {
    if (!content.includes('viewBox="0 0 24 24"')) {
      fail(file, 'ViewBox is not "0 0 24 24"')
      fileOk = false
    }
  }

  // 7. No strokeWidth override in non-IconBase files
  if (name !== 'IconBase') {
    if (/strokeWidth/.test(content)) {
      fail(file, 'Overrides strokeWidth (should inherit 1.5 from IconBase)')
      fileOk = false
    }
  }

  // IconBase must set strokeWidth to 1.5
  if (name === 'IconBase') {
    if (!content.includes('strokeWidth={1.5}')) {
      fail(file, 'strokeWidth is not 1.5')
      fileOk = false
    }
  }

  if (fileOk) {
    passed++
  }
}

// Summary
console.log('')
console.log('═══════════════════════════════════════')
console.log('  @ramtt/icons — Audit Results')
console.log('═══════════════════════════════════════')
console.log('')
console.log(`  Files scanned:  ${files.length}`)
console.log(`  Passed:         ${passed}`)
console.log(`  Failed:         ${failed}`)
console.log('')

if (errors.length > 0) {
  console.log('  Errors:')
  for (const err of errors) {
    console.log(err)
  }
  console.log('')
  process.exit(1)
}

console.log('  All checks passed.')
console.log('')
