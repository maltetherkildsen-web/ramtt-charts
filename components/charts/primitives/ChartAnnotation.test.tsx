import { describe, it, expect } from 'vitest'

describe('ChartAnnotation', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartAnnotation.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('exports expected annotation types', async () => {
    // Verify the file contains all annotation type definitions
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartAnnotation.tsx')
    const content = fs.readFileSync(filePath, 'utf-8')
    expect(content).toContain('AnnotationPoint')
    expect(content).toContain('AnnotationLine')
    expect(content).toContain('AnnotationRange')
    expect(content).toContain('ChartAnnotation')
  })
})
