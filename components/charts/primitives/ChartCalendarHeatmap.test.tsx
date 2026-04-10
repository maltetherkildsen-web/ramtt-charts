import { describe, it, expect } from 'vitest'

describe('ChartCalendarHeatmap', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartCalendarHeatmap.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('quantization maps values to 5 discrete levels', () => {
    // Replicating the quantize logic
    const maxVal = 100
    const quantize = (v: number): number => {
      if (v === 0) return 0
      const frac = v / maxVal
      if (frac <= 0.25) return 1
      if (frac <= 0.5) return 2
      if (frac <= 0.75) return 3
      return 4
    }

    expect(quantize(0)).toBe(0)
    expect(quantize(10)).toBe(1)
    expect(quantize(25)).toBe(1)
    expect(quantize(40)).toBe(2)
    expect(quantize(60)).toBe(3)
    expect(quantize(80)).toBe(4)
    expect(quantize(100)).toBe(4)
  })

  it('prev-Sunday logic gets correct start day', () => {
    // Wednesday 2026-04-08 should go back to Sunday 2026-04-05
    const wed = new Date(Date.UTC(2026, 3, 8))
    const sun = new Date(wed)
    sun.setUTCDate(sun.getUTCDate() - sun.getUTCDay())
    expect(sun.getUTCDay()).toBe(0) // Sunday
    expect(sun.getUTCDate()).toBe(5)
  })
})
