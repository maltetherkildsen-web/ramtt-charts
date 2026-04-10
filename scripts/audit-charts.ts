// scripts/audit-charts.ts
// Run with: npm run audit:charts
//
// Automated @ramtt/charts system audit.
// Checks primitives, math utilities, barrel exports, and demo page.

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const ERRORS: string[] = [];
const WARNINGS: string[] = [];

// ─── Banned fonts (regex patterns to avoid false positives like "Interval") ───
const BANNED_FONT_PATTERNS: [RegExp, string][] = [
  [/JetBrains Mono/g, 'JetBrains Mono'],
  [/Space Grotesk/g, 'Space Grotesk'],
  [/Instrument Sans/g, 'Instrument Sans'],
  [/Commit Mono/g, 'Commit Mono'],
  // "Inter" needs quotes or comma context to avoid matching "Interval", "Internal", etc.
  [/['"]Inter['"]/g, 'Inter'],
  [/\bInter,/g, 'Inter'],
];

// ─── Neutral hex colors that should be CSS vars ───
const HEX_TO_VAR: [RegExp, string][] = [
  [/#FAF9F5/gi, 'var(--bg)'],
  [/#FDFCFA/gi, 'var(--n50)'],
  [/#F2F0EA/gi, 'var(--n200)'],
  [/#E8E5DC/gi, 'var(--n400)'],
  [/#A8A49A/gi, 'var(--n600)'],
  [/#76726A/gi, 'var(--n600)'],
  [/#6B6760/gi, 'var(--n800)'],
  [/#383633/gi, 'var(--n1050)'],
  [/#131211/gi, 'var(--n1150)'],
  [/#0F0F0E/gi, 'var(--n1150)'],
];

// ─── Allowed hex colors (chart data, zones, signals) ───
const ALLOWED_HEX = new Set([
  // Tailwind standard chart colors
  '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899',
  '#14b8a6', '#06b6d4', '#f97316', '#84cc16', '#a855f7', '#f43f5e',
  // Signal/zone colors
  '#10b981', '#dc2626', '#d97706', '#0891b2',
  // Muted/UI
  '#71717a',
  // White
  '#ffffff', '#fff',
  // Dark backgrounds
  '#1e1e1e', '#2a2a2a',
]);

// ═══════════════════════════════════════════════════════════════
// CHECK FUNCTIONS
// ═══════════════════════════════════════════════════════════════

// ── 1. Barrel export completeness ──
function checkBarrelExports() {
  const primDir = join(ROOT, 'components/charts/primitives');
  const chartFiles = readdirSync(primDir)
    .filter(f => f.endsWith('.tsx') && f.startsWith('Chart'));

  // Check that each Chart*.tsx can be imported (file exists)
  // We just verify the files exist — barrel imports are by file path, not index
  console.log(`  Found ${chartFiles.length} Chart*.tsx primitives`);

  // Check lib/charts/index.ts exports all math modules
  const indexPath = join(ROOT, 'lib/charts/index.ts');
  if (!existsSync(indexPath)) {
    ERRORS.push('lib/charts/index.ts does not exist');
    return;
  }

  const indexContent = readFileSync(indexPath, 'utf-8');

  // Check key exports
  const requiredExports = [
    'scaleLinear', 'linePath', 'areaPath', 'arcPath', 'pieLayout',
    'niceTicks', 'lttb', 'extent', 'extentOf',
    'bisectNearest', 'stackSeries',
  ];

  for (const exp of requiredExports) {
    if (!indexContent.includes(exp)) {
      ERRORS.push(`lib/charts/index.ts: Missing export: ${exp}`);
    }
  }
}

// ── 2. className prop on every primitive ──
// Non-visual wrappers that don't render DOM are whitelisted
const CLASS_NAME_WHITELIST = new Set(['ChartSyncProvider.tsx', 'ChartZoomHandler.tsx']);

function checkClassNameProp(path: string, content: string) {
  const basename = path.split('/').pop() || '';
  if (!basename.startsWith('Chart') && !basename.startsWith('Brush')) return;
  if (basename.endsWith('.test.tsx')) return;
  if (CLASS_NAME_WHITELIST.has(basename)) return;

  if (!content.includes('className')) {
    WARNINGS.push(`${path}: No className prop — primitives should accept className for customization`);
  }
}

// ── 3. No banned fonts ──
function checkBannedFonts(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) continue;

    for (const [pattern, name] of BANNED_FONT_PATTERNS) {
      pattern.lastIndex = 0; // reset regex state
      if (pattern.test(line)) {
        ERRORS.push(`${path}:${i + 1}: Banned font "${name}" — use Satoshi (var(--font-sans)) only`);
      }
    }
  }
}

// ── 4. SVG <text> must have explicit fontFamily ──
function checkSvgFontFamily(path: string, content: string) {
  const lines = content.split('\n');
  // Track multiline <text> elements
  let inTextElement = false;
  let textStartLine = 0;
  let textBuffer = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('<text')) {
      inTextElement = true;
      textStartLine = i + 1;
      textBuffer = line;
    }

    if (inTextElement) {
      if (!textBuffer.includes(line)) textBuffer += line;

      if (line.includes('>') || line.includes('/>')) {
        // Text element complete — check for fontFamily
        if (!textBuffer.includes('fontFamily') && !textBuffer.includes('font-family')) {
          // Skip if it's in a comment or JSX expression that sets className with font
          if (!textBuffer.includes('className') || !textBuffer.includes('font-')) {
            WARNINGS.push(`${path}:${textStartLine}: SVG <text> without explicit fontFamily — Tailwind font classes don't work on SVG text`);
          }
        }
        inTextElement = false;
        textBuffer = '';
      }
    }
  }
}

// ── 5. No React state in pointer/mouse handlers ──
function checkNoStateInHandlers(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//')) continue;

    // Check for useState with hover/mouse/pointer-related names
    if (/useState.*hover/i.test(line) || /useState.*mouse/i.test(line) || /useState.*active.*bar/i.test(line)) {
      ERRORS.push(`${path}:${i + 1}: React state for hover/mouse — use useRef + rAF for zero re-renders`);
    }
  }

  // Check for setState inside onPointerMove / onMouseMove handlers
  if (/on(?:Pointer|Mouse)Move.*set[A-Z]/.test(content) || /set[A-Z].*on(?:Pointer|Mouse)Move/.test(content)) {
    // This is a rough heuristic — might false-positive, so make it a warning
    WARNINGS.push(`${path}: Possible setState in pointer/mouse handler — verify zero re-renders on hover`);
  }
}

// ── 6. cursor: default everywhere ──
function checkCursorDefault(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//')) continue;

    if (/cursor[:\s]*pointer/i.test(line) && !line.includes('// allowed')) {
      ERRORS.push(`${path}:${i + 1}: cursor: pointer is banned — use cursor: default`);
    }
    if (/cursor[:\s]*crosshair/i.test(line) && !line.includes('// allowed')) {
      ERRORS.push(`${path}:${i + 1}: cursor: crosshair is banned — use cursor: default`);
    }
  }
}

// ── 7. No box-shadow (allowed on tooltips/floating elements) ──
function checkNoBoxShadow(path: string, content: string) {
  // Tooltips are floating elements — shadow is OK
  if (path.includes('Tooltip')) return;

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//')) continue;

    if (/box-shadow|boxShadow|\bshadow-/.test(line) && !line.includes('shadow-none')) {
      ERRORS.push(`${path}:${i + 1}: box-shadow is banned on chart components — no shadows on cards or static elements`);
    }
  }
}

// ── 8. No external chart library imports ──
function checkNoExternalChartLibs(path: string, content: string) {
  const banned = ['d3', 'recharts', 'chart.js', 'chartjs', 'visx', 'nivo', 'victory', 'plotly', 'highcharts', 'apexcharts'];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('import') && !line.includes('require')) continue;

    for (const lib of banned) {
      if (line.toLowerCase().includes(`'${lib}`) || line.toLowerCase().includes(`"${lib}`)) {
        ERRORS.push(`${path}:${i + 1}: External chart library "${lib}" — @ramtt/charts is zero-dependency`);
      }
    }
  }
}

// ── 9. Tests exist for math utilities ──
function checkMathTests() {
  const mathDirs = ['scales', 'paths', 'ticks', 'utils'];
  const chartsDir = join(ROOT, 'lib/charts');

  for (const dir of mathDirs) {
    const fullDir = join(chartsDir, dir);
    if (!existsSync(fullDir)) continue;

    const files = readdirSync(fullDir).filter(f => f.endsWith('.ts') && !f.startsWith('__') && !f.includes('.test.'));
    const testDir = join(fullDir, '__tests__');
    const hasTestDir = existsSync(testDir);

    for (const file of files) {
      const baseName = file.replace('.ts', '');
      const testExists =
        (hasTestDir && existsSync(join(testDir, `${baseName}.test.ts`))) ||
        existsSync(join(fullDir, `${baseName}.test.ts`));

      if (!testExists) {
        WARNINGS.push(`lib/charts/${dir}/${file}: No test file found — math utilities should have tests`);
      }
    }
  }
}

// ── 10. No uppercase text-transform ──
function checkNoUppercase(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) continue;

    if (/textTransform.*uppercase/i.test(line) || /\buppercase\b/.test(line)) {
      WARNINGS.push(`${path}:${i + 1}: CSS uppercase — sentence case is the rule (except abbreviations like Z1-Z6, FTP, HR)`);
    }
    if (/letter-spacing|letterSpacing|tracking-\[/.test(line)) {
      WARNINGS.push(`${path}:${i + 1}: letter-spacing/tracking — removed from design system`);
    }
  }
}

// ── 11. transition-all ban ──
function checkTransitionAll(path: string, content: string) {
  if (content.includes('transition-all') || content.includes('transition: all')) {
    ERRORS.push(`${path}: transition-all is banned — specify exact properties (opacity, transform, etc.)`);
  }
}

// ── 12. Hardcoded neutral hex in inline styles ──
function checkHardcodedHex(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*') || line.trimStart().startsWith('import')) continue;

    for (const [pattern, suggestion] of HEX_TO_VAR) {
      if (pattern.test(line)) {
        // Skip zone/data color definitions and comments
        const isDataColor = line.includes('color:') && (line.includes('zone') || line.includes('Zone') || line.includes('signal'));
        if (!isDataColor) {
          ERRORS.push(`${path}:${i + 1}: Hardcoded neutral ${line.match(pattern)?.[0]} → use ${suggestion}`);
        }
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// RUN AUDIT
// ═══════════════════════════════════════════════════════════════

console.log('\n━━━ @ramtt/charts System Audit ━━━\n');

// ── Phase 1: Barrel exports & math layer integrity ──
console.log('Phase 1: Barrel exports & math layer');
checkBarrelExports();
checkMathTests();

// ── Phase 2: Chart primitives ──
const primDir = join(ROOT, 'components/charts/primitives');
const primFiles = readdirSync(primDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
console.log(`Phase 2: Chart primitives (${primFiles.length} files)`);

for (const file of primFiles) {
  const fullPath = join(primDir, file);
  const content = readFileSync(fullPath, 'utf-8');
  const relPath = `components/charts/primitives/${file}`;

  checkClassNameProp(relPath, content);
  checkBannedFonts(relPath, content);
  checkSvgFontFamily(relPath, content);
  checkNoStateInHandlers(relPath, content);
  checkCursorDefault(relPath, content);
  checkNoBoxShadow(relPath, content);
  checkNoExternalChartLibs(relPath, content);
  checkNoUppercase(relPath, content);
  checkTransitionAll(relPath, content);
  checkHardcodedHex(relPath, content);
}

// ── Phase 3: Math utilities ──
const mathFiles: string[] = [];
const chartsDir = join(ROOT, 'lib/charts');
function collectTs(dir: string) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    try {
      const stat = require('fs').statSync(full);
      if (stat.isDirectory() && entry !== '__tests__' && entry !== 'node_modules') {
        collectTs(full);
      } else if (stat.isFile() && entry.endsWith('.ts') && !entry.includes('.test.')) {
        mathFiles.push(full);
      }
    } catch { /* skip */ }
  }
}
collectTs(chartsDir);
console.log(`Phase 3: Math utilities (${mathFiles.length} files)`);

for (const fullPath of mathFiles) {
  const content = readFileSync(fullPath, 'utf-8');
  const relPath = relative(ROOT, fullPath);
  checkNoExternalChartLibs(relPath, content);
  checkBannedFonts(relPath, content);
}

// ── Phase 4: Demo page ──
const demoPath = join(ROOT, 'app/demo/page.tsx');
if (existsSync(demoPath)) {
  console.log('Phase 4: Demo page');
  const content = readFileSync(demoPath, 'utf-8');
  checkBannedFonts('app/demo/page.tsx', content);
  checkNoBoxShadow('app/demo/page.tsx', content);
  checkNoExternalChartLibs('app/demo/page.tsx', content);
  checkTransitionAll('app/demo/page.tsx', content);
  checkNoUppercase('app/demo/page.tsx', content);
  checkCursorDefault('app/demo/page.tsx', content);
  checkHardcodedHex('app/demo/page.tsx', content);
}

// ═══════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════

const totalFiles = primFiles.length + mathFiles.length + (existsSync(demoPath) ? 1 : 0);

console.log('\n─── Results ───\n');

if (ERRORS.length === 0 && WARNINGS.length === 0) {
  console.log('✅ All files pass @ramtt/charts system audit!\n');
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

console.log(`Audited ${totalFiles} files across primitives, math layer, and demo.\n`);
process.exit(ERRORS.length > 0 ? 1 : 0);
