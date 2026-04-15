// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, useMemo } from 'react'
import { cn, FONT, WEIGHT, RADIUS, HEATMAP_CELL_SIZE, HEATMAP_GAP, HEATMAP_LEVELS } from '@/lib/ui'

// ─── Types ───

export interface HeatmapDataPoint {
  date: string   // ISO date string "2026-04-15"
  value: number  // activity count
}

export interface ActivityHeatmapProps {
  data: HeatmapDataPoint[]
  weeks?: number
  color?: string
  showDayLabels?: boolean
  showMonthLabels?: boolean
  emptyColor?: string
  onCellHover?: (point: HeatmapDataPoint | null) => void
  className?: string
}

// ─── Constants ───

const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', ''] as const
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const
const OPACITY_LEVELS = [0.15, 0.35, 0.6, 1.0] as const

// ─── Helpers ───

function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Monday = 0 … Sunday = 6 */
function getMondayIndex(d: Date): number {
  return (d.getDay() + 6) % 7
}

function getLevel(value: number, max: number): number {
  if (value <= 0 || max <= 0) return 0
  const quartile = max / (HEATMAP_LEVELS - 1)
  const level = Math.ceil(value / quartile)
  return Math.min(level, HEATMAP_LEVELS - 1)
}

function cellColor(level: number, baseColor: string, emptyColor: string): string {
  if (level === 0) return emptyColor
  return baseColor
}

function cellOpacity(level: number): number | undefined {
  if (level === 0) return undefined
  return OPACITY_LEVELS[level - 1]
}

interface WeekColumn {
  cells: { date: string; value: number; dayIndex: number }[]
  startDate: Date
}

function buildGrid(
  data: HeatmapDataPoint[],
  weeks: number,
): WeekColumn[] {
  const lookup = new Map<string, number>()
  for (const d of data) {
    lookup.set(d.date, d.value)
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Find the Saturday (end of current week, Mon–Sun layout)
  const todayDayIndex = getMondayIndex(today)
  const endDate = new Date(today)
  endDate.setDate(endDate.getDate() + (6 - todayDayIndex))

  const columns: WeekColumn[] = []

  for (let w = weeks - 1; w >= 0; w--) {
    const weekStart = new Date(endDate)
    weekStart.setDate(weekStart.getDate() - w * 7 - 6)

    const cells: WeekColumn['cells'] = []
    for (let d = 0; d < 7; d++) {
      const cellDate = new Date(weekStart)
      cellDate.setDate(cellDate.getDate() + d)
      const iso = toISODate(cellDate)
      const isFuture = cellDate > today
      cells.push({
        date: iso,
        value: isFuture ? -1 : (lookup.get(iso) ?? 0),
        dayIndex: d,
      })
    }

    columns.push({ cells, startDate: new Date(weekStart) })
  }

  return columns
}

// ─── Component ───

const ActivityHeatmap = forwardRef<HTMLDivElement, ActivityHeatmapProps>(
  (
    {
      data,
      weeks = 26,
      color = 'var(--chart-1)',
      showDayLabels = false,
      showMonthLabels = false,
      emptyColor = 'var(--n200)',
      onCellHover,
      className,
    },
    ref,
  ) => {
    const columns = useMemo(() => buildGrid(data, weeks), [data, weeks])

    const maxValue = useMemo(() => {
      let m = 0
      for (const d of data) {
        if (d.value > m) m = d.value
      }
      return m
    }, [data])

    const labelWidth = 28
    const cellStep = HEATMAP_CELL_SIZE + HEATMAP_GAP
    const gridWidth = columns.length * cellStep - HEATMAP_GAP
    const gridHeight = 7 * cellStep - HEATMAP_GAP
    const monthLabelHeight = showMonthLabels ? 16 : 0

    // Determine which columns start a new month for labels
    const monthLabels = useMemo(() => {
      const labels: { col: number; label: string }[] = []
      let prevMonth = -1
      for (let i = 0; i < columns.length; i++) {
        const month = columns[i].startDate.getMonth()
        if (month !== prevMonth) {
          labels.push({ col: i, label: MONTH_NAMES[month] })
          prevMonth = month
        }
      }
      return labels
    }, [columns])

    return (
      <div
        ref={ref}
        className={cn('inline-flex flex-col cursor-default', className)}
        role="group"
        aria-label="Activity heatmap"
      >
        {/* Month labels row */}
        {showMonthLabels && (
          <div
            className="flex"
            style={{
              height: monthLabelHeight,
              marginLeft: showDayLabels ? labelWidth : 0,
            }}
          >
            <div className="relative" style={{ width: gridWidth }}>
              {monthLabels.map(({ col, label }) => (
                <span
                  key={`${col}-${label}`}
                  className={cn(
                    FONT.body,
                    WEIGHT.book,
                    'absolute text-[9px] text-[var(--n600)] select-none',
                  )}
                  style={{ left: col * cellStep }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Main grid area */}
        <div className="flex">
          {/* Day labels column */}
          {showDayLabels && (
            <div
              className="flex flex-col flex-shrink-0"
              style={{ width: labelWidth, gap: HEATMAP_GAP }}
            >
              {DAY_LABELS.map((label, i) => (
                <div
                  key={i}
                  className={cn(
                    FONT.body,
                    WEIGHT.book,
                    'flex items-center text-[9px] text-[var(--n600)] select-none',
                  )}
                  style={{ height: HEATMAP_CELL_SIZE }}
                >
                  {label}
                </div>
              ))}
            </div>
          )}

          {/* Heatmap grid: flex row of week columns */}
          <div className="flex" style={{ gap: HEATMAP_GAP }}>
            {columns.map((week, colIdx) => (
              <div
                key={colIdx}
                className="flex flex-col"
                style={{ gap: HEATMAP_GAP }}
              >
                {week.cells.map((cell) => {
                  const isFuture = cell.value === -1
                  const level = isFuture ? 0 : getLevel(cell.value, maxValue)
                  const bg = cellColor(level, color, emptyColor)
                  const opacity = cellOpacity(level)
                  const displayValue = isFuture ? 0 : cell.value

                  return (
                    <div
                      key={cell.date}
                      className={cn(RADIUS.sm, 'cursor-default')}
                      style={{
                        width: HEATMAP_CELL_SIZE,
                        height: HEATMAP_CELL_SIZE,
                        backgroundColor: bg,
                        opacity: isFuture ? 0.4 : opacity,
                      }}
                      aria-label={`${cell.date}: ${displayValue} activities`}
                      onMouseEnter={() =>
                        onCellHover?.({ date: cell.date, value: displayValue })
                      }
                      onMouseLeave={() => onCellHover?.(null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
)

ActivityHeatmap.displayName = 'ActivityHeatmap'
export { ActivityHeatmap }
