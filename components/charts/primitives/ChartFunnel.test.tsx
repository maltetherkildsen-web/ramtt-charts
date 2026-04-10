import { describe, it, expect } from 'vitest'

describe('ChartFunnel', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartFunnel.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })
})
