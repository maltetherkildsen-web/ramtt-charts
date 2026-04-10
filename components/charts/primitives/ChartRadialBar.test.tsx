import { describe, it, expect } from 'vitest'

describe('ChartRadialBar', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartRadialBar.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
