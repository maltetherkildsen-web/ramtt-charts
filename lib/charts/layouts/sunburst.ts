// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Sunburst layout — flattens a hierarchical tree into arc segments
 * with depth, startAngle, and endAngle for each node.
 *
 * Pure function, zero dependencies, zero React, zero DOM.
 */

export interface SunburstNode {
  name: string
  value?: number
  children?: SunburstNode[]
  color?: string
}

export interface SunburstArc {
  name: string
  depth: number
  startAngle: number
  endAngle: number
  value: number
  color?: string
  parent?: string
}

/**
 * Compute the total value of a subtree.
 * Leaf nodes use their `value`. Branch nodes sum children.
 */
function computeValue(node: SunburstNode): number {
  if (!node.children || node.children.length === 0) {
    return node.value ?? 0
  }
  return node.children.reduce((sum, child) => sum + computeValue(child), 0)
}

/**
 * Flatten a hierarchy tree into an array of arc segments.
 *
 * @param root       The root node of the hierarchy.
 * @param padAngle   Gap between sibling segments in radians. Default 0.01.
 * @returns          Array of SunburstArc segments (excluding root).
 */
export function sunburstLayout(
  root: SunburstNode,
  padAngle = 0.01,
): SunburstArc[] {
  const arcs: SunburstArc[] = []
  const totalValue = computeValue(root)
  if (totalValue === 0) return arcs

  function walk(
    node: SunburstNode,
    depth: number,
    startAngle: number,
    endAngle: number,
    parentName?: string,
  ) {
    const children = node.children
    if (!children || children.length === 0) return

    const parentSweep = endAngle - startAngle
    const totalPad = padAngle * children.length
    const available = parentSweep - totalPad
    if (available <= 0) return

    const parentValue = children.reduce((s, c) => s + computeValue(c), 0)
    if (parentValue === 0) return

    let angle = startAngle

    for (const child of children) {
      const childValue = computeValue(child)
      const sweep = (childValue / parentValue) * available
      const childStart = angle + padAngle / 2
      const childEnd = childStart + sweep

      arcs.push({
        name: child.name,
        depth,
        startAngle: childStart,
        endAngle: childEnd,
        value: childValue,
        color: child.color,
        parent: parentName,
      })

      walk(child, depth + 1, childStart, childEnd, child.name)
      angle = childEnd + padAngle / 2
    }
  }

  walk(root, 0, 0, 2 * Math.PI, root.name)
  return arcs
}
