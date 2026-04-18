// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'

describe('ChartAxisValue', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartAxisValue.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('exports expected API, uses ref-based pattern, plain-text styling', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartAxisValue.tsx')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('ChartAxisValueProps')
    expect(content).toContain('export function ChartAxisValue')
    expect(content).toContain('subscribeHover')
    expect(content).toContain('useChart')
    // plain-text contract — no colored channel fill
    expect(content).toContain('var(--bg)')
    expect(content).toContain('var(--n600)')
    expect(content).toContain('var(--n800)')
    // zero-rerender contract
    expect(content).not.toContain('useState')
  })
})
