// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { areaPath } from '../area'

describe('areaPath', () => {
  it('returns empty string for empty data', () => {
    expect(areaPath([], (d) => d, (d) => d, 100)).toBe('')
  })

  it('closes path with baseline', () => {
    const data = [10, 20]
    const d = areaPath(data, (_, i) => i * 50, (v) => v, 100, 0)
    // Should end with Z
    expect(d).toMatch(/Z$/)
    // Should contain baseline y
    expect(d).toContain(',100')
  })

  it('starts with M and uses L commands', () => {
    const data = [5, 15, 25]
    const d = areaPath(data, (_, i) => i * 10, (v) => v, 50, 0)
    expect(d).toMatch(/^M/)
    expect(d).toContain('L')
    expect(d).toMatch(/Z$/)
  })

  it('single point produces valid closed path', () => {
    const data = [42]
    const d = areaPath(data, () => 10, () => 20, 100, 0)
    expect(d).toContain('M10,20')
    expect(d).toContain('L10,100')
    expect(d).toMatch(/Z$/)
  })
})
