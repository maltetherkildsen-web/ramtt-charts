// scripts/audit.ts
// Run with: npm run audit
//
// Unified RAMTT system audit — scans UI components, chart primitives,
// math utilities, and all pages in one pass.
//
// Scope flags:
//   npm run audit              → scan everything
//   npm run audit -- --scope ui     → only UI components
//   npm run audit -- --scope charts → only chart primitives + math

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

const ROOT = process.cwd();
const ERRORS: string[] = [];
const WARNINGS: string[] = [];

// ─── Scope parsing ───
const args = process.argv.slice(2);
const scopeIdx = args.indexOf('--scope');
const scope = scopeIdx >= 0 ? args[scopeIdx + 1] : 'all';
const runUI = scope === 'all' || scope === 'ui';
const runCharts = scope === 'all' || scope === 'charts';
const runPages = scope === 'all';

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

// ─── Banned fonts (regex patterns — avoids false positives like "Interval") ───
const BANNED_FONT_PATTERNS: [RegExp, string][] = [
  [/JetBrains Mono/g, 'JetBrains Mono'],
  [/Space Grotesk/g, 'Space Grotesk'],
  [/Instrument Sans/g, 'Instrument Sans'],
  [/Commit Mono/g, 'Commit Mono'],
  [/['"]Inter['"]/g, 'Inter'],
  [/\bInter,/g, 'Inter'],
];

// ─── Neutral hex colors that should be CSS vars ───
const HEX_TO_VAR: [RegExp, string][] = [
  [/#FAF9F5/gi, 'var(--bg)'],
  [/#FDFCFA/gi, 'var(--n50)'],
  [/#F2F0EA/gi, 'var(--n200)'],
  [/#E8E5DC/gi, 'var(--n400)'],
  [/#D5D3CE/gi, 'var(--n400)'],
  [/#B5B1AA/gi, 'var(--n600)'],
  [/#A8A49A/gi, 'var(--n600)'],
  [/#8A877F/gi, 'var(--n600)'],
  [/#76726A/gi, 'var(--n600)'],
  [/#6B6760/gi, 'var(--n800)'],
  [/#3D3C39/gi, 'var(--n1050)'],
  [/#383633/gi, 'var(--n1050)'],
  [/#131211/gi, 'var(--n1150)'],
  [/#0F0F0E/gi, 'var(--n1150)'],
];

// ─── Whitelists ───
const CLASSNAME_WHITELIST = new Set([
  'ChartSyncProvider.tsx', // logic wrapper, no DOM
  'ChartZoomHandler.tsx',  // logic wrapper, no DOM
]);

// ─── Shadow allowlist ───
// Overlay/floating components render above other content and genuinely need
// box-shadow for depth/elevation. All other files must remain flat.
const SHADOW_ALLOWLIST = new Set([
  'FloatingPanel.tsx',
  'FloatingToolbar.tsx',
  'CommandPalette.tsx',
  'QuickSearch.tsx',
  'Modal.tsx',
  'Drawer.tsx',
  'Popover.tsx',
  'Dropdown.tsx',
  'ContextMenu.tsx',
  'HoverCard.tsx',
  'Combobox.tsx',
  'Toast.tsx',
  'Tooltip.tsx',
  'Select.tsx',
  'ColorPicker.tsx', // picker cursor indicator needs shadow against gradient
  'ChartTooltip.tsx', // chart tooltip floats above chart content
  'ChartTooltip.old.tsx',
  'ChartTreemapPro.tsx', // treemap hover panel floats above blocks
]);

// ─── Banned hardcoded font-weight classes ───
const BANNED_WEIGHT_CLASSES = [
  { pattern: /\bfont-semibold\b/g, fix: 'WEIGHT.strong (font-[550])' },
  { pattern: /\bfont-bold\b/g, fix: 'WEIGHT.strong or reconsider' },
  { pattern: /\bfont-light\b/g, fix: 'WEIGHT.normal or reconsider' },
];

// ─── Required lib/ui.ts exports ───
const REQUIRED_UI_EXPORTS = [
  'WEIGHT', 'FONT', 'RADIUS', 'BORDER', 'TRANSITION',
  'LABEL_STYLE', 'VALUE_STYLE', 'MUTED_STYLE', 'UNIT_STYLE', 'BODY_STYLE', 'QUIET_STYLE',
  'HOVER_SAND', 'ACTIVE_SAND', 'ACTIVE_BLACK', 'WHITE_LIFT', 'ACTIVE_UNDERLINE',
  'FOCUS_RING', 'LAYOUT', 'SIZE_HEIGHTS', 'SIZE_TEXT', 'SIZE_PADDING_X',
];

// ─── Required lib/charts/index.ts exports ───
const REQUIRED_CHART_EXPORTS = [
  'scaleLinear', 'linePath', 'areaPath', 'arcPath', 'pieLayout',
  'niceTicks', 'lttb', 'extent', 'extentOf', 'bisectNearest', 'stackSeries',
];

// ═══════════════════════════════════════════════════════════════
// FILE COLLECTION
// ═══════════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════════
// UNIVERSAL CHECKS (apply to ALL files)
// ═══════════════════════════════════════════════════════════════

function checkBannedFonts(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) continue;
    for (const [pattern, name] of BANNED_FONT_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        ERRORS.push(`${path}:${i + 1}: Banned font "${name}" — use Satoshi (var(--font-sans)) only`);
      }
    }
  }
}

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

function checkNoBoxShadow(path: string, content: string) {
  // Overlay/floating components are exempt — they need shadow for elevation
  const basename = path.split('/').pop() || '';
  if (SHADOW_ALLOWLIST.has(basename)) return;
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//')) continue;
    if (/box-shadow|boxShadow|\bshadow-/.test(line) && !line.includes('shadow-none')) {
      ERRORS.push(`${path}:${i + 1}: box-shadow banned — only allowed in overlay/floating components`);
    }
  }
}

function checkNoExternalChartLibs(path: string, content: string) {
  const banned = ['d3', 'recharts', 'chart.js', 'chartjs', 'visx', 'nivo', 'victory', 'plotly', 'highcharts', 'apexcharts'];
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes('import') && !line.includes('require')) continue;
    for (const lib of banned) {
      if (line.toLowerCase().includes(`'${lib}`) || line.toLowerCase().includes(`"${lib}`)) {
        ERRORS.push(`${path}:${i + 1}: External chart library "${lib}" — zero-dependency system`);
      }
    }
  }
}

function checkTransitionAll(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//')) continue;
    if (line.includes('transition-all') || line.includes('transition: all')) {
      ERRORS.push(`${path}:${i + 1}: transition-all banned — specify exact properties`);
    }
  }
}

function checkNoUppercase(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*')) continue;
    if (/textTransform.*uppercase/i.test(line) || /\buppercase\b/.test(line)) {
      if (!path.includes('lib/ui.ts')) {
        WARNINGS.push(`${path}:${i + 1}: CSS uppercase — sentence case is the rule`);
      }
    }
    if (/letter-spacing|letterSpacing|tracking-\[/.test(line)) {
      WARNINGS.push(`${path}:${i + 1}: letter-spacing/tracking — removed from design system`);
    }
  }
}

function checkNoStateInHandlers(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//')) continue;
    if (/useState.*hover/i.test(line) || /useState.*mouse/i.test(line) || /useState.*active.*bar/i.test(line)) {
      ERRORS.push(`${path}:${i + 1}: React state for hover/mouse — use useRef + rAF for zero re-renders`);
    }
  }
}

// Files that legitimately display hex values as data (color guides, chart data generators)
// tokens/page.tsx displays hex values as documentation content — not styling violations
const HEX_CHECK_SKIP = ['color-guide', 'chart-data', 'generate-data', 'tokens.css', 'tokens/page.tsx', 'colorScale.ts', 'colorInterpolate.ts', 'ChartTreemapPro.tsx'];

function checkHardcodedHex(path: string, content: string) {
  // Skip files that display colors as data
  if (HEX_CHECK_SKIP.some(skip => path.includes(skip))) return;

  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*') || line.trimStart().startsWith('import')) continue;
    for (const [pattern, suggestion] of HEX_TO_VAR) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        const isDataColor = line.includes('color:') && (line.includes('zone') || line.includes('Zone') || line.includes('signal'));
        const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*');
        const isSuppressed = line.includes('audit-ignore-hex');
        if (!isDataColor && !isComment && !isSuppressed) {
          pattern.lastIndex = 0;
          ERRORS.push(`${path}:${i + 1}: Hardcoded neutral ${line.match(pattern)?.[0]} → use ${suggestion}`);
        }
      }
    }
  }
}

function checkBannedWeights(path: string, content: string) {
  if (path.includes('lib/ui.ts')) return;
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//')) continue;
    for (const { pattern, fix } of BANNED_WEIGHT_CLASSES) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        ERRORS.push(`${path}:${i + 1}: Hardcoded ${pattern.source.replace(/\\b/g, '')} → use ${fix}`);
      }
    }
  }
}

/** Run all universal checks on a file */
function runUniversalChecks(path: string, content: string) {
  checkBannedFonts(path, content);
  checkCursorDefault(path, content);
  checkNoBoxShadow(path, content);
  checkNoExternalChartLibs(path, content);
  checkTransitionAll(path, content);
  checkNoUppercase(path, content);
  checkNoStateInHandlers(path, content);
  checkHardcodedHex(path, content);
  checkBannedWeights(path, content);
}

// ═══════════════════════════════════════════════════════════════
// UI-SPECIFIC CHECKS (components/ui/)
// ═══════════════════════════════════════════════════════════════

function checkUIComponent(path: string, content: string) {
  // Must import from lib/ui
  if (!content.includes("from '@/lib/ui'") && !content.includes('from "@/lib/ui"')) {
    ERRORS.push(`${path}: Does not import from lib/ui.ts`);
  }

  // Must have displayName
  if (!content.includes('displayName')) {
    ERRORS.push(`${path}: Missing displayName`);
  }

  // forwardRef on interactive components
  const basename = path.split('/').pop() || '';
  if (!content.includes('forwardRef') &&
      (basename.includes('Button') || basename.includes('Input') ||
       basename.includes('Select') || basename.includes('Toggle'))) {
    WARNINGS.push(`${path}: Interactive component without forwardRef`);
  }

  // Template literals in className
  if (/className=\{`[^`]*`\}/.test(content)) {
    WARNINGS.push(`${path}: Template literal in className → use cn()`);
  }

  // Hardcoded fontFamily in inline styles
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/fontFamily:/.test(line) && !line.includes('var(--font-') && !line.trimStart().startsWith('//')) {
      ERRORS.push(`${path}:${i + 1}: Hardcoded fontFamily → use var(--font-sans) or FONT constants`);
    }
  }
}

function checkUIIntegrity() {
  const uiTsPath = join(ROOT, 'lib/ui.ts');
  if (!existsSync(uiTsPath)) {
    ERRORS.push('lib/ui.ts does not exist');
    return;
  }
  const content = readFileSync(uiTsPath, 'utf-8');
  for (const exp of REQUIRED_UI_EXPORTS) {
    if (!content.includes(`export const ${exp}`)) {
      ERRORS.push(`lib/ui.ts: Missing export: ${exp}`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// CHART-SPECIFIC CHECKS (components/charts/primitives/)
// ═══════════════════════════════════════════════════════════════

function checkChartClassName(path: string, content: string) {
  const basename = path.split('/').pop() || '';
  if (!basename.startsWith('Chart') && !basename.startsWith('Brush')) return;
  if (basename.endsWith('.test.tsx')) return;
  if (CLASSNAME_WHITELIST.has(basename)) return;

  if (!content.includes('className')) {
    WARNINGS.push(`${path}: No className prop — primitives should accept className`);
  }
}

function checkSvgFontFamily(path: string, content: string) {
  const lines = content.split('\n');
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
        if (!textBuffer.includes('fontFamily') && !textBuffer.includes('font-family')) {
          if (!textBuffer.includes('className') || !textBuffer.includes('font-')) {
            WARNINGS.push(`${path}:${textStartLine}: SVG <text> without explicit fontFamily`);
          }
        }
        inTextElement = false;
        textBuffer = '';
      }
    }
  }
}

function checkChartBarrelExports() {
  const indexPath = join(ROOT, 'lib/charts/index.ts');
  if (!existsSync(indexPath)) {
    ERRORS.push('lib/charts/index.ts does not exist');
    return;
  }
  const content = readFileSync(indexPath, 'utf-8');
  for (const exp of REQUIRED_CHART_EXPORTS) {
    if (!content.includes(exp)) {
      ERRORS.push(`lib/charts/index.ts: Missing export: ${exp}`);
    }
  }
}

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
        WARNINGS.push(`lib/charts/${dir}/${file}: No test file found`);
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// RUN AUDIT
// ═══════════════════════════════════════════════════════════════

console.log('\n━━━ RAMTT System Audit ━━━\n');

let totalFiles = 0;

// ── Phase 1: UI Components ──
if (runUI) {
  const uiDir = join(ROOT, 'components/ui');
  if (existsSync(uiDir)) {
    const uiFiles = readdirSync(uiDir).filter(f => f.endsWith('.tsx'));
    console.log(`Phase 1: UI components (${uiFiles.length} files)`);
    totalFiles += uiFiles.length;

    for (const file of uiFiles) {
      const fullPath = join(uiDir, file);
      const content = readFileSync(fullPath, 'utf-8');
      const relPath = `components/ui/${file}`;
      checkUIComponent(relPath, content);
      runUniversalChecks(relPath, content);
    }

    // lib/ui.ts integrity
    checkUIIntegrity();
  }
} else {
  console.log('Phase 1: UI components (skipped)');
}

// ── Phase 2: Chart Primitives ──
if (runCharts) {
  const primDir = join(ROOT, 'components/charts/primitives');
  if (existsSync(primDir)) {
    const primFiles = readdirSync(primDir).filter(f => f.endsWith('.tsx') || (f.endsWith('.ts') && !f.includes('.test.')));
    console.log(`Phase 2: Chart primitives (${primFiles.length} files)`);
    totalFiles += primFiles.length;

    for (const file of primFiles) {
      const fullPath = join(primDir, file);
      const content = readFileSync(fullPath, 'utf-8');
      const relPath = `components/charts/primitives/${file}`;
      checkChartClassName(relPath, content);
      checkSvgFontFamily(relPath, content);
      runUniversalChecks(relPath, content);
    }

    // Barrel exports + math tests
    checkChartBarrelExports();
    checkMathTests();
  }
} else {
  console.log('Phase 2: Chart primitives (skipped)');
}

// ── Phase 3: Math Utilities ──
if (runCharts) {
  const chartsDir = join(ROOT, 'lib/charts');
  const mathFiles: string[] = [];
  function collectTs(dir: string) {
    if (!existsSync(dir)) return;
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const stat = statSync(full);
      if (stat.isDirectory() && entry !== '__tests__' && entry !== 'node_modules') {
        collectTs(full);
      } else if (stat.isFile() && entry.endsWith('.ts') && !entry.includes('.test.')) {
        mathFiles.push(full);
      }
    }
  }
  collectTs(chartsDir);
  console.log(`Phase 3: Math utilities (${mathFiles.length} files)`);
  totalFiles += mathFiles.length;

  for (const fullPath of mathFiles) {
    const content = readFileSync(fullPath, 'utf-8');
    const relPath = relative(ROOT, fullPath);
    checkNoExternalChartLibs(relPath, content);
    checkBannedFonts(relPath, content);
  }
} else {
  console.log('Phase 3: Math utilities (skipped)');
}

// ── Phase 4: Pages ──
if (runPages) {
  const appFiles = collectFiles(join(ROOT, 'app'), /\.tsx$/);
  console.log(`Phase 4: Pages (${appFiles.length} files)`);
  totalFiles += appFiles.length;

  for (const fullPath of appFiles) {
    const content = readFileSync(fullPath, 'utf-8');
    const relPath = relative(ROOT, fullPath);
    runUniversalChecks(relPath, content);
  }
} else {
  console.log('Phase 4: Pages (skipped)');
}

// ═══════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════

console.log('\n─── Results ───\n');

if (ERRORS.length === 0 && WARNINGS.length === 0) {
  console.log('✅ All files pass RAMTT system audit!\n');
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

console.log(`Audited ${totalFiles} files across ui, charts, and pages.\n`);
process.exit(ERRORS.length > 0 ? 1 : 0);
