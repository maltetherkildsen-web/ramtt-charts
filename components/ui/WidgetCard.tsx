// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useCallback, type ReactNode } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  BORDER,
  TRANSITION,
  WIDGET_ICON_SIZE,
  WIDGET_ICON_COLOR,
  WIDGET_ICON_HOVER,
} from '@/lib/ui'
import { ToggleGroup } from './ToggleGroup'
import { Skeleton } from './Skeleton'

// ─── Types ───

export interface WidgetCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  collapsible?: boolean
  collapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  onSettings?: () => void
  onRemove?: () => void
  onFullscreen?: () => void
  /** "Why this number?" link */
  infoHref?: string
  timeRange?: string
  onTimeRangeChange?: (range: string) => void
  timeRangeOptions?: string[]
  /** Shows drag grip for DashboardGrid */
  dragHandle?: boolean
  /** Shows Skeleton content */
  loading?: boolean
  className?: string
}

// ─── Tiny SVG icons (14px) ───

function GripIcon() {
  return (
    <svg width={WIDGET_ICON_SIZE} height={WIDGET_ICON_SIZE} viewBox="0 0 14 14" fill="currentColor">
      <circle cx="4" cy="3" r="1.2" />
      <circle cx="10" cy="3" r="1.2" />
      <circle cx="4" cy="7" r="1.2" />
      <circle cx="10" cy="7" r="1.2" />
      <circle cx="4" cy="11" r="1.2" />
      <circle cx="10" cy="11" r="1.2" />
    </svg>
  )
}

function InfoIcon() {
  return (
    <svg width={WIDGET_ICON_SIZE} height={WIDGET_ICON_SIZE} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="7" cy="7" r="5.5" />
      <path d="M7 6.5v3.5M7 4.5v0" strokeLinecap="round" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width={WIDGET_ICON_SIZE} height={WIDGET_ICON_SIZE} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="7" cy="7" r="2" />
      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.76 2.76l1.06 1.06M10.18 10.18l1.06 1.06M11.24 2.76l-1.06 1.06M3.82 10.18l-1.06 1.06" />
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg width={WIDGET_ICON_SIZE} height={WIDGET_ICON_SIZE} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M8.5 1.5H12.5V5.5M5.5 12.5H1.5V8.5M12.5 1.5L8 6M1.5 12.5L6 8" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width={WIDGET_ICON_SIZE} height={WIDGET_ICON_SIZE} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
    </svg>
  )
}

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      className={cn(
        'transition-transform duration-150',
        collapsed ? '-rotate-90' : 'rotate-0',
      )}
    >
      <path d="M3 4.5L6 7.5L9 4.5" />
    </svg>
  )
}

// ─── Action button ───

function ActionBtn({
  onClick,
  href,
  label,
  showOnHover,
  children,
}: {
  onClick?: () => void
  href?: string
  label: string
  showOnHover?: boolean
  children: ReactNode
}) {
  const cls = cn(
    WIDGET_ICON_COLOR,
    TRANSITION.colors,
    'hover:text-[var(--n800)]',
    'flex items-center justify-center shrink-0',
    showOnHover && 'opacity-0 group-hover:opacity-100',
  )

  if (href) {
    return (
      <a href={href} aria-label={label} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={label} className={cls}>
      {children}
    </button>
  )
}

// ─── Component ───

const WidgetCard = forwardRef<HTMLDivElement, WidgetCardProps>(
  (
    {
      title,
      subtitle,
      children,
      collapsible = false,
      collapsed: controlledCollapsed,
      onCollapsedChange,
      onSettings,
      onRemove,
      onFullscreen,
      infoHref,
      timeRange,
      onTimeRangeChange,
      timeRangeOptions,
      dragHandle = false,
      loading = false,
      className,
    },
    ref,
  ) => {
    const [internalCollapsed, setInternalCollapsed] = useState(false)
    const isCollapsed = controlledCollapsed ?? internalCollapsed

    const toggleCollapse = useCallback(() => {
      if (!collapsible) return
      const next = !isCollapsed
      setInternalCollapsed(next)
      onCollapsedChange?.(next)
    }, [collapsible, isCollapsed, onCollapsedChange])

    return (
      <div
        ref={ref}
        className={cn(
          'group bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          'overflow-hidden',
          className,
        )}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-2 px-4 py-3">
          {/* Drag handle */}
          {dragHandle && (
            <div
              data-drag-handle
              className={cn(
                'shrink-0',
                WIDGET_ICON_COLOR,
                'hover:text-[var(--n600)]',
                TRANSITION.colors,
              )}
              style={{ cursor: 'grab' }}
              aria-label="Drag to reorder"
            >
              <GripIcon />
            </div>
          )}

          {/* Title + subtitle */}
          <div
            className={cn('flex-1 min-w-0', collapsible && 'select-none')}
            onClick={collapsible ? toggleCollapse : undefined}
          >
            <div className="flex items-center gap-1.5">
              {collapsible && (
                <span className="text-[var(--n600)] shrink-0">
                  <ChevronIcon collapsed={isCollapsed} />
                </span>
              )}
              <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] truncate')}>
                {title}
              </span>
            </div>
            {subtitle && !isCollapsed && (
              <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] block truncate', collapsible && 'ml-[18px]')}>
                {subtitle}
              </span>
            )}
          </div>

          {/* Time range selector */}
          {timeRangeOptions && timeRange && onTimeRangeChange && !isCollapsed && (
            <ToggleGroup
              options={timeRangeOptions}
              value={timeRange}
              onChange={(v) => onTimeRangeChange(v as string)}
              size="sm"
              className="shrink-0"
            />
          )}

          {/* Action icons */}
          <div className="flex items-center gap-1 shrink-0">
            {infoHref && (
              <ActionBtn href={infoHref} label="More info">
                <InfoIcon />
              </ActionBtn>
            )}
            {onSettings && (
              <ActionBtn onClick={onSettings} label="Settings">
                <SettingsIcon />
              </ActionBtn>
            )}
            {onFullscreen && (
              <ActionBtn onClick={onFullscreen} label="Fullscreen">
                <ExpandIcon />
              </ActionBtn>
            )}
            {onRemove && (
              <ActionBtn onClick={onRemove} label="Remove" showOnHover>
                <CloseIcon />
              </ActionBtn>
            )}
          </div>
        </div>

        {/* ── Content ── */}
        <div
          className="ramtt-accordion-content"
          data-open={!isCollapsed}
        >
          <div>
            <div className="px-4 pb-4">
              {loading ? (
                <div className="space-y-3">
                  <Skeleton width="100%" height={120} radius="md" />
                  <div className="flex gap-3">
                    <Skeleton width="40%" height={12} />
                    <Skeleton width="25%" height={12} />
                  </div>
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

WidgetCard.displayName = 'WidgetCard'
export { WidgetCard }
