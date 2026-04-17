// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartAnnotation — point, line, and range annotations for ChartRoot.
 *
 * Works INSIDE ChartRoot — uses chart context for positioning.
 * Annotations are static (no hover interaction — they are labels, not data).
 */

import { useId, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

// ─── Types ───

export interface AnnotationPoint {
  type: 'point'
  x: number
  y: number
  label: string
  color?: string
}

export interface AnnotationLine {
  type: 'line'
  x: number
  label: string
  color?: string
  dashed?: boolean
}

export interface AnnotationRange {
  type: 'range'
  x0: number
  x1: number
  label: string
  color?: string
}

export type Annotation = AnnotationPoint | AnnotationLine | AnnotationRange

export interface ChartAnnotationProps {
  annotations: Annotation[]
  className?: string
}

// ─── Component ───

export function ChartAnnotation({ annotations, className }: ChartAnnotationProps) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const clipId = useId()

  return (
    <g className={cn(className)} style={{ pointerEvents: 'none' }}>
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={chartWidth} height={chartHeight} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {annotations.map((ann, i) => {
          switch (ann.type) {
            case 'range':
              return <RangeAnnotation key={i} ann={ann} scaleX={scaleX} chartHeight={chartHeight} />
            case 'line':
              return <LineAnnotation key={i} ann={ann} scaleX={scaleX} chartHeight={chartHeight} />
            case 'point':
              return (
                <PointAnnotation
                  key={i}
                  ann={ann}
                  scaleX={scaleX}
                  scaleY={scaleY}
                  chartWidth={chartWidth}
                  chartHeight={chartHeight}
                />
              )
            default:
              return null
          }
        })}
      </g>
    </g>
  )
}

// ─── Range annotation ───

function RangeAnnotation({
  ann,
  scaleX,
  chartHeight,
}: {
  ann: AnnotationRange
  scaleX: (v: number) => number
  chartHeight: number
}) {
  const color = ann.color ?? '#3b82f6'
  const x0 = scaleX(ann.x0)
  const x1 = scaleX(ann.x1)
  const w = x1 - x0

  return (
    <g>
      {/* Filled rectangle */}
      <rect x={x0} y={0} width={w} height={chartHeight} fill={color} opacity={0.08} shapeRendering="crispEdges" />
      {/* Label at top center */}
      <LabelPill x={x0 + w / 2} y={6} label={ann.label} />
    </g>
  )
}

// ─── Line annotation (vertical) ───

function LineAnnotation({
  ann,
  scaleX,
  chartHeight,
}: {
  ann: AnnotationLine
  scaleX: (v: number) => number
  chartHeight: number
}) {
  const color = ann.color ?? '#3b82f6'
  const x = scaleX(ann.x)

  return (
    <g>
      <line
        x1={x}
        y1={0}
        x2={x}
        y2={chartHeight}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.6}
        strokeDasharray={ann.dashed !== false ? '4 3' : undefined}
        shapeRendering="crispEdges"
      />
      {/* Label at top of line */}
      <LabelPill x={x} y={6} label={ann.label} />
    </g>
  )
}

// ─── Point annotation ───

function PointAnnotation({
  ann,
  scaleX,
  scaleY,
  chartWidth,
  chartHeight,
}: {
  ann: AnnotationPoint
  scaleX: (v: number) => number
  scaleY: (v: number) => number
  chartWidth: number
  chartHeight: number
}) {
  const color = ann.color ?? '#f59e0b'
  const cx = scaleX(ann.x)
  const cy = scaleY(ann.y)

  // Leader line direction: prefer top-right, flip if near edges
  const goRight = cx < chartWidth - 60
  const goUp = cy > 30
  const dx = goRight ? 14 : -14
  const dy = goUp ? -14 : 14

  return (
    <g>
      {/* Circle on data point */}
      <circle cx={cx} cy={cy} r={4} fill={color} stroke="white" strokeWidth={2} shapeRendering="geometricPrecision" />
      {/* Leader line */}
      <line
        x1={cx}
        y1={cy}
        x2={cx + dx}
        y2={cy + dy}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.7}
        shapeRendering="geometricPrecision"
      />
      {/* Label pill */}
      <LabelPill x={cx + dx} y={cy + dy - 8} label={ann.label} />
    </g>
  )
}

// ─── Shared label pill ───

function LabelPill({ x, y, label }: { x: number; y: number; label: string }) {
  // Estimate text width: ~5.5px per character at 10px font
  const textW = label.length * 5.5 + 12
  const h = 18

  return (
    <g>
      <rect
        x={x - textW / 2}
        y={y}
        width={textW}
        height={h}
        rx={3}
        ry={3}
        fill="var(--n1150)"
      />
      <text
        x={x}
        y={y + h / 2 + 3.5}
        textAnchor="middle"
        fill="var(--n50)"
        fontSize={10}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
      >
        {label}
      </text>
    </g>
  )
}
