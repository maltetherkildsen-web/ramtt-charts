// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useCallback, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, HOVER_SAND, FOCUS_RING, CALENDAR_CELL_SIZE, CALENDAR_WEEK_STARTS_ON } from '@/lib/ui'
import { getMonthGrid, isSameDay, isInRange, addMonths, getWeekNumber } from '@/lib/calendar-utils'

interface DateRange {
  from: Date
  to: Date
}

export interface CalendarProps {
  mode?: 'single' | 'range'
  selected?: Date | DateRange | null
  onSelect?: (value: Date | DateRange | null) => void
  month?: Date
  onMonthChange?: (month: Date) => void
  showWeekNumbers?: boolean
  weekStartsOn?: 0 | 1
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[] | ((date: Date) => boolean)
  renderDay?: (date: Date) => ReactNode
  className?: string
}

const DAY_LABELS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const DAY_LABELS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function isDisabled(date: Date, disabledDates?: Date[] | ((date: Date) => boolean), minDate?: Date, maxDate?: Date): boolean {
  if (minDate && date < minDate) return true
  if (maxDate && date > maxDate) return true
  if (!disabledDates) return false
  if (typeof disabledDates === 'function') return disabledDates(date)
  return disabledDates.some((d) => isSameDay(d, date))
}

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  ({
    mode = 'single',
    selected,
    onSelect,
    month: controlledMonth,
    onMonthChange,
    showWeekNumbers = false,
    weekStartsOn = CALENDAR_WEEK_STARTS_ON as 0 | 1,
    minDate,
    maxDate,
    disabledDates,
    renderDay,
    className,
  }, ref) => {
    const [internalMonth, setInternalMonth] = useState(() => {
      if (controlledMonth) return controlledMonth
      if (selected && selected instanceof Date) return selected
      return new Date()
    })
    // For range selection: track partial selection
    const [rangeStart, setRangeStart] = useState<Date | null>(null)

    const displayMonth = controlledMonth ?? internalMonth
    const year = displayMonth.getFullYear()
    const monthIdx = displayMonth.getMonth()
    const today = new Date()

    const navigateMonth = useCallback(
      (offset: number) => {
        const next = addMonths(displayMonth, offset)
        if (onMonthChange) onMonthChange(next)
        else setInternalMonth(next)
      },
      [displayMonth, onMonthChange],
    )

    const grid = getMonthGrid(year, monthIdx, weekStartsOn)
    const dayLabels = weekStartsOn === 1 ? DAY_LABELS_MON : DAY_LABELS_SUN

    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(displayMonth)

    const isSelected = (date: Date): boolean => {
      if (!selected) return false
      if (selected instanceof Date) return isSameDay(date, selected)
      return isSameDay(date, selected.from) || isSameDay(date, selected.to)
    }

    const isRangeMiddle = (date: Date): boolean => {
      if (!selected || selected instanceof Date) return false
      const range = selected as DateRange
      return isInRange(date, range.from, range.to) && !isSameDay(date, range.from) && !isSameDay(date, range.to)
    }

    const handleDayClick = useCallback(
      (date: Date) => {
        if (!onSelect) return
        if (mode === 'single') {
          onSelect(date)
        } else {
          if (!rangeStart) {
            setRangeStart(date)
            onSelect({ from: date, to: date })
          } else {
            const from = date < rangeStart ? date : rangeStart
            const to = date < rangeStart ? rangeStart : date
            onSelect({ from, to })
            setRangeStart(null)
          }
        }
      },
      [mode, onSelect, rangeStart],
    )

    return (
      <div ref={ref} className={cn('inline-block', className)}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={() => navigateMonth(-1)}
            aria-label="Previous month"
            className={cn(
              'inline-flex items-center justify-center w-7 h-7 rounded-[6px]',
              'text-[var(--n600)] hover:text-[var(--n1150)]',
              TRANSITION.colors,
              HOVER_SAND,
              FOCUS_RING,
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8.5 3L4.5 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <span className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
            {monthName}
          </span>
          <button
            type="button"
            onClick={() => navigateMonth(1)}
            aria-label="Next month"
            className={cn(
              'inline-flex items-center justify-center w-7 h-7 rounded-[6px]',
              'text-[var(--n600)] hover:text-[var(--n1150)]',
              TRANSITION.colors,
              HOVER_SAND,
              FOCUS_RING,
            )}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5.5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Grid */}
        <div role="grid" className="flex flex-col gap-0.5">
          {/* Day-of-week headers */}
          <div className={cn('grid gap-0.5', showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7')}>
            {showWeekNumbers && <div />}
            {dayLabels.map((label) => (
              <div
                key={label}
                className={cn(
                  'flex items-center justify-center',
                  FONT.body,
                  'text-[11px]',
                  WEIGHT.book,
                  'text-[var(--n600)]',
                )}
                style={{ width: CALENDAR_CELL_SIZE, height: 28 }}
              >
                {label}
              </div>
            ))}
          </div>

          {/* Day rows */}
          {grid.map((row, ri) => (
            <div key={ri} className={cn('grid gap-0.5', showWeekNumbers ? 'grid-cols-8' : 'grid-cols-7')}>
              {showWeekNumbers && (
                <div
                  className={cn(
                    'flex items-center justify-center',
                    FONT.body,
                    'text-[11px]',
                    WEIGHT.normal,
                    'text-[var(--n400)]',
                  )}
                  style={{ width: CALENDAR_CELL_SIZE, height: CALENDAR_CELL_SIZE }}
                >
                  {getWeekNumber(row[0])}
                </div>
              )}
              {row.map((date, ci) => {
                const isCurrentMonth = date.getMonth() === monthIdx
                const isToday = isSameDay(date, today)
                const sel = isSelected(date)
                const inRange = isRangeMiddle(date)
                const disabled = isDisabled(date, disabledDates, minDate, maxDate)

                return (
                  <button
                    key={ci}
                    type="button"
                    role="gridcell"
                    aria-selected={sel || undefined}
                    aria-disabled={disabled || undefined}
                    disabled={disabled}
                    onClick={() => handleDayClick(date)}
                    aria-label={new Intl.DateTimeFormat('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(date)}
                    className={cn(
                      'relative flex flex-col items-center justify-center rounded-full',
                      FONT.body,
                      'text-[13px]',
                      TRANSITION.background,
                      FOCUS_RING,
                      sel
                        ? 'bg-[var(--n1150)] text-[var(--n50)] font-[550]'
                        : inRange
                          ? 'bg-[var(--n200)] text-[var(--n1150)] font-[400]'
                          : isCurrentMonth
                            ? cn(WEIGHT.normal, 'text-[var(--n1150)]', HOVER_SAND)
                            : cn(WEIGHT.normal, 'text-[var(--n400)]'),
                      isToday && !sel && 'font-[550]',
                      disabled && 'text-[var(--n400)] pointer-events-none',
                    )}
                    style={{ width: CALENDAR_CELL_SIZE, height: CALENDAR_CELL_SIZE }}
                  >
                    {renderDay ? renderDay(date) : date.getDate()}
                    {isToday && !sel && (
                      <span
                        className="absolute rounded-full bg-[var(--n1150)]"
                        style={{ width: 4, height: 4, bottom: 4 }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  },
)

Calendar.displayName = 'Calendar'
export { Calendar }
