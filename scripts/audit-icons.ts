/**
 * @ramtt/icons — Audit Script (Wave 9F)
 *
 * Checks per icon file:
 * 1. Exports a named component matching filename
 * 2. Has displayName
 * 3. Imports from correct base (IconBase / IconBaseSolid / IconBaseDuo / MorphBase / ReactiveBase)
 * 4. No hardcoded colors (context/morph/reactive icons may use CSS variables)
 * 5. No raw <svg> tag in non-base files
 * 6. Base files set viewBox "0 0 24 24"
 * 7. Line: strokeWidth not overridden
 * 8. Solid: uses IconBaseSolid
 * 9. Duo: uses IconBaseDuo
 *
 * Expected: 126 line + 126 solid + 126 duo + 8 animated + 12 context + 11 morph + 30 reactive + 3 bases = 442 files
 *
 * Run: npx tsx scripts/audit-icons.ts
 */

import { readdirSync, readFileSync, existsSync } from 'fs'
import { join, basename } from 'path'

const ICONS_DIR = join(__dirname, '..', 'components', 'icons')

let passed = 0
let failed = 0
const errors: string[] = []

function fail(file: string, msg: string) {
  errors.push(`  FAIL  ${file}: ${msg}`)
  failed++
}

function auditDir(dir: string, variant: 'line' | 'solid' | 'duo' | 'animated' | 'base' | 'context' | 'morph' | 'reactive') {
  if (!existsSync(dir)) return

  const files = readdirSync(dir).filter(
    (f) => f.endsWith('.tsx'),
  )

  for (const file of files) {
    const name = basename(file, '.tsx')
    const content = readFileSync(join(dir, file), 'utf-8')
    let fileOk = true
    const label = variant === 'base' ? file : `${variant}/${file}`

    // 1. Exports a named component matching filename
    const isBase = name.startsWith('IconBase') || name === 'MorphBase' || name === 'ReactiveBase'
    if (!isBase) {
      const exportPattern = new RegExp(`export const ${name}\\b`)
      if (!exportPattern.test(content)) {
        fail(label, `Missing "export const ${name}"`)
        fileOk = false
      }
    }

    // 2. Has displayName
    const displayNamePattern = new RegExp(`\\.displayName\\s*=\\s*'${name}'`)
    if (!displayNamePattern.test(content)) {
      fail(label, `Missing or wrong displayName (expected '${name}')`)
      fileOk = false
    }

    // 3. Correct base import
    if (!isBase) {
      if (variant === 'solid') {
        if (!content.includes('IconBaseSolid')) {
          fail(label, 'Solid icon does not import IconBaseSolid')
          fileOk = false
        }
      } else if (variant === 'duo') {
        if (!content.includes('IconBaseDuo')) {
          fail(label, 'Duo icon does not import IconBaseDuo')
          fileOk = false
        }
      } else if (variant === 'morph') {
        if (!content.includes('MorphBase') && !content.includes('IconBase')) {
          fail(label, 'Does not import MorphBase or IconBase')
          fileOk = false
        }
      } else if (variant === 'reactive') {
        if (!content.includes('ReactiveBase')) {
          fail(label, 'Does not import ReactiveBase')
          fileOk = false
        }
      } else if (variant === 'line' || variant === 'animated' || variant === 'context') {
        if (!content.includes('IconBase')) {
          fail(label, 'Does not import IconBase')
          fileOk = false
        }
      }
    }

    // 4. No hardcoded colors (allow currentColor, "none", and CSS vars in context icons)
    const fillRegex = variant === 'context'
      ? /fill="(?!none|currentColor)[^"]*"/  // context: checked below with var() allowance
      : /fill="(?!none|currentColor)[^"]*"/
    const hardcodedFill = content.match(fillRegex)
    if (hardcodedFill) {
      fail(label, `Hardcoded fill: ${hardcodedFill[0]}`)
      fileOk = false
    }
    if (!isBase) {
      // Context/morph/reactive icons may use stroke="var(--...)"
      const strokeRegex = variant === 'context' || variant === 'morph' || variant === 'reactive'
        ? /stroke="(?!none|currentColor|var\(--|\{)[^"]*"/
        : /stroke="(?!none|currentColor|\{)[^"]*"/
      const hardcodedStroke = content.match(strokeRegex)
      if (hardcodedStroke) {
        fail(label, `Hardcoded stroke color: ${hardcodedStroke[0]}`)
        fileOk = false
      }
    }

    // 5. No raw <svg> in non-base files
    if (!isBase && /<svg[\s>]/.test(content)) {
      fail(label, 'Contains raw <svg> tag')
      fileOk = false
    }

    // 6. Base files: viewBox check
    if (isBase && content.includes('viewBox')) {
      if (!content.includes('viewBox="0 0 24 24"')) {
        fail(label, 'ViewBox is not "0 0 24 24"')
        fileOk = false
      }
    }

    // 7. Line/animated: no strokeWidth override
    if ((variant === 'line' || variant === 'animated') && !isBase) {
      if (/strokeWidth/.test(content)) {
        fail(label, 'Overrides strokeWidth')
        fileOk = false
      }
    }

    if (fileOk) {
      passed++
    }
  }

  return files.length
}

// Audit all directories
const baseCounts = auditDir(ICONS_DIR, 'base') || 0
const lineCounts = auditDir(join(ICONS_DIR, 'line'), 'line') || 0
const solidCounts = auditDir(join(ICONS_DIR, 'solid'), 'solid') || 0
const duoCounts = auditDir(join(ICONS_DIR, 'duo'), 'duo') || 0
const animCounts = auditDir(join(ICONS_DIR, 'animated'), 'animated') || 0
const contextCounts = auditDir(join(ICONS_DIR, 'context'), 'context') || 0
const morphCounts = auditDir(join(ICONS_DIR, 'morph'), 'morph') || 0
const reactiveCounts = auditDir(join(ICONS_DIR, 'reactive'), 'reactive') || 0

const total = passed + failed

// Summary
console.log('')
console.log('═══════════════════════════════════════')
console.log('  @ramtt/icons — Audit Results (9F)')
console.log('═══════════════════════════════════════')
console.log('')
console.log(`  Base:      ${baseCounts}`)
console.log(`  Line:      ${lineCounts}`)
console.log(`  Solid:     ${solidCounts}`)
console.log(`  Duo:       ${duoCounts}`)
console.log(`  Animated:  ${animCounts}`)
console.log(`  Context:   ${contextCounts}`)
console.log(`  Morph:     ${morphCounts}`)
console.log(`  Reactive:  ${reactiveCounts}`)
console.log(`  ─────────────────`)
console.log(`  Total:     ${total}`)
console.log(`  Passed:    ${passed}`)
console.log(`  Failed:    ${failed}`)
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
