// scripts/audit-ui.ts
// Run with: npm run audit:ui

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const UI_DIR = join(process.cwd(), 'components/ui');
const ERRORS: string[] = [];
const WARNINGS: string[] = [];

function auditFile(filename: string, content: string) {
  const path = `components/ui/${filename}`;

  // ─── ERRORS (must fix) ───

  // No hardcoded font-family
  if (content.includes('fontFamily:')) {
    ERRORS.push(`${path}: Hardcoded fontFamily found. Use FONT constants from lib/ui.ts`);
  }

  // No transition-all
  if (content.includes('transition-all')) {
    ERRORS.push(`${path}: transition-all is banned. Use TRANSITION.colors or TRANSITION.background from lib/ui.ts`);
  }

  // Must have displayName
  if (!content.includes('displayName')) {
    ERRORS.push(`${path}: Missing displayName. Add ComponentName.displayName = 'ComponentName'`);
  }

  // Must import from lib/ui
  if (!content.includes("from '@/lib/ui'") && !content.includes('from "@/lib/ui"')) {
    ERRORS.push(`${path}: Does not import from lib/ui.ts. All components must use shared utilities.`);
  }

  // No hardcoded border-[0.5px] without BORDER import
  const borderMatches = content.match(/border-\[0\.5px\]/g);
  if (borderMatches && !content.includes('BORDER')) {
    ERRORS.push(`${path}: Hardcoded border-[0.5px] found without BORDER import. Use BORDER.default or BORDER.subtle from lib/ui.ts`);
  }

  // ─── WARNINGS (should fix) ───

  // Should have forwardRef (for interactive components)
  if (!content.includes('forwardRef') &&
      (filename.includes('Button') || filename.includes('Input') ||
       filename.includes('Select') || filename.includes('Toggle'))) {
    WARNINGS.push(`${path}: Interactive component without forwardRef`);
  }

  // Should have className prop
  if (!content.includes('className')) {
    WARNINGS.push(`${path}: No className prop found. Components should accept className for overrides.`);
  }

  // Should use cn() not template literals for classes
  const templateClassMatch = content.match(/className=\{`[^`]*`\}/g);
  if (templateClassMatch) {
    WARNINGS.push(`${path}: Template literal in className. Use cn() from lib/ui.ts instead.`);
  }

  // Check for inline styles (except CSS variable bridge, dynamic widths, shadows, and SVG exceptions)
  const styleMatches = content.match(/style=\{\{[^}]+\}\}/g);
  if (styleMatches) {
    styleMatches.forEach(match => {
      const isDynamic = match.includes('width') || match.includes('height') ||
        match.includes('backgroundColor: fill') || match.includes('boxShadow') ||
        match.includes('color: DELTA') || match.includes('color: SUBTITLE') ||
        match.includes('border:') // Badge dynamic color borders
      if (!isDynamic) {
        WARNINGS.push(`${path}: Inline style found: ${match.substring(0, 80)}... Consider Tailwind class.`);
      }
    });
  }
}

// Run audit
const files = readdirSync(UI_DIR).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
  const content = readFileSync(join(UI_DIR, file), 'utf-8');
  auditFile(file, content);
});

// Report
console.log('\n─── @ramtt/ui Consistency Audit ───\n');

if (ERRORS.length === 0 && WARNINGS.length === 0) {
  console.log('✅ All components pass consistency checks!\n');
} else {
  if (ERRORS.length > 0) {
    console.log(`❌ ${ERRORS.length} ERROR(S):\n`);
    ERRORS.forEach(e => console.log(`  ${e}`));
    console.log('');
  }
  if (WARNINGS.length > 0) {
    console.log(`⚠️  ${WARNINGS.length} WARNING(S):\n`);
    WARNINGS.forEach(w => console.log(`  ${w}`));
    console.log('');
  }
}

console.log(`Audited ${files.length} component files.\n`);
process.exit(ERRORS.length > 0 ? 1 : 0);
