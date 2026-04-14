// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, HOVER_SAND, FOCUS_RING } from '@/lib/ui'
import { Avatar } from './Avatar'

// ─── Types ───

export interface GridListItem {
  id: string
  title: string
  subtitle?: string
  meta?: string
  badge?: ReactNode
  avatar?: string
  image?: string
  onClick?: () => void
}

export interface GridListProps {
  /** Pre-structured items */
  items?: GridListItem[]
  /** Or render custom children */
  children?: ReactNode
  /** Number of columns on desktop */
  columns?: 2 | 3 | 4
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg'
  className?: string
}

// ─── Gap config ───

const GAP_MAP = { sm: 'gap-2', md: 'gap-4', lg: 'gap-6' } as const

const COL_MAP = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const

// ─── Card sub-component ───

interface GridListCardProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

const GridListCard = forwardRef<HTMLDivElement, GridListCardProps>(
  function GridListCard({ children, onClick, className }, ref) {
    const Tag = onClick ? 'button' : 'div'

    return (
      <Tag
        ref={ref as never}
        type={onClick ? 'button' : undefined}
        onClick={onClick}
        className={cn(
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          'text-left w-full',
          onClick && cn(HOVER_SAND, TRANSITION.background, FOCUS_RING),
          className,
        )}
        style={{ padding: 16 }}
      >
        {children}
      </Tag>
    )
  },
)
GridListCard.displayName = 'GridList.Card'

// ─── Default card renderer ───

function DefaultCard({ item }: { item: GridListItem }) {
  return (
    <GridListCard onClick={item.onClick}>
      {/* Image */}
      {item.image && (
        <div
          className="w-full rounded-[8px] bg-[var(--n200)] mb-3 overflow-hidden"
          style={{ height: 120 }}
        >
          <img
            src={item.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Header: title + badge */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {item.avatar && <Avatar src={item.avatar} name={item.title} size="sm" />}
          <span className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)] truncate')}>
            {item.title}
          </span>
        </div>
        {item.badge && <div className="shrink-0">{item.badge}</div>}
      </div>

      {/* Subtitle */}
      {item.subtitle && (
        <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)] mt-1')}>
          {item.subtitle}
        </p>
      )}

      {/* Meta */}
      {item.meta && (
        <p className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n600)] mt-2')}>
          {item.meta}
        </p>
      )}
    </GridListCard>
  )
}

// ─── Root ───

const GridListRoot = forwardRef<HTMLDivElement, GridListProps>(
  function GridList({ items, children, columns = 3, gap = 'md', className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('grid grid-cols-1', COL_MAP[columns], GAP_MAP[gap], className)}
      >
        {items
          ? items.map((item) => <DefaultCard key={item.id} item={item} />)
          : children}
      </div>
    )
  },
)
GridListRoot.displayName = 'GridList'

// ─── Export ───

export const GridList = Object.assign(GridListRoot, {
  Card: GridListCard,
})
