// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  BORDER,
  TRANSITION,
  HOVER_SAND,
  FOCUS_RING,
} from '@/lib/ui'

// ─── Types ───

export interface ProjectsGridProps {
  columns?: 2 | 3 | 4
  children: ReactNode
  className?: string
}

export interface ProjectsGridHeaderProps {
  title?: string
  children?: ReactNode
  className?: string
}

export interface ProjectsGridItemProps {
  name: string
  description?: string
  timestamp?: string
  icon?: ReactNode
  onClick?: () => void
  className?: string
}

// ─── Helpers ───

const GRID_COLS: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
}

// ─── Root ───

const ProjectsGridRoot = forwardRef<HTMLDivElement, ProjectsGridProps>(
  function ProjectsGrid({ columns = 3, children, className }, ref) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-5', className)}>
        {children}
      </div>
    )
  },
)
ProjectsGridRoot.displayName = 'ProjectsGrid'

// ─── Header ───

const ProjectsGridHeader = forwardRef<HTMLDivElement, ProjectsGridHeaderProps>(
  function ProjectsGridHeader({ title = 'Projects', children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('flex items-center justify-between', className)}
      >
        <h2
          className={cn(
            FONT.body,
            'text-[18px]',
            WEIGHT.strong,
            'text-[var(--n1150)]',
          )}
        >
          {title}
        </h2>
        {children && (
          <div className="flex items-center gap-2">{children}</div>
        )}
      </div>
    )
  },
)
ProjectsGridHeader.displayName = 'ProjectsGrid.Header'

// ─── Grid (internal wrapper for items) ───

const ProjectsGridBody = forwardRef<HTMLDivElement, ProjectsGridProps>(
  function ProjectsGridBody({ columns = 3, children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('grid', GRID_COLS[columns], 'gap-4', className)}
      >
        {children}
      </div>
    )
  },
)
ProjectsGridBody.displayName = 'ProjectsGrid.Body'

// ─── Item ───

const ProjectsGridItem = forwardRef<HTMLButtonElement, ProjectsGridItemProps>(
  function ProjectsGridItem(
    { name, description, timestamp, icon, onClick, className },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          'flex flex-col items-start text-left p-3.5 cursor-default',
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          TRANSITION.background,
          HOVER_SAND,
          FOCUS_RING,
          className,
        )}
      >
        {/* Icon + Name */}
        <div className="flex items-center gap-2 w-full">
          {icon && (
            <span className="shrink-0 flex items-center justify-center text-[var(--n600)]">
              {icon}
            </span>
          )}
          <span
            className={cn(
              FONT.body,
              'text-[13px]',
              WEIGHT.medium,
              'text-[var(--n1150)] truncate',
            )}
          >
            {name}
          </span>
        </div>

        {/* Description */}
        {description && (
          <p
            className={cn(
              FONT.body,
              'text-[12px]',
              WEIGHT.normal,
              'text-[var(--n700)] line-clamp-2 mt-1.5',
            )}
          >
            {description}
          </p>
        )}

        {/* Timestamp */}
        {timestamp && (
          <span
            className={cn(
              FONT.body,
              'text-[11px]',
              WEIGHT.normal,
              'text-[var(--n600)] mt-auto pt-3',
            )}
          >
            {timestamp}
          </span>
        )}
      </button>
    )
  },
)
ProjectsGridItem.displayName = 'ProjectsGrid.Item'

// ─── Export ───

export const ProjectsGrid = Object.assign(ProjectsGridRoot, {
  Header: ProjectsGridHeader,
  Body: ProjectsGridBody,
  Item: ProjectsGridItem,
})
