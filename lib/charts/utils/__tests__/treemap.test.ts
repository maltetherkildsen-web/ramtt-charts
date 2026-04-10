import { describe, it, expect } from 'vitest'
import { treemapLayout, type TreemapItem } from '../treemap'

describe('treemapLayout', () => {
  it('returns empty array for empty input', () => {
    expect(treemapLayout([], 400, 300)).toEqual([])
  })

  it('returns empty array for zero dimensions', () => {
    const items: TreemapItem[] = [{ label: 'A', value: 10, color: '#f00' }]
    expect(treemapLayout(items, 0, 300)).toEqual([])
    expect(treemapLayout(items, 400, 0)).toEqual([])
  })

  it('handles single item — fills entire rect', () => {
    const items: TreemapItem[] = [{ label: 'A', value: 100, color: '#f00' }]
    const result = treemapLayout(items, 400, 300)
    expect(result).toHaveLength(1)
    expect(result[0].x).toBeCloseTo(0)
    expect(result[0].y).toBeCloseTo(0)
    expect(result[0].width).toBeCloseTo(400)
    expect(result[0].height).toBeCloseTo(300)
    expect(result[0].item.label).toBe('A')
  })

  it('total area equals container area', () => {
    const items: TreemapItem[] = [
      { label: 'A', value: 50, color: '#f00' },
      { label: 'B', value: 30, color: '#0f0' },
      { label: 'C', value: 20, color: '#00f' },
    ]
    const result = treemapLayout(items, 400, 300)
    const totalArea = result.reduce((s, r) => s + r.width * r.height, 0)
    expect(totalArea).toBeCloseTo(400 * 300, 0)
  })

  it('areas are proportional to values', () => {
    const items: TreemapItem[] = [
      { label: 'Big', value: 60, color: '#f00' },
      { label: 'Small', value: 40, color: '#0f0' },
    ]
    const result = treemapLayout(items, 200, 100)
    const bigArea = result.find((r) => r.item.label === 'Big')!
    const smallArea = result.find((r) => r.item.label === 'Small')!
    const bigSize = bigArea.width * bigArea.height
    const smallSize = smallArea.width * smallArea.height
    expect(bigSize / smallSize).toBeCloseTo(60 / 40, 1)
  })

  it('rects do not overlap', () => {
    const items: TreemapItem[] = [
      { label: 'A', value: 42, color: '#f00' },
      { label: 'B', value: 28, color: '#0f0' },
      { label: 'C', value: 18, color: '#00f' },
      { label: 'D', value: 8, color: '#ff0' },
      { label: 'E', value: 4, color: '#0ff' },
    ]
    const result = treemapLayout(items, 400, 300)

    // No rect should have negative dimensions
    for (const r of result) {
      expect(r.width).toBeGreaterThan(0)
      expect(r.height).toBeGreaterThan(0)
    }

    // Check no overlaps (simple O(n^2) check)
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const a = result[i]
        const b = result[j]
        const overlapX = a.x < b.x + b.width && a.x + a.width > b.x
        const overlapY = a.y < b.y + b.height && a.y + a.height > b.y
        if (overlapX && overlapY) {
          // Allow tiny floating point overlaps
          const overlapArea =
            Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
            Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y))
          expect(overlapArea).toBeLessThan(0.01)
        }
      }
    }
  })

  it('produces reasonable aspect ratios (squarified)', () => {
    const items: TreemapItem[] = [
      { label: 'A', value: 40, color: '#f00' },
      { label: 'B', value: 30, color: '#0f0' },
      { label: 'C', value: 20, color: '#00f' },
      { label: 'D', value: 10, color: '#ff0' },
    ]
    const result = treemapLayout(items, 400, 400)

    // All aspect ratios should be < 5 (squarified tries for near 1)
    for (const r of result) {
      const ratio = r.width > r.height ? r.width / r.height : r.height / r.width
      expect(ratio).toBeLessThan(5)
    }
  })

  it('handles items with zero value gracefully', () => {
    const items: TreemapItem[] = [
      { label: 'A', value: 50, color: '#f00' },
      { label: 'Zero', value: 0, color: '#0f0' },
      { label: 'B', value: 50, color: '#00f' },
    ]
    // Should not throw
    const result = treemapLayout(items, 400, 300)
    expect(result.length).toBeGreaterThan(0)
  })
})
