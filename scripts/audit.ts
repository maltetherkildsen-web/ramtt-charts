// scripts/audit.ts
// Run with: npm run audit
//
// Unified RAMTT system audit — merges the former audit-ui.ts + audit-charts.ts
// into a single script with --scope flags.
//
// Scopes:
//   npm run audit                  → everything (default)
//   npm run audit -- --scope ui    → components/ui, app pages, chart primitives
//                                    (design checks only), lib/ui.ts integrity, tokens.css
//   npm run audit -- --scope charts → chart primitives (chart-specific checks),
//                                     lib/charts math files, math tests, barrel exports,
//                                     app/demo/page.tsx chart checks
//
// No rule changes vs the legacy scripts. The 8 chart-specific checks exist
// to protect app/chart-test/page.tsx — see brief in docs/.

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

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════

// Banned fonts — Satoshi only. Legacy audit-charts.ts patterns.
const BANNED_FONT_PATTERNS: [RegExp, string][] = [
  [/JetBrains Mono/g, 'JetBrains Mono'],
  [/Space Grotesk/g, 'Space Grotesk'],
  [/Instrument Sans/g, 'Instrument Sans'],
  [/Commit Mono/g, 'Commit Mono'],
  [/['"]Inter['"]/g, 'Inter'],
  [/\bInter,/g, 'Inter'],
];

// Neutral hex values that must be CSS vars. Merged from both legacy scripts —
// superset of audit-charts and audit-ui lists.
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

// className prop whitelist — logic-only wrappers that don't render DOM.
// Source: legacy audit-charts.ts CLASS_NAME_WHITELIST.
const CLASSNAME_WHITELIST = new Set([
  'ChartSyncProvider.tsx',
  'ChartZoomHandler.tsx',
]);

// Banned hardcoded font-weight utility classes. Legacy audit-ui.ts.
const BANNED_WEIGHT_CLASSES = [
  { pattern: /\bfont-semibold\b/g, fix: 'WEIGHT.strong (font-[550])' },
  { pattern: /\bfont-bold\b/g, fix: 'WEIGHT.strong or reconsider' },
  { pattern: /\bfont-light\b/g, fix: 'WEIGHT.normal or reconsider' },
];

// Full lib/ui.ts required-exports list, copied verbatim from legacy audit-ui.ts.
const REQUIRED_UI_EXPORTS = [
  'WEIGHT', 'FONT', 'RADIUS', 'BORDER', 'TRANSITION',
  'LABEL_STYLE', 'VALUE_STYLE', 'MUTED_STYLE', 'UNIT_STYLE', 'BODY_STYLE', 'QUIET_STYLE',
  'HOVER_SAND', 'ACTIVE_SAND', 'ACTIVE_BLACK', 'WHITE_LIFT', 'ACTIVE_UNDERLINE',
  'FOCUS_RING', 'LAYOUT', 'SIZE_HEIGHTS', 'SIZE_TEXT', 'SIZE_PADDING_X',
  'MODAL_WIDTH', 'TOAST_MAX_VISIBLE', 'TOAST_DEFAULT_DURATION', 'DROPDOWN_ITEM',
  'SWITCH_TRACK', 'SWITCH_THUMB', 'TOOLTIP_BG', 'TOOLTIP_TEXT', 'TOOLTIP_RADIUS',
  'TOOLTIP_PADDING', 'SLIDER_TRACK_HEIGHT', 'SLIDER_THUMB_SIZE', 'AVATAR_SIZES',
  'SIDEBAR_WIDTH', 'SIDEBAR_ITEM_STYLE', 'SIDEBAR_ITEM_ACTIVE', 'GAUGE_SIZES',
  'CALENDAR_CELL_SIZE', 'CALENDAR_WEEK_STARTS_ON', 'PAGE_BUTTON_SIZE',
  'PAGE_BUTTON_ACTIVE', 'DRAWER_WIDTHS', 'SPINNER_SIZES', 'SEPARATOR_DEFAULT',
  'SEPARATOR_SUBTLE', 'SCROLLBAR_WIDTH', 'SCROLLBAR_THUMB_MIN', 'SCROLLBAR_THUMB_COLOR',
  'SCROLLBAR_THUMB_HOVER', 'SCROLLBAR_THUMB_ACTIVE', 'DOT_SIZES', 'STEPPER_BUTTON_WIDTH',
  'STEPPER_REPEAT_DELAY', 'STEPPER_REPEAT_INTERVAL', 'STEP_DOT_SIZE',
  'STEP_DOT_COMPLETED', 'STEP_DOT_UPCOMING', 'RATING_SEGMENT_SIZE',
  'WIDGET_ICON_SIZE', 'WIDGET_ICON_COLOR', 'WIDGET_ICON_HOVER', 'GRID_COLUMNS',
  'GRID_ROW_HEIGHT', 'GRID_GAP', 'STAT_SIZES', 'BADGE_NOTIFY_SIZE', 'BADGE_NOTIFY_DOT',
  'BADGE_NOTIFY_MAX', 'DARK', 'CATEGORY_COLORS', 'DOMAIN',
];

const REQUIRED_UI_FUNCTIONS = ['formatTime', 'formatPercent', 'formatCompact'];

const REQUIRED_CHART_EXPORTS = [
  'scaleLinear', 'linePath', 'areaPath', 'arcPath', 'pieLayout',
  'niceTicks', 'lttb', 'extent', 'extentOf', 'bisectNearest', 'stackSeries',
];

const DOMAIN_KEYS = ['nutrition', 'training', 'body'] as const;
const TOKEN_SUFFIXES = [
  '', '-pressed', '-hover', '-toggle', '-text', '-icon',
  '-icon-light', '-icon-lightest', '-border', '-selection',
  '-wash', '-badge', '-soft', '-light',
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
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

function collectTs(dir: string, out: string[]) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory() && entry !== '__tests__' && entry !== 'node_modules') {
      collectTs(full, out);
    } else if (stat.isFile() && entry.endsWith('.ts') && !entry.includes('.test.')) {
      out.push(full);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// DESIGN CHECKS — apply to every scanned file
// Legacy source: audit-ui.ts `auditDesignSystem`
// ═══════════════════════════════════════════════════════════════

function checkHardcodedHex(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trimStart().startsWith('//') || line.trimStart().startsWith('*') || line.trimStart().startsWith('import')) continue;

    // Inline suppression: developer has documented intent on this line.
    // Scoped to hex-color check only — no audit-ignore-everything loophole.
    if (line.includes('audit-ignore-hex')) continue;

    for (const [pattern, suggestion] of HEX_TO_VAR) {
      pattern.lastIndex = 0;
      const matches = line.match(pattern);
      if (matches) {
        const isZoneDefinition = line.includes('color:') && (
          line.includes('Zone') || line.includes('zone') ||
          line.includes('Z1') || line.includes('Z2') || line.includes('Z3') ||
          line.includes('Z4') || line.includes('Z5') || line.includes('Z6')
        );
        if (!isZoneDefinition) {
          ERRORS.push(`${path}:${i + 1}: Hardcoded ${matches[0]} → use ${suggestion}`);
        }
      }
    }
  }
}

function checkBannedWeights(path: string, content: string) {
  if (path.includes('lib/ui.ts')) return;
  const lines = content.split('\n');
  for (const { pattern, fix } of BANNED_WEIGHT_CLASSES) {
    for (let i = 0; i < lines.length; i++) {
      pattern.lastIndex = 0;
      if (pattern.test(lines[i]) && !lines[i].trim().startsWith('//')) {
        ERRORS.push(`${path}:${i + 1}: Hardcoded ${pattern.source.replace(/\\b/g, '')} → use ${fix}`);
      }
    }
  }
  // font-medium outside lib/ui.ts — warning
  for (let i = 0; i < lines.length; i++) {
    if (/\bfont-medium\b/.test(lines[i]) && !lines[i].trim().startsWith('//')) {
      WARNINGS.push(`${path}:${i + 1}: font-medium → consider using WEIGHT.medium constant`);
    }
  }
}

function checkTransitionAll(path: string, content: string) {
  if (content.includes('transition-all') || content.includes('transition: all')) {
    ERRORS.push(`${path}: transition-all is banned → use TRANSITION.colors / .background / .opacity / .transform`);
  }
}

function checkUppercase(path: string, content: string) {
  if (path.includes('lib/ui.ts')) return;
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('//') || line.trim().startsWith('*')) continue;
    if (/\buppercase\b/.test(line)) {
      WARNINGS.push(`${path}:${i + 1}: CSS uppercase found → sentence case is the rule. Only Z1-Z6, FTP, CP, HR, BPM, RPM are uppercase (via data, not CSS)`);
    }
  }
}

