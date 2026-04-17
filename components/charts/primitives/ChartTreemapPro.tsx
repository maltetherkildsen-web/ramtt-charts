// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartTreemapPro — Premium hierarchical treemap with zoom, fullscreen, and hover panels.
 *
 * Two-level hierarchy: Groups (sectors) → Leaves (items).
 * Self-contained: renders its own <svg> + HTML overlays. Does NOT use ChartRoot.
 *
 * Color system: 3-step intensity buckets (not continuous gradient).
 * Text: <foreignObject> with HTML divs for crisp font rendering.
 * Hover: thin dark border on hovered cell only — no dimming of other cells.
 */

import { useMemo, useRef, useCallback, useState, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import {
  hierarchicalTreemapLayout,
  type TreemapNode,
  type TreemapGroup,
  type TreemapLeafRect,
} from '@/lib/charts/utils/treemap'
import { ChartTreemapTooltip } from './ChartTreemapTooltip'

// ─── Types ───

export interface ChartTreemapProProps {
  /** Flat array of nodes with parentId relationships. parentId=null = group. */
  data: TreemapNode[]
  /** Custom hover panel content. Receives the hovered leaf node. */
  hoverContent?: (node: TreemapNode, group: TreemapGroup) => ReactNode
  /** Called when a leaf block is clicked. */
  onBlockClick?: (node: TreemapNode) => void
  /** Enable zoom drill-down on group header click. Default true. */
  enableZoom?: boolean
  /** Enable fullscreen toggle button. Default true. */
  enableFullscreen?: boolean
  /** Show color legend bar at bottom. Default true. */
  showLegend?: boolean
  /** Legend labels: [negative, neutral, positive]. */
  legendLabels?: [string, string, string]
  /** Gap between blocks in pixels. Default 2. */
  gap?: number
  /** Padding inside groups. Default 2. */
  groupPadding?: number
  /** Height of group header. Default 24. */
  headerHeight?: number
  /** Enable entry animation. Default true. */
  animate?: boolean
  /** Tailwind classes on outer wrapper. */
  className?: string
}

// ─── Color System: 3-step intensity buckets ───
// Jade for gains, Clay for losses, RAMTT sand for neutral.
// Intensity via hex alpha — composites over --bg naturally.

const JADE = '#3BAC88'  // audit-ignore-hex
const CLAY = '#E96850'  // audit-ignore-hex
const NEUTRAL = '#F2F0EA' // audit-ignore-hex — var(--n200)

/**
 * Map a % change to a 3-step bucketed color.
 * colorValue is raw pct (e.g. 1.5 means +1.5%).
 * Most cells are near-neutral; only big movers are saturated.
 */
function treemapColor(pctChange: number): string {
  const abs = Math.abs(pctChange)

  // Near-zero band — neutral sand
  if (abs < 0.3) return NEUTRAL

  const base = pctChange > 0 ? JADE : CLAY

  if (abs < 1.0) return `${base}1F`   // 12% alpha — barely tinted
  if (abs < 2.5) return `${base}66`   // 40% alpha — clearly tinted
  return `${base}B3`                   // 70% alpha — strong
}

/** Market-cap-weighted average % change for a sector */
function sectorWeightedPct(children: TreemapNode[]): number {
  const withVal = children.filter(c => c.colorValue !== undefined)
  if (withVal.length === 0) return 0
  const totalCap = withVal.reduce((s, c) => s + c.value, 0)
  if (totalCap === 0) return 0
  return withVal.reduce((s, c) => s + (c.colorValue ?? 0) * c.value, 0) / totalCap
}

/** Format pct for display */
function fmtPct(v: number): string {
  const sign = v >= 0 ? '+' : ''
  return `${sign}${v.toFixed(2)}%`
}

/** Determine text sizing tier from cell area */
function sizeTier(w: number, h: number): 0 | 1 | 2 | 3 | 4 | 5 {
  const area = w * h
  if (area > 20000) return 5  // huge
  if (area > 8000) return 4   // large
  if (area > 3000) return 3   // medium
  if (area > 1000) return 2   // small
  if (area > 400) return 1    // tiny — ticker only
  return 0                     // invisible — color only
}

const TIER_STYLES: Record<number, { ticker: number; pct: number; wt: number; showPct: boolean; showCap: boolean }> = {
  5: { ticker: 20, pct: 14, wt: 550, showPct: true, showCap: true },
  4: { ticker: 15, pct: 12, wt: 550, showPct: true, showCap: false },
  3: { ticker: 12, pct: 10, wt: 550, showPct: true, showCap: false },
  2: { ticker: 10, pct: 9, wt: 550, showPct: true, showCap: false },
  1: { ticker: 9, pct: 0, wt: 550, showPct: false, showCap: false },
  0: { ticker: 0, pct: 0, wt: 0, showPct: false, showCap: false },
}

// ─── Component ───

export function ChartTreemapPro({
  data,
  hoverContent,
  onBlockClick,
  enableZoom = true,
  enableFullscreen = true,
  showLegend = true,
  legendLabels,
  gap = 2,
  groupPadding = 2,
  headerHeight = 24,
  animate = true,
  className,
}: ChartTreemapProProps) {
  // ─── Container sizing ───
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(entries => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      setDimensions({ width: Math.floor(width), height: Math.floor(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ─── Zoom state ───
  const [zoomedGroupId, setZoomedGroupId] = useState<string | null>(null)

  // ─── Layout ───
  const legendHeight = showLegend ? 36 : 0
  const svgWidth = dimensions.width
  const svgHeight = Math.max(0, dimensions.height - legendHeight)

  const layoutData = useMemo(() => {
    if (svgWidth <= 0 || svgHeight <= 0) return null

    if (zoomedGroupId) {
      const groupNodes = data.filter(n => n.parentId === null)
      const zoomedGroup = groupNodes.find(n => n.id === zoomedGroupId)
      if (!zoomedGroup) return null
      const children = data.filter(n => n.parentId === zoomedGroupId)
      if (children.length === 0) return null
      const singleGroupData: TreemapNode[] = [{ ...zoomedGroup, parentId: null }, ...children]
      return hierarchicalTreemapLayout(singleGroupData, svgWidth, svgHeight, gap, groupPadding, headerHeight)
    }

    return hierarchicalTreemapLayout(data, svgWidth, svgHeight, gap, groupPadding, headerHeight)
  }, [data, svgWidth, svgHeight, gap, groupPadding, headerHeight, zoomedGroupId])

  // ─── Zero-rerender hover (border only — no dimming) ───
  const leafRefs = useRef<Map<string, SVGRectElement>>(new Map())
  const hoveredLeafRef = useRef<string | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const tooltipDataRef = useRef<{ node: TreemapNode; group: TreemapGroup; x: number; y: number } | null>(null)
  const rafId = useRef(0)
  const [tooltipState, setTooltipState] = useState<{ node: TreemapNode; group: TreemapGroup; x: number; y: number } | null>(null)

  const applyHover = useCallback((leafId: string | null) => {
    if (leafId === hoveredLeafRef.current) return
    const prevId = hoveredLeafRef.current
    hoveredLeafRef.current = leafId

    // Remove border from previous
    if (prevId) {
      const prev = leafRefs.current.get(prevId)
      if (prev) { prev.setAttribute('stroke', 'transparent'); prev.setAttribute('stroke-width', '0') }
    }
    // Add border to current
    if (leafId) {
      const cur = leafRefs.current.get(leafId)
      if (cur) { cur.setAttribute('stroke', 'var(--n1150)'); cur.setAttribute('stroke-width', '1') }
    }
  }, [])

  const handleLeafEnter = useCallback((leaf: TreemapLeafRect, group: TreemapGroup, e: React.PointerEvent) => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      applyHover(leaf.node.id)
      const container = containerRef.current
      if (!container) return
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      tooltipDataRef.current = { node: leaf.node, group, x, y }
      setTooltipState({ node: leaf.node, group, x, y })
    })
  }, [applyHover])

  const handleLeafMove = useCallback((e: React.PointerEvent) => {
    const container = containerRef.current
    if (!container || !tooltipDataRef.current) return
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const tip = tooltipRef.current
    if (tip) {
      const tipW = tip.offsetWidth
      const tipH = tip.offsetHeight
      const containerW = container.offsetWidth
      const left = x + 16 + tipW > containerW ? x - tipW - 8 : x + 16
      const top = Math.max(8, Math.min(y - tipH / 2, container.offsetHeight - tipH - 8))
      tip.style.left = `${left}px`
      tip.style.top = `${top}px`
    }
  }, [])

  const handleLeafLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      applyHover(null)
      tooltipDataRef.current = null
      setTooltipState(null)
    })
  }, [applyHover])

  // ─── Group header click (zoom) ───
  const handleGroupClick = useCallback((groupId: string) => {
    if (!enableZoom) return
    setZoomedGroupId(prev => prev === groupId ? null : groupId)
  }, [enableZoom])

  // ─── Fullscreen ───
  const toggleFullscreen = useCallback(() => {
    if (!enableFullscreen) return
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen()
    }
  }, [enableFullscreen])

  // ─── Entry animation window ───
  // Apply the block-in animation style ONLY during the initial entry window.
  // After that, re-renders (fullscreen resize, hover, zoom) must not re-emit
  // the `animation` style — otherwise the keyframe replays, producing a
  // full-viewport "blocks fly in" effect on every layout change.
  const [isEntering, setIsEntering] = useState(animate)
  useEffect(() => {
    if (!animate) return
    // 300ms duration + 500ms max staggered delay + 50ms buffer
    const t = setTimeout(() => setIsEntering(false), 900)
    return () => clearTimeout(t)
  }, [animate])

  // Replay the block-in once when the user drills into a group.
  useEffect(() => {
    if (!animate) return
    setIsEntering(true)
    const t = setTimeout(() => setIsEntering(false), 900)
    return () => clearTimeout(t)
  }, [zoomedGroupId, animate])

  // ─── Render ───
  if (!layoutData || svgWidth <= 0 || svgHeight <= 0) {
    return <div ref={containerRef} className={cn('relative w-full h-full min-h-[200px]', className)} />
  }

  const { groups, leaves } = layoutData

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full h-full min-h-[200px]', className)}
      data-treemap-container
    >
      {/* ─── Zoomed back button ─── */}
      {zoomedGroupId && enableZoom && (
        <button
          onClick={() => setZoomedGroupId(null)}
          className="absolute top-2 left-2 z-20 flex items-center gap-1 rounded-[5px] border-[0.5px] border-[var(--n400)] bg-[var(--n50)] px-2.5 py-1 text-[12px] font-[450] text-[var(--n800)]"
          style={{ transition: 'opacity 150ms' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M8.5 3.5L5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to overview
        </button>
      )}

      {/* ─── Fullscreen toggle ─── */}
      {enableFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="absolute top-2 right-2 z-20 flex items-center justify-center w-7 h-7 rounded-[5px] border-[0.5px] border-[var(--n400)] bg-[var(--n50)] text-[var(--n800)]"
          style={{ transition: 'opacity 150ms' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 5V2h3M9 2h3v3M12 9v3H9M5 12H2V9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}

      {/* ─── SVG Treemap ─── */}
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        shapeRendering="crispEdges"
      >
        {/* ── Group backgrounds ── */}
        {groups.map((group) => (
          <rect
            key={`bg-${group.id}`}
            x={group.x}
            y={group.y}
            width={group.width}
            height={group.height}
            rx={3}
            ry={3}
            fill="var(--n200)"
            fillOpacity={0.5}
          />
        ))}

        {/* ── Leaf cells ── */}
        {leaves.map((leaf, idx) => {
          const ix = leaf.x + gap / 2
          const iy = leaf.y + gap / 2
          const iw = Math.max(0, leaf.width - gap)
          const ih = Math.max(0, leaf.height - gap)
          if (iw < 1 || ih < 1) return null

          // 3-step bucketed color from pctChange stored in colorValue
          const pctChange = leaf.node.colorValue ?? 0
          const color = treemapColor(pctChange)
          const group = groups.find(g => g.id === leaf.groupId)!
          const tier = sizeTier(iw, ih)
          const ts = TIER_STYLES[tier]

          const animDelay = isEntering ? `${Math.min(idx * 12, 500)}ms` : '0ms'

          return (
            <g
              key={leaf.node.id}
              style={{
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: isEntering ? `ramtt-treemap-block-in 300ms var(--ease-out-expo) ${animDelay} both` : undefined,
              }}
              onPointerEnter={(e) => handleLeafEnter(leaf, group, e)}
              onPointerMove={handleLeafMove}
              onPointerLeave={handleLeafLeave}
              onClick={() => onBlockClick?.(leaf.node)}
            >
              {/* Cell fill */}
              <rect x={ix} y={iy} width={iw} height={ih} rx={2} ry={2} fill={color} />
              {/* Hover border rect (transparent until hovered) */}
              <rect
                ref={(el) => { if (el) leafRefs.current.set(leaf.node.id, el); else leafRefs.current.delete(leaf.node.id) }}
                x={ix}
                y={iy}
                width={iw}
                height={ih}
                rx={2}
                ry={2}
                fill="transparent"
                stroke="transparent"
                strokeWidth={0}
                style={{ transition: 'stroke 120ms' }}
              />
              {/* Cell label via foreignObject */}
              {tier > 0 && (
                <foreignObject x={ix} y={iy} width={iw} height={ih} style={{ pointerEvents: 'none' }}>
                  <div
                    style={{
                      padding: tier >= 4 ? '8px 10px' : tier >= 3 ? '5px 6px' : '3px 5px',
                      fontFamily: 'var(--font-sans)',
                      color: 'var(--n1150)',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.15,
                    }}
                  >
                    <div style={{ fontWeight: ts.wt, fontSize: ts.ticker }}>{leaf.node.label}</div>
                    {ts.showPct && (
                      <div style={{
                        fontWeight: 450,
                        fontSize: ts.pct,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--n800)',
                        marginTop: tier >= 4 ? 3 : 1,
                      }}>
                        {fmtPct(pctChange)}
                      </div>
                    )}
                    {ts.showCap && ih > 60 && (
                      <div style={{
                        fontWeight: 400,
                        fontSize: 10,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--n600)',
                        marginTop: 2,
                      }}>
                        {leaf.node.value.toLocaleString()}
                      </div>
                    )}
                  </div>
                </foreignObject>
              )}
            </g>
          )
        })}

        {/* ── Sector headers (rendered on top of cells) ── */}
        {groups.map((group) => {
          if (group.width < 40) return null
          const pct = sectorWeightedPct(group.children)
          const pctColor = Math.abs(pct) < 0.1 ? 'var(--n600)' : pct > 0 ? JADE : CLAY

          return (
            <foreignObject
              key={`hdr-${group.id}`}
              x={group.x}
              y={group.y}
              width={group.width}
              height={group.headerHeight}
              style={{ pointerEvents: enableZoom ? 'auto' : 'none' }}
              onClick={() => handleGroupClick(group.id)}
            >
              <div style={{
                padding: '0 6px',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                height: '100%',
                fontFamily: 'var(--font-sans)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: 11, fontWeight: 450, color: 'var(--n1150)' }}>
                  {group.label}
                </span>
                <span style={{ fontSize: 11, fontWeight: 550, color: pctColor, fontVariantNumeric: 'tabular-nums' }}>
                  {fmtPct(pct)}
                </span>
              </div>
            </foreignObject>
          )
        })}
      </svg>

      {/* ─── Color Legend ─── */}
      {showLegend && svgWidth > 200 && (
        <div
          className="flex items-center justify-center gap-2 px-4"
          style={{ height: legendHeight, fontFamily: 'var(--font-sans)' }}
        >
          <span className="text-[10px] text-[var(--n600)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {legendLabels?.[0] || '-3%'}
          </span>
          {/* Stepped legend — matching the 3-step bucket system */}
          <div className="flex items-center gap-[2px]">
            <div style={{ width: 20, height: 8, borderRadius: 2, background: `${CLAY}B3` }} />
            <div style={{ width: 20, height: 8, borderRadius: 2, background: `${CLAY}66` }} />
            <div style={{ width: 20, height: 8, borderRadius: 2, background: `${CLAY}1F` }} />
            <div style={{ width: 24, height: 8, borderRadius: 2, background: NEUTRAL }} />
            <div style={{ width: 20, height: 8, borderRadius: 2, background: `${JADE}1F` }} />
            <div style={{ width: 20, height: 8, borderRadius: 2, background: `${JADE}66` }} />
            <div style={{ width: 20, height: 8, borderRadius: 2, background: `${JADE}B3` }} />
          </div>
          <span className="text-[10px] text-[var(--n600)]" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {legendLabels?.[2] || '+3%'}
          </span>
        </div>
      )}

      {/* ─── Hover Panel ─── */}
      {tooltipState && (
        <ChartTreemapTooltip ref={tooltipRef} x={tooltipState.x} y={tooltipState.y}>
          {hoverContent
            ? hoverContent(tooltipState.node, tooltipState.group)
            : <DefaultHoverContent node={tooltipState.node} group={tooltipState.group} />}
        </ChartTreemapTooltip>
      )}
    </div>
  )
}

// ─── Default Hover Content ───

function DefaultHoverContent({ node, group }: { node: TreemapNode; group: TreemapGroup }) {
  const pct = node.colorValue ?? 0
  const pctColor = Math.abs(pct) < 0.1 ? 'var(--n600)' : pct > 0 ? JADE : CLAY

  return (
    <div className="flex flex-col gap-1">
      <span
        className="text-[11px] text-[var(--n600)]"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
      >
        {group.label}
      </span>
      <span
        className="text-[14px] text-[var(--n1150)]"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 550 }}
      >
        {node.label}
      </span>
      <div className="flex items-center gap-3 mt-0.5">
        <span
          className="text-[13px] text-[var(--n800)]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }}
        >
          {node.value.toLocaleString()}
        </span>
        <span
          className="text-[13px]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums', color: pctColor }}
        >
          {fmtPct(pct)}
        </span>
      </div>
      {typeof node.meta?.summary === 'string' && (
        <span
          className="text-[12px] text-[var(--n600)] mt-1"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, lineHeight: 1.4 }}
        >
          {node.meta.summary}
        </span>
      )}
    </div>
  )
}
