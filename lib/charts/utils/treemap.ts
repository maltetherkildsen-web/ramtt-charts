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
  originX = 0,
  originY = 0,
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

  let remaining = { x: originX, y: originY, w: width, h: height }
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

// ─── Hierarchical Treemap ───

export interface TreemapNode {
  id: string
  label: string
  value: number
  /** Parent node id, or null for root-level groups */
  parentId: string | null
  /** Numeric value mapped to diverging color scale (-1 to +1) */
  colorValue?: number
  /** Arbitrary metadata for hover content */
  meta?: Record<string, unknown>
}

export interface TreemapGroup {
  id: string
  label: string
  totalValue: number
  children: TreemapNode[]
  /** Bounding rect after layout */
  x: number
  y: number
  width: number
  height: number
  /** Header height in pixels */
  headerHeight: number
}

export interface TreemapLeafRect {
  x: number
  y: number
  width: number
  height: number
  node: TreemapNode
  groupId: string
}

export interface HierarchicalTreemapResult {
  groups: TreemapGroup[]
  leaves: TreemapLeafRect[]
}

/**
 * Hierarchical squarified treemap layout.
 *
 * Two-level hierarchy: groups (sectors) containing leaves (items).
 * Groups are laid out first using squarified algorithm, then
 * children are laid out within each group's remaining space.
 *
 * @param nodes         Flat array of nodes with parentId relationships
 * @param width         Available width
 * @param height        Available height
 * @param gap           Gap between blocks (default 2)
 * @param groupPadding  Extra padding around groups (default 2)
 * @param headerHeight  Height reserved for group headers (default 24)
 */
export function hierarchicalTreemapLayout(
  nodes: readonly TreemapNode[],
  width: number,
  height: number,
  gap = 2,
  groupPadding = 2,
  headerHeight = 24,
): HierarchicalTreemapResult {
  if (nodes.length === 0 || width <= 0 || height <= 0) {
    return { groups: [], leaves: [] }
  }

  // Separate root-level groups from leaves
  const groupNodes = nodes.filter(n => n.parentId === null)
  const leafNodes = nodes.filter(n => n.parentId !== null)

  // Build group → children map
  const childrenMap = new Map<string, TreemapNode[]>()
  for (const g of groupNodes) {
    childrenMap.set(g.id, [])
  }
  for (const leaf of leafNodes) {
    const arr = childrenMap.get(leaf.parentId!)
    if (arr) arr.push(leaf)
  }

  // Compute group totals from children (not from group node's own value)
  const groupsWithTotals = groupNodes
    .map(g => ({
      node: g,
      children: childrenMap.get(g.id) || [],
      totalValue: (childrenMap.get(g.id) || []).reduce((s, c) => s + c.value, 0),
    }))
    .filter(g => g.totalValue > 0)
    .sort((a, b) => b.totalValue - a.totalValue)

  if (groupsWithTotals.length === 0) {
    return { groups: [], leaves: [] }
  }

  // Layout groups as top-level blocks
  const groupItems: TreemapItem[] = groupsWithTotals.map(g => ({
    label: g.node.label,
    value: g.totalValue,
    color: '', // Groups don't use color directly
  }))

  const groupRects = treemapLayout(groupItems, width, height)

  // Build result
  const groups: TreemapGroup[] = []
  const leaves: TreemapLeafRect[] = []

  for (let i = 0; i < groupRects.length; i++) {
    const gr = groupRects[i]
    const gData = groupsWithTotals[i]

    // Group bounding rect (with gap inset)
    const gx = gr.x + gap / 2
    const gy = gr.y + gap / 2
    const gw = Math.max(0, gr.width - gap)
    const gh = Math.max(0, gr.height - gap)

    const group: TreemapGroup = {
      id: gData.node.id,
      label: gData.node.label,
      totalValue: gData.totalValue,
      children: gData.children,
      x: gx,
      y: gy,
      width: gw,
      height: gh,
      headerHeight,
    }
    groups.push(group)

    // Inner rect for children (below header, with padding)
    const innerX = gx + groupPadding
    const innerY = gy + headerHeight + groupPadding
    const innerW = Math.max(0, gw - groupPadding * 2)
    const innerH = Math.max(0, gh - headerHeight - groupPadding * 2)

    if (innerW <= 0 || innerH <= 0 || gData.children.length === 0) continue

    // Layout children within group using the same squarified algorithm
    const childItems: TreemapItem[] = gData.children.map(c => ({
      label: c.label,
      value: c.value,
      color: '', // Color computed at render time from colorValue
    }))

    const childRects = treemapLayout(childItems, innerW, innerH, innerX, innerY)

    // Map back to TreemapLeafRect with original node data
    const sortedChildren = [...gData.children].sort((a, b) => b.value - a.value)
    for (let j = 0; j < childRects.length; j++) {
      const cr = childRects[j]
      leaves.push({
        x: cr.x,
        y: cr.y,
        width: cr.width,
        height: cr.height,
        node: sortedChildren[j],
        groupId: gData.node.id,
      })
    }
  }

  return { groups, leaves }
}
