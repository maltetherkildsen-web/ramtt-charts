// scripts/add-copyright-headers.ts
// Run with: npx tsx scripts/add-copyright-headers.ts

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const ROOT = process.cwd();
const HEADER = `// Copyright (c) 2026 RAMTT (Malte Therkildsen)\n// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.\n\n`;

let updated = 0;
let skipped = 0;

function collectFiles(dir: string): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules' && entry !== '.next' && entry !== 'dist') {
      results.push(...collectFiles(full));
    } else if (stat.isFile() && (entry.endsWith('.ts') || entry.endsWith('.tsx'))) {
      results.push(full);
    }
  }
  return results;
}

const dirs = [
  join(ROOT, 'lib'),
  join(ROOT, 'components'),
  join(ROOT, 'types'),
];

for (const dir of dirs) {
  const files = collectFiles(dir);
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    if (content.startsWith('// Copyright')) {
      skipped++;
      continue;
    }
    writeFileSync(file, HEADER + content);
    updated++;
  }
}

console.log(`\nCopyright headers added: ${updated} files updated, ${skipped} already had headers.\n`);