function checkTracking(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (/tracking-\[/.test(lines[i]) && !lines[i].trim().startsWith('//')) {
      WARNINGS.push(`${path}:${i + 1}: tracking-[...] found → removed from design system (no letter-spacing)`);
    }
  }
}

function checkRoundedTailwind(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('//')) continue;
    if (/\brounded-(?:sm|md|lg|xl|2xl|3xl)\b/.test(line)) {
      WARNINGS.push(`${path}:${i + 1}: Tailwind rounded-* → consider using RADIUS constants from lib/ui.ts`);
    }
  }
}

function checkFontFamilyInline(path: string, content: string) {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/fontFamily:/.test(line) && !line.includes('var(--font-') && !line.trim().startsWith('//')) {
      ERRORS.push(`${path}:${i + 1}: Hardcoded fontFamily → use var(--font-sans) or FONT constants`);
    }
  }
}

function runDesignChecks(path: string, content: string) {
  checkHardcodedHex(path, content);
  checkBannedWeights(path, content);
  checkTransitionAll(path, content);
  checkUppercase(path, content);
  checkTracking(path, content);
  checkRoundedTailwind(path, content);
  checkFontFamilyInline(path, content);
}

// ═══════════════════════════════════════════════════════════════
// UI-COMPONENT CHECKS — components/ui/ only
// Legacy source: audit-ui.ts `auditComponent`
// ═══════════════════════════════════════════════════════════════

