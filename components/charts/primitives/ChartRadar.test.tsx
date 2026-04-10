import { describe, it, expect } from 'vitest'

describe('ChartRadar', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartRadar.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
