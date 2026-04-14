// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'
import { Avatar } from './Avatar'
import { Button } from './Button'

// ─── Types ───

export interface LeaderboardItem {
  rank: number
  label: string
  value: string
  unit?: string
  avatar?: string
  progress: number
  trend?: 'up' | 'down' | 'stable'
  color?: string
  subtitle?: string
}

export interface LeaderboardProps {
  title?: string
  items: LeaderboardItem[]
  showRank?: boolean
  showBars?: boolean
  maxVisible?: number
  className?: string
}

// ─── Trend indicators ───

const TREND_MAP = {
  up: { char: '\u25B2', color: 'text-[var(--positive-on-soft)]' },
  down: { char: '\u25BC', color: 'text-[var(--negative-on-soft)]' },
  stable: { char: '\u2013', color: 'text-[var(--n600)]' },
} as const

// ─── Component ───

const Leaderboard = forwardRef<HTMLDivElement, LeaderboardProps>(
  function Leaderboard(
    { title, items, showRank = true, showBars = true, maxVisible, className },
    ref,
  ) {
    const [expanded, setExpanded] = useState(false)
    const visibleItems = maxVisible && !expanded ? items.slice(0, maxVisible) : items
    const hasMore = maxVisible ? items.length > maxVisible : false

    return (
      <div ref={ref} className={cn(className)}>
        {title && (
          <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)] mb-3')}>
            {title}
          </h3>
        )}

        <div role="list">
          {visibleItems.map((item, i) => {
            const isTopThree = item.rank <= 3
            const isLast = i === visibleItems.length - 1

            return (
              <div
                key={`${item.rank}-${item.label}`}
                role="listitem"
                className={cn(
                  'flex items-center gap-3',
                  !isLast && 'border-b-[0.5px] border-b-[var(--n200)]',
                )}
                style={{ padding: '8px 0', minHeight: 36 }}
              >
                {/* Rank */}
                {showRank && (
                  <span
                    className={cn(
                      FONT.body,
                      'text-[12px] tabular-nums',
                      WEIGHT.strong,
                      isTopThree ? 'text-[var(--n1150)]' : 'text-[var(--n600)]',
                    )}
                    style={{ width: 20, textAlign: 'right' }}
                  >
                    {item.rank}
                  </span>
                )}

                {/* Avatar */}
                {item.avatar !== undefined && (
                  <Avatar src={item.avatar} name={item.label} size="sm" />
                )}

                {/* Label + subtitle */}
                <div className="flex-1 min-w-0">
                  <span className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)] truncate block')}>
                    {item.label}
                  </span>
                  {item.subtitle && (
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                {showBars && (
                  <div
                    className="shrink-0 bg-[var(--n200)] overflow-hidden"
                    style={{ flex: '0 0 200px', maxWidth: 200, height: 4, borderRadius: 2 }}
                  >
                    <div
                      className={TRANSITION.background}
                      style={{
                        width: `${Math.min(100, Math.max(0, item.progress))}%`,
                        height: '100%',
                        borderRadius: 2,
                        backgroundColor: item.color ?? 'var(--n1150)',
                      }}
                    />
                  </div>
                )}

                {/* Value + unit */}
                <span
                  className={cn(
                    FONT.body,
                    'text-[13px] tabular-nums',
                    WEIGHT.strong,
                    'text-[var(--n1150)] text-right',
                  )}
                  style={{ minWidth: 60 }}
                >
                  {item.value}
                  {item.unit && (
                    <span className={cn('text-[12px]', WEIGHT.book, 'text-[var(--n800)] ml-0.5')}>
                      {item.unit}
                    </span>
                  )}
                </span>

                {/* Trend */}
                {item.trend && (
                  <span
                    className={cn('text-[10px]', TREND_MAP[item.trend].color)}
                    aria-label={item.trend}
                  >
                    {TREND_MAP[item.trend].char}
                  </span>
                )}
              </div>
            )
          })}
        </div>

        {/* Show more */}
        {hasMore && !expanded && (
          <div className="mt-2">
            <Button variant="ghost" size="sm" onClick={() => setExpanded(true)}>
              Show all {items.length}
            </Button>
          </div>
        )}
      </div>
    )
  },
)

Leaderboard.displayName = 'Leaderboard'
export { Leaderboard }