function checkUIComponent(path: string, content: string) {
  if (!content.includes("from '@/lib/ui'") && !content.includes('from "@/lib/ui"')) {
    ERRORS.push(`${path}: Does not import from lib/ui.ts`);
  }
  if (!content.includes('displayName')) {
    ERRORS.push(`${path}: Missing displayName`);
  }
  // transition-all and fontFamily already covered by runDesignChecks

  // forwardRef on interactive components — long legacy whitelist preserved
  const basename = path.split('/').pop() || '';
  if (!content.includes('forwardRef') &&
      (basename.includes('Button') || basename.includes('Input') ||
       basename.includes('Select') || basename.includes('Toggle') ||
       basename.includes('Switch') || basename.includes('Modal') ||
       basename.includes('Dropdown') || basename.includes('Tabs') ||
       basename.includes('Slider') || basename.includes('Accordion') ||
       basename.includes('Tooltip') || basename.includes('Textarea') ||
       basename.includes('Checkbox') || basename.includes('Radio') ||
       basename.includes('FileUpload') || basename.includes('Sidebar') ||
       basename.includes('Calendar') || basename.includes('DatePicker') ||
       basename.includes('Popover') || basename.includes('Command') ||
       basename.includes('Pagination') || basename.includes('Drawer') ||
       basename.includes('Combobox') || basename.includes('Collapsible') ||
       basename.includes('InputGroup') || basename.includes('ScrollArea') ||
       basename.includes('HoverCard') || basename.includes('Resizable') ||
       basename.includes('ContextMenu') || basename.includes('NumberStepper') ||
       basename.includes('RatingInput') || basename.includes('TimePicker') ||
       basename.includes('StepFlow') || basename.includes('WidgetCard') ||
       basename.includes('WidgetPicker') || basename.includes('DashboardGrid') ||
       basename.includes('RangeSlider') || basename.includes('FormField') ||
       basename.includes('NotificationBadge') ||
       basename.includes('CategoryIcon') || basename.includes('CommandPalette'))) {
    WARNINGS.push(`${path}: Interactive component without forwardRef`);
  }

  if (/className=\{`[^`]*`\}/.test(content)) {
    WARNINGS.push(`${path}: Template literal in className → use cn()`);
  }
}

// ═══════════════════════════════════════════════════════════════
// CHART-PRIMITIVE CHECKS — components/charts/primitives/ only
// Legacy source: audit-charts.ts
// ═══════════════════════════════════════════════════════════════

function checkChartClassName(path: string, content: string) {
  const basename = path.split('/').pop() || '';
  if (!basename.startsWith('Chart') && !basename.startsWith('Brush')) return;
  if (basename.endsWith('.test.tsx')) return;
  if (CLASSNAME_WHITELIST.has(basename)) return;
  if (!content.includes('className')) {
    WARNINGS.push(`${path}: No className prop — primitives should accept className for customization`);
  }
}

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
            WARNINGS.push(`${path}:${textStartLine}: SVG <text> without explicit fontFamily — Tailwind font classes don't work on SVG text`);
          }
        }
        inTextElement = false;
        textBuffer = '';
      }
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
  if (/on(?:Pointer|Mouse)Move.*set[A-Z]/.test(content) || /set[A-Z].*on(?:Pointer|Mouse)Move/.test(content)) {
    WARNINGS.push(`${path}: Possible setState in pointer/mouse handler — verify zero re-renders on hover`);
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
  // Legacy audit-charts.ts exemption: any path containing 'Tooltip' is skipped.
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

function runChartPrimitiveChecks(path: string, content: string) {
  // Mirrors legacy audit-charts.ts chart primitive loop exactly.
  checkChartClassName(path, content);
  checkBannedFonts(path, content);
  checkSvgFontFamily(path, content);
  checkNoStateInHandlers(path, content);
  checkCursorDefault(path, content);
  checkNoBoxShadow(path, content);
  checkNoExternalChartLibs(path, content);
  checkUppercase(path, content);
  checkTransitionAll(path, content);
  checkHardcodedHex(path, content);
}

// ═══════════════════════════════════════════════════════════════
// STRUCTURAL CHECKS
// ═══════════════════════════════════════════════════════════════

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
  for (const fn of REQUIRED_UI_FUNCTIONS) {
    if (!content.includes(`export function ${fn}`)) {
      ERRORS.push(`lib/ui.ts: Missing export: ${fn}`);
    }
  }
}

