// scripts/audit-ui.ts
// Run with: npm run audit:ui
//
// Comprehensive @ramtt/ui design system audit.
// Scans components/ui/ AND all app pages for violations.

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const ERRORS: string[] = [];
const WARNINGS: string[] = [];

// ─── Hardcoded hex colors that should be CSS vars ───
const HEX_TO_VAR: [RegExp, string][] = [
  [/#FAF9F5/gi, 'var(--bg)'],
  [/#FDFCFA/gi, 'var(--n50)'],
  [/#F2F0EA/gi, 'var(--n200)'],
  [/#E8E5DC/gi, 'var(--n400)'],
  [/#D5D3CE/gi, 'var(--n400) or similar'],
  [/#B5B1AA/gi, 'var(--n600) or similar'],
  [/#A8A49A/gi, 'var(--n600)'],
  [/#8A877F/gi, 'var(--n600)'],
  [/#76726A/gi, 'var(--n600)'],
  [/#6B6760/gi, 'var(--n800)'],
  [/#3D3C39/gi, 'var(--n1050)'],
  [/#383633/gi, 'var(--n1050)'],
  [/#131211/gi, 'var(--n1150)'],
  [/#0F0F0E/gi, 'var(--n1150)'],
];

// ─── Allowed hex colors (chart data, zones, signals — NOT UI chrome) ───
const ALLOWED_HEX = new Set([
  // Zone colors (power, HR, CHO)
  '#7ca3be', '#14b8a2', '#e8b020', '#e36b30', '#e83b52', '#9b40e8',
  '#94a3b8', '#22c55e', '#eab308', '#f97316', '#ef4444', '#dc2626',
  // Signal/chart line colors
  '#3b82f6', '#8b5cf6', '#a8a49a', '#f43f5e',
  // Dark dropdown
  '#1e1e1e', '#2a2a2a',
  // White
  '#ffffff', '#fff',
]);

// ─── Collect all .tsx files recursively ───
function collectFiles(dir: string, pattern: RegExp): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules' && entry !== '.next') {
      results.push(...collectFiles(full, pattern));
    } else if (stat.isFile() && pattern.test(entry)) {
      results.push(full);
    }
  }
  return results;
}

// ─── Audit: Component files (components/ui/*.tsx) ───
function auditComponent(path: string, content: string) {
  // Must import from lib/ui
  if (!content.includes("from '@/lib/ui'") && !content.includes('from "@/lib/ui"')) {
    ERRORS.push(`${path}: Does not import from lib/ui.ts`);
  }

  // Must have displayName
  if (!content.includes('displayName')) {
    ERRORS.push(`${path}: Missing displayName`);
  }

  // No transition-all
  if (content.includes('transition-all')) {
    ERRORS.push(`${path}: transition-all is banned → use TRANSITION constants`);
  }

  // No hardcoded font-family in JS
  if (content.includes('fontFamily:') && !content.includes('var(--font-')) {
    ERRORS.push(`${path}: Hardcoded fontFamily → use FONT constants or var(--font-sans)`);
  }

  // Should have forwardRef on interactive components
  const basename = path.split('/').pop() || '';
  if (!content.includes('forwardRef') &&
      (basename.includes('Button') || basename.includes('Input') ||
       basename.includes('Select') || basename.includes('Toggle') ||
       basename.includes('Switch') || basename.includes('Modal') ||
       basename.includes('Dropdown') || basename.includes('Tabs'))) {
    WARNINGS.push(`${path}: Interactive component without forwardRef`);
  }

  // Template literals in className
  if (/className=\{`[^`]*`\}/.test(content)) {
    WARNINGS.push(`${path}: Template literal in className → use cn()`);
  }
}

// ─── Audit: Any file for design system violations ───
function auditDesignSystem(path: string, content: string) {
  const lines = content.split('\n');

  // ── Hardcoded hex colors ──
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Skip imports, comments, and type definitions
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*') || line.trimStart().startsWith('import')) continue;

    for (const [pattern, suggestion] of HEX_TO_VAR) {
      const matches = line.match(pattern);
      if (matches) {
        // Check it's not in an allowed context (chart data colors, zone definitions)
        const isZoneDefinition = line.includes('color:') && (line.includes('Zone') || line.includes('zone') || line.includes('Z1') || line.includes('Z2') || line.includes('Z3') || line.includes('Z4') || line.includes('Z5') || line.includes('Z6'));
        const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*');
        if (!isZoneDefinition && !isComment) {
          ERRORS.push(`${path}:${i + 1}: Hardcoded ${matches[0]} → use ${suggestion}`);
        }
      }
    }
  }

  // ── Hardcoded font-weight classes ──
  const fontWeightPatterns = [
    { pattern: /\bfont-semibold\b/g, fix: 'WEIGHT.strong' },
    { pattern: /\bfont-bold\b/g, fix: 'WEIGHT.strong or reconsider' },
    { pattern: /\bfont-light\b/g, fix: 'WEIGHT.normal or reconsider' },
  ];
  for (const { pattern, fix } of fontWeightPatterns) {
    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i]) && !lines[i].trim().startsWith('//')) {
        ERRORS.push(`${path}:${i + 1}: Hardcoded ${pattern.source.replace(/\\b/g, '')} → use ${fix}`);
      }
    }
  }

  // font-medium is only OK inside lib/ui.ts (as WEIGHT.medium definition)
  if (!path.includes('lib/ui.ts')) {
    for (let i = 0; i < lines.length; i++) {
      if (/\bfont-medium\b/.test(lines[i]) && !lines[i].trim().startsWith('//')) {
        WARNINGS.push(`${path}:${i + 1}: font-medium → consider using WEIGHT.medium constant`);
      }
    }
  }

  // ── transition-all ──
  if (content.includes('transition-all')) {
    ERRORS.push(`${path}: transition-all is banned → use TRANSITION.colors / .background / .opacity / .transform`);
  }

  // ── Uppercase text (CSS) ──
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/\buppercase\b/.test(line) && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
      // Allow in badge component for zone badges, and in lib/ui.ts
      if (!path.includes('lib/ui.ts')) {
        WARNINGS.push(`${path}:${i + 1}: CSS uppercase found → sentence case is the rule. Only Z1-Z6, FTP, CP, HR, BPM, RPM are uppercase (via data, not CSS)`);
      }
    }
  }

  // ── Letter-spacing / tracking ──
  for (let i = 0; i < lines.length; i++) {
    if (/tracking-\[/.test(lines[i]) && !lines[i].trim().startsWith('//')) {
      WARNINGS.push(`${path}:${i + 1}: tracking-[...] found → removed from design system (no letter-spacing)`);
    }
  }

  // ── Hardcoded border-radius ──
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/\brounded(?!-\[var)(?!-full)\b/.test(line) && !line.trim().startsWith('//')) {
      // 'rounded' alone (4px default) or 'rounded-lg' etc — should use RADIUS constants
      if (/\brounded-(?:sm|md|lg|xl|2xl|3xl)\b/.test(line)) {
        WARNINGS.push(`${path}:${i + 1}: Tailwind rounded-* → consider using RADIUS constants from lib/ui.ts`);
      }
    }
  }

  // ── Hardcoded fontFamily in inline styles ──
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/fontFamily:/.test(line) && !line.includes('var(--font-') && !line.trim().startsWith('//')) {
      ERRORS.push(`${path}:${i + 1}: Hardcoded fontFamily → use var(--font-sans) or FONT constants`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// RUN AUDIT
// ═══════════════════════════════════════════════════════════════

console.log('\n━━━ @ramtt/ui Design System Audit ━━━\n');

// ── Phase 1: Component files ──
const UI_DIR = join(ROOT, 'components/ui');
const componentFiles = readdirSync(UI_DIR).filter(f => f.endsWith('.tsx'));
console.log(`Phase 1: Components (${componentFiles.length} files)`);
componentFiles.forEach(file => {
  const fullPath = join(UI_DIR, file);
  const content = readFileSync(fullPath, 'utf-8');
  const relPath = `components/ui/${file}`;
  auditComponent(relPath, content);
  auditDesignSystem(relPath, content);
});

// ── Phase 2: App pages ──
const appFiles = collectFiles(join(ROOT, 'app'), /\.tsx$/);
const pageFiles = appFiles.filter(f => !f.includes('node_modules'));
console.log(`Phase 2: App pages (${pageFiles.length} files)`);
pageFiles.forEach(fullPath => {
  const relPath = relative(ROOT, fullPath);
  const content = readFileSync(fullPath, 'utf-8');
  auditDesignSystem(relPath, content);
});

// ── Phase 3: Chart primitives ──
const chartDir = join(ROOT, 'components/charts/primitives');
if (existsSync(chartDir)) {
  const chartFiles = readdirSync(chartDir).filter(f => f.endsWith('.tsx'));
  console.log(`Phase 3: Chart primitives (${chartFiles.length} files)`);
  chartFiles.forEach(file => {
    const fullPath = join(chartDir, file);
    const content = readFileSync(fullPath, 'utf-8');
    const relPath = `components/charts/primitives/${file}`;
    auditDesignSystem(relPath, content);
  });
}

// ── Phase 4: lib/ui.ts integrity ──
console.log('Phase 4: lib/ui.ts integrity');
const uiTs = readFileSync(join(ROOT, 'lib/ui.ts'), 'utf-8');
const requiredExports = ['WEIGHT', 'FONT', 'RADIUS', 'BORDER', 'TRANSITION', 'LABEL_STYLE', 'VALUE_STYLE', 'MUTED_STYLE', 'UNIT_STYLE', 'BODY_STYLE', 'QUIET_STYLE', 'HOVER_SAND', 'ACTIVE_SAND', 'ACTIVE_BLACK', 'WHITE_LIFT', 'ACTIVE_UNDERLINE', 'FOCUS_RING', 'LAYOUT', 'SIZE_HEIGHTS', 'SIZE_TEXT', 'SIZE_PADDING_X', 'MODAL_WIDTH', 'TOAST_MAX_VISIBLE', 'TOAST_DEFAULT_DURATION', 'DROPDOWN_ITEM', 'SWITCH_TRACK', 'SWITCH_THUMB'];
for (const exp of requiredExports) {
  if (!uiTs.includes(`export const ${exp}`)) {
    ERRORS.push(`lib/ui.ts: Missing export: ${exp}`);
  }
}

// ═══════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════

const totalFiles = componentFiles.length + pageFiles.length + (existsSync(chartDir) ? readdirSync(chartDir).filter(f => f.endsWith('.tsx')).length : 0);

console.log('\n─── Results ───\n');

if (ERRORS.length === 0 && WARNINGS.length === 0) {
  console.log('✅ All files pass design system audit!\n');
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

console.log(`Audited ${totalFiles} files across components, pages, and chart primitives.\n`);
process.exit(ERRORS.length > 0 ? 1 : 0);
