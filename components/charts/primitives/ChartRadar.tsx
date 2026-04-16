// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartRadar — polygon radar / spider chart primitive.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Dimensions radiate from center. Data series are filled polygons.
 *
 * Usage:
 *   <ChartRadar
 *     dimensions={['Power', 'Endurance', 'Speed', 'Recovery']}
 *     series={[
 *       { label: 'Current', values: [85, 72, 68, 55], className: 'stroke-[var(--n1150)] fill-[var(--n1150)]/15' },
 *     ]}
 *   />
 */

import { useMemo, useRef, useCallback, useEffect } from 'react'
import { cn } from '@/lib/ui'
import { radarPoints, radarPath, radarGridPoints } from '@/lib/charts/paths/radar'
import { resolveAnimate, EASE_OUT_EXPO, EASE_SPRING, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Types ───

export interface RadarSeries {
  label: string
  values: number[] // One per dimension. 0-100 scale.
  className?: string // Tailwind for stroke + fill
  dashed?: boolean // stroke-dasharray for comparison series
}

export interface ChartRadarProps {
  dimensions: string[] // Axis labels
  series: RadarSeries[] // 1-3 data series
  size?: number // Width & height in px. Default: 280
  rings?: number // Number of concentric grid rings. Default: 5
  showValues?: boolean // Show numeric values at each axis tip
  className?: string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

// ─── Helpers ───

/** Determine text-anchor based on angle position */
function textAnchor(angle: number): 'start' | 'middle' | 'end' {
  const cos = Math.cos(angle)
  if (cos > 0.3) return 'start'
  if (cos < -0.3) return 'end'
  return 'middle'
}

/** Determine dominant-baseline based on angle position */
function dominantBaseline(angle: number): 'auto' | 'hanging' | 'central' {
  const sin = Math.sin(angle)
  if (sin < -0.5) return 'auto' // top labels
  if (sin > 0.5) return 'hanging' // bottom labels
  return 'central'
}

// ─── Extract color from className (for legend swatch) ───

function extractStrokeColor(className?: string): string {
  if (!className) return 'var(--n1150)'
  // Match stroke-[...] or stroke-blue-500 etc.
  const varMatch = className.match(/stroke-\[([^\]]+)\]/)
  if (varMatch) return varMatch[1]
  // Fallback: try to find Tailwind color class
  return 'var(--n1150)'
}

// ─── Component ───

export function ChartRadar({
  dimensions,
  series,
  size = 280,
  rings = 5,
  showValues = false,
  className,
  animate = true,
}: ChartRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const padding = 40
  const maxRadius = size / 2 - padding
  const n = dimensions.length

  // Grid ring radii (circular rings instead of polygon)
  const gridRadii = useMemo(() => {
    const result: number[] = []
    for (let r = 1; r <= rings; r++) {
      result.push((r / rings) * maxRadius)
    }
    return result
  }, [rings, maxRadius])

  // Axis endpoint coordinates
  const axisEnds = useMemo(() => {
    return radarGridPoints(n, cx, cy, maxRadius)
  }, [n, cx, cy, maxRadius])

  // Label positions (12px beyond outermost ring)
  const labelPositions = useMemo(() => {
    const labelRadius = maxRadius + 16
    return radarPoints(new Array(n).fill(100), 100, cx, cy, labelRadius)
  }, [n, cx, cy, maxRadius])

  // Series paths + dot positions
  const seriesData = useMemo(() => {
    return series.map((s) => {
      const pts = radarPoints(s.values, 100, cx, cy, maxRadius)
      const d = radarPath(pts)
      return { d, dots: pts, series: s }
    })
  }, [series, cx, cy, maxRadius])

  // Legend height
  const legendHeight = series.length > 1 ? 28 : 0
  const totalHeight = size + legendHeight

  // ─── Entry animation ───
  const anim = resolveAnimate(animate, { duration: 800, delay: 0, easing: EASE_OUT_EXPO })

  // Center-point path for animation start state
  const centerPath = useMemo(() => {
    const pts = radarPoints(new Array(n).fill(0), 100, cx, cy, maxRadius)
    return radarPath(pts)
  }, [n, cx, cy, maxRadius])

  const seriesPathRefs = useRef<(SVGPathElement | null)[]>([])

  useEffect(() => {
    if (!anim.enabled) return
    seriesPathRefs.current.forEach((path, i) => {
      if (!path) return
      const finalD = seriesData[i]?.d
      if (!finalD) return

      path.setAttribute('d', centerPath)
      requestAnimationFrame(() => {
        path.style.transition = `d ${anim.duration}ms ${anim.easing} ${anim.delay}ms, opacity ${anim.duration}ms ${anim.easing} ${anim.delay}ms`
        path.style.opacity = '1'
        path.setAttribute('d', finalD)
      })
    })
  }, [anim.enabled, anim.duration, anim.delay, anim.easing, centerPath, seriesData])

  // ─── Hover state (ref-based, zero re-renders) ───
  const tooltipRef = useRef<HTMLDivElement>(null)
  const dotGroupRefs = useRef<(SVGGElement | null)[]>([])
  const axisLineRefs = useRef<(SVGLineElement | null)[]>([])
  const rafRef = useRef<number>(0)
  const lastDimIdx = useRef<number>(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGCircleElement>) => {
    const svg = e.currentTarget.ownerSVGElement
    if (!svg) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = svg.getBoundingClientRect()
      const mx = (e.clientX - rect.left) * (size / rect.width) - cx
      const my = (e.clientY - rect.top) * (size / rect.height) - cy

      // Find nearest dimension by angle
      let angle = Math.atan2(my, mx) + Math.PI / 2
      if (angle < 0) angle += Math.PI * 2
      const dimIdx = Math.round((angle / (Math.PI * 2)) * n) % n

      if (dimIdx === lastDimIdx.current) return
      lastDimIdx.current = dimIdx

      // Highlight axis line
      axisLineRefs.current.forEach((line, i) => {
        if (line) {
          line.setAttribute('stroke', i === dimIdx ? 'var(--n600)' : 'var(--n400)')
          line.setAttribute('stroke-width', i === dimIdx ? '1' : '0.5')
          line.style.opacity = i === dimIdx ? '0.6' : '0.2'
        }
      })

      // Highlight dots on this dimension
      seriesData.forEach((_, si) => {
        const g = dotGroupRefs.current[si]
        if (!g) return
        const circles = g.querySelectorAll('circle')
        circles.forEach((circle, di) => {
          const el = circle as SVGCircleElement
          el.setAttribute('r', di === dimIdx ? '6' : '4')
          el.style.opacity = di === dimIdx ? '1' : '0.5'
        })
      })

      // Update tooltip
      const tip = tooltipRef.current
      if (!tip) return

      let html = `<div style="font-family:var(--font-sans);font-size:11px;font-weight:450;color:var(--n600);margin-bottom:4px">${dimensions[dimIdx]}</div>`
      for (const s of series) {
        const val = s.values[dimIdx]
        const color = extractStrokeColor(s.className)
        html += `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px">`
        html += `<span style="display:flex;align-items:center;gap:6px">`
        html += `<span style="width:6px;height:6px;border-radius:50%;background:${color};flex-shrink:0"></span>`
        html += `<span style="font-family:var(--font-sans);font-size:12px;font-weight:400;color:var(--n800)">${s.label}</span>`
        html += `</span>`
        html += `<span style="font-family:var(--font-sans);font-size:12px;font-weight:550;font-variant-numeric:tabular-nums;color:var(--n1150)">${val}</span>`
        html += `</div>`
      }
      tip.innerHTML = html

      // Position tooltip near the hovered axis endpoint
      const [ax, ay] = axisEnds[dimIdx]
      const wrapRect = wrapperRef.current?.getBoundingClientRect()
      const svgRect = svg.getBoundingClientRect()
      if (wrapRect) {
        const pixelX = (ax / size) * svgRect.width
        const inLeftHalf = pixelX < svgRect.width / 2
        tip.style.left = inLeftHalf ? `${pixelX + 16}px` : `${pixelX - 180 - 16}px`
        tip.style.top = `${Math.max(8, (ay / totalHeight) * svgRect.height - 20)}px`
      }
      tip.style.opacity = '1'
    })
  }, [n, cx, cy, size, totalHeight, dimensions, series, seriesData, axisEnds])

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    lastDimIdx.current = -1
    requestAnimationFrame(() => {
      axisLineRefs.current.forEach((line) => {
        if (line) {
          line.setAttribute('stroke', 'var(--n400)')
          line.setAttribute('stroke-width', '0.5')
          line.style.opacity = '0.2'
        }
      })
      seriesData.forEach((_, si) => {
        const g = dotGroupRefs.current[si]
        if (!g) return
        g.querySelectorAll('circle').forEach((circle) => {
          const el = circle as SVGCircleElement
          el.setAttribute('r', '3')
          el.style.opacity = '1'
        })
      })
      if (tooltipRef.current) tooltipRef.current.style.opacity = '0'
    })
  }, [seriesData])

  return (
    <div ref={wrapperRef} style={{ position: 'relative', display: 'inline-block' }}>
    <svg
      width={size}
      height={totalHeight}
      viewBox={`0 0 ${size} ${totalHeight}`}
      className={cn(className)}
      shapeRendering="geometricPrecision"
    >
      {/* Grid rings (circular) */}
      {gridRadii.map((r, i) => (
        <circle
          key={`ring-${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--n400)"
          strokeWidth={0.5}
          opacity={0.3}
        />
      ))}

      {/* Axis lines (spokes) */}
      {axisEnds.map(([x, y], i) => (
        <line
          key={`axis-${i}`}
          ref={(el) => { axisLineRefs.current[i] = el }}
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          stroke="var(--n400)"
          strokeWidth={0.5}
          opacity={0.2}
          style={{ transition: 'stroke 150ms, stroke-width 150ms, opacity 150ms' }}
        />
      ))}

      {/* Dimension labels */}
      {labelPositions.map(([x, y], i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        return (
          <text
            key={`label-${i}`}
            x={x}
            y={y}
            textAnchor={textAnchor(angle)}
            dominantBaseline={dominantBaseline(angle)}
            fill="var(--n800)"
            fontSize={12}
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 450 }}
          >
            {dimensions[i]}
          </text>
        )
      })}

      {/* Values at tips */}
      {showValues && seriesData.length > 0 && (
        <>
          {seriesData[0].series.values.map((val, i) => {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2
            const valRadius = maxRadius + 26
            const x = cx + valRadius * Math.cos(angle)
            const y = cy + valRadius * Math.sin(angle)
            return (
              <text
                key={`val-${i}`}
                x={x}
                y={y + 10}
                textAnchor={textAnchor(angle)}
                fill="var(--n800)"
                fontSize={10}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 550,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {val}
              </text>
            )
          })}
        </>
      )}

      {/* Series polygons */}
      {seriesData.map(({ d, series: s }, i) => (
        <path
          key={`series-${i}`}
          ref={(el) => { seriesPathRefs.current[i] = el }}
          d={d}
          className={s.className}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeDasharray={s.dashed ? '4 4' : undefined}
          style={anim.enabled ? { opacity: 0 } : undefined}
        />
      ))}

      {/* Series dots */}
      {seriesData.map(({ dots, series: s }, si) => (
        <g key={`dots-${si}`} ref={(el) => { dotGroupRefs.current[si] = el }}>
          {dots.map(([dx, dy], di) => (
            <circle
              key={`dot-${si}-${di}`}
              cx={dx}
              cy={dy}
              r={4}
              fill={extractStrokeColor(s.className)}
              stroke="var(--n50)"
              strokeWidth={2}
              style={{
                transition: 'r 150ms, opacity 150ms',
                ...(anim.enabled
                  ? {
                      transformOrigin: `${dx}px ${dy}px`,
                      animation: `ramtt-dot-pop 300ms ${EASE_SPRING} ${anim.delay + anim.duration * 0.6 + di * 40}ms both`,
                    }
                  : undefined),
              }}
            />
          ))}
        </g>
      ))}

      {/* Invisible overlay for pointer capture */}
      <circle
        cx={cx}
        cy={cy}
        r={maxRadius + 14}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />

      {/* Legend (when multiple series) */}
      {series.length > 1 && (
        <g transform={`translate(${cx}, ${size + 6})`}>
          {series.map((s, i) => {
            const totalWidth = series.length * 100
            const offsetX = -totalWidth / 2 + i * 100
            const color = extractStrokeColor(s.className)
            return (
              <g key={`legend-${i}`} transform={`translate(${offsetX}, 0)`}>
                <line
                  x1={0}
                  y1={6}
                  x2={12}
                  y2={6}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={s.dashed ? '4 3' : undefined}
                />
                <text
                  x={16}
                  y={10}
                  fill="var(--n800)"
                  fontSize={12}
                  style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 400 }}
                >
                  {s.label}
                </text>
              </g>
            )
          })}
        </g>
      )}
    </svg>
    {/* HTML tooltip */}
    <div
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 0,
        pointerEvents: 'none',
        zIndex: 50,
        width: 180,
        background: 'var(--n50)',
        border: '0.5px solid var(--n400)',
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
        padding: '8px 12px',
        willChange: 'left, opacity',
        transition: 'opacity 100ms ease-out, left 150ms cubic-bezier(0.16,1,0.3,1), top 150ms cubic-bezier(0.16,1,0.3,1)',
      }}
    />
    </div>
  )
}
