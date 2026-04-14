// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Sankey layout — positions nodes in columns and computes link paths.
 *
 * Pure function, zero dependencies, zero React, zero DOM.
 */

// ─── Types ───

export interface SankeyNodeInput {
  id: string
  label: string
  color?: string
}

export interface SankeyLinkInput {
  source: string
  target: string
  value: number
}

export interface SankeyNode {
  id: string
  label: string
  color: string
  column: number
  x: number
  y: number
  width: number
  height: number
}

export interface SankeyLink {
  source: SankeyNode
  target: SankeyNode
  value: number
  /** Source Y offset (within the source node). */
  sy: number
  /** Target Y offset (within the target node). */
  ty: number
  /** Thickness in px. */
  thickness: number
  /** SVG path d attribute. */
  path: string
}

export interface SankeyLayout {
  nodes: SankeyNode[]
  links: SankeyLink[]
}

// ─── Layout ───

export function sankeyLayout(
  nodesInput: readonly SankeyNodeInput[],
  linksInput: readonly SankeyLinkInput[],
  width: number,
  height: number,
  nodeWidth = 18,
  nodePadding = 10,
  defaultColors: readonly string[] = [],
): SankeyLayout {
  // Build node map
  const nodeMap = new Map<string, {
    id: string
    label: string
    color?: string
    column: number
    inLinks: SankeyLinkInput[]
    outLinks: SankeyLinkInput[]
    totalValue: number
  }>()

  for (const n of nodesInput) {
    nodeMap.set(n.id, {
      id: n.id,
      label: n.label,
      color: n.color,
      column: -1,
      inLinks: [],
      outLinks: [],
      totalValue: 0,
    })
  }

  // Assign links to nodes
  for (const link of linksInput) {
    const src = nodeMap.get(link.source)
    const tgt = nodeMap.get(link.target)
    if (src) src.outLinks.push(link)
    if (tgt) tgt.inLinks.push(link)
  }

  // 1. Assign columns via BFS from source nodes (no incoming links)
  const sources = [...nodeMap.values()].filter((n) => n.inLinks.length === 0)
  const visited = new Set<string>()

  // Initialize sources at column 0
  for (const s of sources) {
    s.column = 0
    visited.add(s.id)
  }

  // BFS forward
  const queue = [...sources]
  while (queue.length > 0) {
    const node = queue.shift()!
    for (const link of node.outLinks) {
      const target = nodeMap.get(link.target)
      if (!target) continue
      target.column = Math.max(target.column, node.column + 1)
      if (!visited.has(target.id)) {
        visited.add(target.id)
        queue.push(target)
      }
    }
  }

  // Assign any unvisited nodes to column 0
  for (const node of nodeMap.values()) {
    if (node.column < 0) node.column = 0
  }

  const maxColumn = Math.max(...[...nodeMap.values()].map((n) => n.column), 0)

  // Compute total value for each node (max of in/out)
  for (const node of nodeMap.values()) {
    const inSum = node.inLinks.reduce((s, l) => s + l.value, 0)
    const outSum = node.outLinks.reduce((s, l) => s + l.value, 0)
    node.totalValue = Math.max(inSum, outSum, 1)
  }

  // 2. Position nodes vertically within each column
  const columns: Map<number, typeof sources> = new Map()
  for (const node of nodeMap.values()) {
    const col = columns.get(node.column) ?? []
    col.push(node)
    columns.set(node.column, col)
  }

  // Total value per column for scaling
  const globalMaxSum = Math.max(
    ...[...columns.values()].map((col) =>
      col.reduce((s, n) => s + n.totalValue, 0) + (col.length - 1) * nodePadding,
    ),
    1,
  )

  const valueScale = (height - (Math.max(...[...columns.values()].map((c) => c.length), 1) - 1) * nodePadding) / globalMaxSum

  // Build positioned nodes
  const nodes: SankeyNode[] = []
  const posMap = new Map<string, SankeyNode>()

  const colCount = maxColumn + 1
  const colSpacing = colCount > 1 ? (width - nodeWidth) / (colCount - 1) : 0

  for (const [col, colNodes] of columns) {
    const x = col * colSpacing
    const totalH = colNodes.reduce((s, n) => s + n.totalValue * valueScale, 0) + (colNodes.length - 1) * nodePadding
    let y = (height - totalH) / 2 // center vertically

    for (let i = 0; i < colNodes.length; i++) {
      const n = colNodes[i]
      const h = Math.max(4, n.totalValue * valueScale)
      const color = n.color ?? defaultColors[nodes.length % Math.max(1, defaultColors.length)] ?? 'var(--chart-1)'

      const node: SankeyNode = {
        id: n.id,
        label: n.label,
        color,
        column: col,
        x,
        y,
        width: nodeWidth,
        height: h,
      }
      nodes.push(node)
      posMap.set(n.id, node)
      y += h + nodePadding
    }
  }

  // 3. Compute link paths
  // Track Y offsets within each node for stacking links
  const sourceOffsets = new Map<string, number>()
  const targetOffsets = new Map<string, number>()
  for (const n of nodes) {
    sourceOffsets.set(n.id, 0)
    targetOffsets.set(n.id, 0)
  }

  const links: SankeyLink[] = []

  for (const linkInput of linksInput) {
    const src = posMap.get(linkInput.source)
    const tgt = posMap.get(linkInput.target)
    if (!src || !tgt) continue

    const srcNode = nodeMap.get(src.id)!
    const thickness = Math.max(1, (linkInput.value / srcNode.totalValue) * src.height)

    const sy = sourceOffsets.get(src.id) ?? 0
    const ty = targetOffsets.get(tgt.id) ?? 0

    const x0 = src.x + src.width
    const y0 = src.y + sy + thickness / 2
    const x1 = tgt.x
    const y1 = tgt.y + ty + thickness / 2

    const mx = (x0 + x1) / 2
    const halfT = thickness / 2

    const path = [
      `M${x0},${(y0 - halfT).toFixed(1)}`,
      `C${mx},${(y0 - halfT).toFixed(1)} ${mx},${(y1 - halfT).toFixed(1)} ${x1},${(y1 - halfT).toFixed(1)}`,
      `L${x1},${(y1 + halfT).toFixed(1)}`,
      `C${mx},${(y1 + halfT).toFixed(1)} ${mx},${(y0 + halfT).toFixed(1)} ${x0},${(y0 + halfT).toFixed(1)}`,
      'Z',
    ].join(' ')

    links.push({ source: src, target: tgt, value: linkInput.value, sy, ty, thickness, path })

    sourceOffsets.set(src.id, sy + thickness)
    targetOffsets.set(tgt.id, ty + thickness)
  }

  return { nodes, links }
}
