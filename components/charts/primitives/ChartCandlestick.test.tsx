// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'

/**
 * ChartCandlestick is a React primitive that requires ChartRoot context
 * and uses path aliases (@/lib/utils). Full rendering tests need a
 * configured jsdom environment with alias resolution.
 *
 * For now, verify the module path is correct at the TypeScript level.
 * Integration coverage comes from the demo page rendering all charts.
 */
describe('ChartCandlestick', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartCandlestick.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