function checkDomainTokens() {
  const tokensPath = join(ROOT, 'components/ui/tokens.css');
  if (!existsSync(tokensPath)) {
    ERRORS.push('components/ui/tokens.css does not exist');
    return;
  }
  const tokensCss = readFileSync(tokensPath, 'utf-8');
  for (const domain of DOMAIN_KEYS) {
    for (const suffix of TOKEN_SUFFIXES) {
      const token = `--domain-${domain}${suffix}`;
      if (!tokensCss.includes(token)) {
        ERRORS.push(`tokens.css: Missing domain token: ${token}`);
      }
    }
  }
  for (const suffix of TOKEN_SUFFIXES) {
    const token = `--accent${suffix}`;
    if (!tokensCss.includes(token)) {
      ERRORS.push(`tokens.css: Missing accent alias: ${token}`);
    }
  }
  if (!tokensCss.includes('var(--accent-selection)')) {
    ERRORS.push('tokens.css: ::selection should use var(--accent-selection)');
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
        WARNINGS.push(`lib/charts/${dir}/${file}: No test file found — math utilities should have tests`);
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// RUN AUDIT
// ═══════════════════════════════════════════════════════════════

const scopeLabel = scope === 'all' ? '' : ` (scope: ${scope})`;
console.log(`\n━━━ RAMTT System Audit${scopeLabel} ━━━\n`);

let totalFiles = 0;

// ── Phase 1: UI components ──
if (runUI) {
  const uiDir = join(ROOT, 'components/ui');
  if (existsSync(uiDir)) {
    const uiFiles = readdirSync(uiDir).filter(f => f.endsWith('.tsx'));
    console.log(`Phase 1: Components (${uiFiles.length} files)`);
    totalFiles += uiFiles.length;
    for (const file of uiFiles) {
      const fullPath = join(uiDir, file);
      const content = readFileSync(fullPath, 'utf-8');
      const relPath = `components/ui/${file}`;
      checkUIComponent(relPath, content);
      runDesignChecks(relPath, content);
    }
  }
} else {
  console.log('Phase 1: Components (skipped)');
}

// ── Phase 2: App pages ──
if (runUI) {
  const pageFiles = collectFiles(join(ROOT, 'app'), /\.tsx$/);
  console.log(`Phase 2: App pages (${pageFiles.length} files)`);
  totalFiles += pageFiles.length;
  for (const fullPath of pageFiles) {
    const content = readFileSync(fullPath, 'utf-8');
    const relPath = relative(ROOT, fullPath);
    runDesignChecks(relPath, content);
  }
} else {
  console.log('Phase 2: App pages (skipped)');
}

// ── Phase 3: Chart primitives ──
// Design checks under UI scope (legacy audit-ui.ts Phase 3).
// Chart-specific checks under charts scope (legacy audit-charts.ts Phase 2).
// Under 'all' scope: chart-specific checks cover hex/uppercase/transition-all,
// so runDesignChecks is supplemented with only the non-overlapping design checks
// to avoid duplicate-reporting.
if (runUI || runCharts) {
  const primDir = join(ROOT, 'components/charts/primitives');
  if (existsSync(primDir)) {
    const primFiles = readdirSync(primDir).filter(f => f.endsWith('.tsx') || (f.endsWith('.ts') && !f.includes('.test.')));
    console.log(`Phase 3: Chart primitives (${primFiles.length} files)`);
    totalFiles += primFiles.length;
    for (const file of primFiles) {
      const fullPath = join(primDir, file);
      const content = readFileSync(fullPath, 'utf-8');
      const relPath = `components/charts/primitives/${file}`;
      if (runCharts) {
        runChartPrimitiveChecks(relPath, content);
      }
      if (runUI) {
        if (runCharts) {
          // 'all' scope: add only design checks not covered by chart primitive set
          checkBannedWeights(relPath, content);
          checkTracking(relPath, content);
          checkRoundedTailwind(relPath, content);
          checkFontFamilyInline(relPath, content);
        } else {
          // 'ui' only: full design check set (legacy audit-ui.ts Phase 3)
          runDesignChecks(relPath, content);
        }
      }
    }
  }
} else {
  console.log('Phase 3: Chart primitives (skipped)');
}

// ── Phase 4: Math utilities (lib/charts/**/*.ts) ──
if (runCharts) {
  const mathFiles: string[] = [];
  collectTs(join(ROOT, 'lib/charts'), mathFiles);
  console.log(`Phase 4: Math utilities (${mathFiles.length} files)`);
  totalFiles += mathFiles.length;
  for (const fullPath of mathFiles) {
    const content = readFileSync(fullPath, 'utf-8');
    const relPath = relative(ROOT, fullPath);
    checkBannedFonts(relPath, content);
    checkNoExternalChartLibs(relPath, content);
  }
} else {
  console.log('Phase 4: Math utilities (skipped)');
}

// ── Phase 5: Demo page (app/demo/page.tsx chart checks) ──
if (runCharts) {
  const demoPath = join(ROOT, 'app/demo/page.tsx');
  if (existsSync(demoPath)) {
    console.log('Phase 5: Demo page');
    const content = readFileSync(demoPath, 'utf-8');
    const relPath = 'app/demo/page.tsx';
    checkBannedFonts(relPath, content);
    checkNoBoxShadow(relPath, content);
    checkNoExternalChartLibs(relPath, content);
    checkTransitionAll(relPath, content);
    checkUppercase(relPath, content);
    checkCursorDefault(relPath, content);
    checkHardcodedHex(relPath, content);
  }
} else {
  console.log('Phase 5: Demo page (skipped)');
}

// ── Phase 6: Math tests + barrel exports ──
if (runCharts) {
  console.log('Phase 6: Math tests + barrel exports');
  checkMathTests();
  checkChartBarrelExports();
} else {
  console.log('Phase 6: Math tests + barrel (skipped)');
}

// ── Phase 7: lib/ui.ts integrity ──
if (runUI) {
  console.log('Phase 7: lib/ui.ts integrity');
  checkUIIntegrity();
} else {
  console.log('Phase 7: lib/ui.ts integrity (skipped)');
}

// ── Phase 8: tokens.css domain + accent tokens ──
if (runUI) {
  console.log('Phase 8: tokens.css domain + accent tokens');
  checkDomainTokens();
} else {
  console.log('Phase 8: tokens.css (skipped)');
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

console.log(`Audited ${totalFiles} files.\n`);
process.exit(ERRORS.length > 0 ? 1 : 0);
