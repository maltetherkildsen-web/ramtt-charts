// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Squarified treemap layout algorithm (Bruls, Huizing, van Wijk).
 *
 * Produces rectangles with aspect ratios as close to 1 as possible.
 * Pure function, zero dependencies, zero React, zero DOM.
 */

export interface TreemapItem {
  label: string
  value: number
  color: string
}

export interface TreemapRect {
  x: number
  y: number
  width: number
  height: number
  item: TreemapItem
}

/**
 * Compute the worst (highest) aspect ratio in a row of items,
 * given the row's area and the length of the side it's laid against.
 */
function worstAspectRatio(row: number[], sideLength: number, totalArea: number): number {
  if (row.length === 0 || sideLength <= 0) return Infinity
  const rowSum = row.reduce((a, b) => a + b, 0)
  if (rowSum <= 0) return Infinity

  const s2 = sideLength * sideLength
  let worst = 0
  for (const area of row) {
    // Each item gets width = area / rowSum * sideLength along the side
    // and height = rowSum / sideLength across
    // Aspect ratio = max(w/h, h/w)
    const w = (area / rowSum) * sideLength
    const h = rowSum / sideLength
    const ratio = w > h ? w / h : h / w
    if (ratio > worst) worst = ratio
  }
  return worst
}

/**
 * Lay out a completed row of items into the remaining rectangle,
 * consuming space from one side.
 */
function layoutRow(
  row: { area: number; item: TreemapItem }[],
  rect: { x: number; y: number; w: number; h: number },
): { rects: TreemapRect[]; remaining: { x: number; y: number; w: number; h: number } } {
  const rowArea = row.reduce((s, r) => s + r.area, 0)
  const rects: TreemapRect[] = []

  if (rect.w <= 0 || rect.h <= 0 || rowArea <= 0) {
    return { rects, remaining: rect }
  }

  // Lay along the shorter side
  const vertical = rect.w <= rect.h

  if (vertical) {
    // Fill a horizontal strip from the top
    const stripH = rowArea / rect.w
    let cx = rect.x
    for (const r of row) {
      const itemW = r.area / stripH
      rects.push({
        x: cx,
        y: rect.y,
        width: itemW,
        height: stripH,
        item: r.item,
      })
      cx += itemW
    }
    return {
      rects,
      remaining: {
        x: rect.x,
        y: rect.y + stripH,
        w: rect.w,
        h: rect.h - stripH,
      },
    }
  } else {
    // Fill a vertical strip from the left
    const stripW = rowArea / rect.h
    let cy = rect.y
    for (const r of row) {
      const itemH = r.area / stripW
      rects.push({
        x: rect.x,
        y: cy,
        width: stripW,
        height: itemH,
        item: r.item,
      })
      cy += itemH
    }
    return {
      rects,
      remaining: {
        x: rect.x + stripW,
        y: rect.y,
        w: rect.w - stripW,
        h: rect.h,
      },
    }
  }
}

/**
 * Squarified treemap layout.
 *
 * @param items   Array of items with label, value, and color.
 * @param width   Available width in pixels.
 * @param height  Available height in pixels.
 * @returns       Array of positioned rectangles.
 */
export function treemapLayout(
  items: readonly TreemapItem[],
  width: number,
  height: number,
): TreemapRect[] {
  if (items.length === 0 || width <= 0 || height <= 0) return []

  const totalValue = items.reduce((s, it) => s + it.value, 0)
  if (totalValue <= 0) return []

  const totalArea = width * height

  // Sort descending by value, compute proportional areas
  const sorted = [...items]
    .sort((a, b) => b.value - a.value)
    .map((item) => ({
      item,
      area: (item.value / totalValue) * totalArea,
    }))

  let remaining = { x: 0, y: 0, w: width, h: height }
  const result: TreemapRect[] = []
  let row: { area: number; item: TreemapItem }[] = []
  let rowAreas: number[] = []

  const sideLength = () => Math.min(remaining.w, remaining.h)

  for (const entry of sorted) {
    // Try adding this entry to the current row
    const testAreas = [...rowAreas, entry.area]
    const testRow = [...row, entry]

    if (row.length === 0) {
      row = testRow
      rowAreas = testAreas
      continue
    }

    const currentWorst = worstAspectRatio(rowAreas, sideLength(), totalArea)
    const newWorst = worstAspectRatio(testAreas, sideLength(), totalArea)

    if (newWorst <= currentWorst) {
      // Adding improves or maintains aspect ratio — keep going
      row = testRow
      rowAreas = testAreas
    } else {
      // Adding worsens — lay out current row, start new one
      const laid = layoutRow(row, remaining)
      result.push(...laid.rects)
      remaining = laid.remaining
      row = [entry]
      rowAreas = [entry.area]
    }
  }

  // Lay out final row
  if (row.length > 0) {
    const laid = layoutRow(row, remaining)
    result.push(...laid.rects)
  }

  return result
}
