// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useState, useRef, useEffect, useCallback, useId, forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, HOVER_SAND, FOCUS_RING, QUICK_SEARCH_MAX_HEIGHT } from '@/lib/ui'

// ─── Types ───

export interface QuickSearchItem {
  id: string
  type: string
  title: string
  metadata?: string
  icon?: ReactNode
}

export interface QuickSearchGroup {
  label?: string
  items: QuickSearchItem[]
}

export interface QuickSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  groups: QuickSearchGroup[]
  onSelect: (item: QuickSearchItem) => void
  className?: string
}

// ─── Default icons by type ───

function DefaultIcon({ type }: { type: string }) {
  switch (type) {
    case 'project':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H6.29289C6.55811 2.5 6.81246 2.60536 7 2.79289L8 3.79289C8.18754 3.98043 8.44189 4.08579 8.70711 4.08579H12.5C13.0523 4.08579 13.5 4.5335 13.5 5.08579V12.5C13.5 13.0523 13.0523 13.5 12.5 13.5H3.5C2.94772 13.5 2.5 13.0523 2.5 12.5V3.5Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
      )
    case 'chat':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M2.5 3.5C2.5 2.94772 2.94772 2.5 3.5 2.5H12.5C13.0523 2.5 13.5 2.94772 13.5 3.5V10.5C13.5 11.0523 13.0523 11.5 12.5 11.5H9L6 13.5V11.5H3.5C2.94772 11.5 2.5 11.0523 2.5 10.5V3.5Z"
            stroke="currentColor"
            strokeWidth="1.25"
          />
        </svg>
      )
    case 'task':
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )
    default:
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="2.5" y="2.5" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.25" />
        </svg>
      )
  }
}

// ─── QuickSearch ───

const QuickSearch = forwardRef<HTMLDivElement, QuickSearchProps>(
  function QuickSearch({ open, onOpenChange, placeholder = 'Search...', groups, onSelect, className }, ref) {
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const uid = useId()

    // Filter groups based on query
    const filtered = groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (item) => !query || item.title.toLowerCase().includes(query.toLowerCase()),
        ),
      }))
      .filter((g) => g.items.length > 0)

    const flatItems = filtered.flatMap((g) => g.items)

    // Reset active index when query changes
    useEffect(() => {
      setActiveIndex(0)
    }, [query])

    // Reset state when opened
    useEffect(() => {
      if (open) {
        setQuery('')
        setActiveIndex(0)
        requestAnimationFrame(() => inputRef.current?.focus())
      }
    }, [open])

    // Scroll active item into view
    useEffect(() => {
      if (!open || !listRef.current) return
      const activeEl = listRef.current.querySelector('[data-active="true"]')
      activeEl?.scrollIntoView({ block: 'nearest' })
    }, [activeIndex, open])

    const close = useCallback(() => {
      onOpenChange(false)
    }, [onOpenChange])

    const selectItem = useCallback(
      (item: QuickSearchItem) => {
        onSelect(item)
        close()
      },
      [onSelect, close],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            setActiveIndex((i) => (i < flatItems.length - 1 ? i + 1 : 0))
            break
          case 'ArrowUp':
            e.preventDefault()
            setActiveIndex((i) => (i > 0 ? i - 1 : flatItems.length - 1))
            break
          case 'Enter':
            e.preventDefault()
            if (flatItems[activeIndex]) selectItem(flatItems[activeIndex])
            break
          case 'Escape':
            e.preventDefault()
            close()
            break
        }
      },
      [flatItems, activeIndex, selectItem, close],
    )

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) close()
      },
      [close],
    )

    if (!open) return null

    const resultsId = `${uid}-results`
    let itemCounter = 0

    return (
      <div
        className={cn('fixed inset-0 z-50 flex items-start justify-center pt-[15vh]', TRANSITION.opacity)}
        onClick={handleBackdropClick}
        style={{ backgroundColor: 'rgba(19, 18, 17, 0.3)' }}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Quick search"
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full max-w-[560px]',
            RADIUS.lg,
            FONT.body,
            'bg-[var(--n50)]',
            BORDER.default,
            'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
            'cursor-default',
            className,
          )}
          style={{
            boxShadow: '0 16px 48px rgba(19, 18, 17, 0.12)',
            maxHeight: QUICK_SEARCH_MAX_HEIGHT,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search input area */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b-[0.5px] border-b-[var(--n200)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 text-[var(--n600)]">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
              <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls={resultsId}
              aria-autocomplete="list"
              aria-activedescendant={flatItems[activeIndex] ? `${uid}-item-${flatItems[activeIndex].id}` : undefined}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className={cn(
                'flex-1 bg-transparent outline-none border-none cursor-default',
                'text-[14px] text-[var(--n1150)] placeholder:text-[var(--n600)]',
                WEIGHT.normal,
                FOCUS_RING,
              )}
            />
            <button
              type="button"
              aria-label="Close search"
              onClick={close}
              className={cn(
                'shrink-0 flex items-center justify-center cursor-default',
                'rounded-[4px]',
                HOVER_SAND,
                TRANSITION.background,
                FOCUS_RING,
              )}
              style={{ width: 24, height: 24 }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-[var(--n600)]">
                <path d="M4.5 4.5L11.5 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                <path d="M11.5 4.5L4.5 11.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Results */}
          <div ref={listRef} id={resultsId} role="listbox" className="overflow-y-auto flex-1 p-1.5">
            {flatItems.length === 0 && query ? (
              <div className={cn('text-center py-6 text-[13px] text-[var(--n600)] cursor-default', WEIGHT.normal)}>
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((group, gi) => (
                <div key={group.label ?? `group-${gi}`}>
                  {group.label && (
                    <div className={cn('px-2.5 pt-2 pb-1 text-[11px] text-[var(--n600)] cursor-default', WEIGHT.strong)}>
                      {group.label}
                    </div>
                  )}
                  {group.items.map((item) => {
                    const idx = itemCounter++
                    const isActive = idx === activeIndex
                    return (
                      <div
                        key={item.id}
                        id={`${uid}-item-${item.id}`}
                        role="option"
                        aria-selected={isActive}
                        data-active={isActive}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => selectItem(item)}
                        className={cn(
                          'flex items-center gap-2.5 px-2.5 py-2 cursor-default',
                          RADIUS.md,
                          TRANSITION.background,
                          isActive ? 'bg-[var(--n200)]' : 'bg-transparent',
                        )}
                      >
                        <span className="shrink-0 flex items-center justify-center text-[var(--n600)]" style={{ width: 16, height: 16 }}>
                          {item.icon ?? <DefaultIcon type={item.type} />}
                        </span>
                        <span className={cn('flex-1 text-[13px] truncate text-[var(--n1150)]', WEIGHT.book)}>
                          {item.title}
                        </span>
                        {item.metadata && (
                          <span className={cn('text-[11px] shrink-0 text-[var(--n600)]', WEIGHT.normal)}>
                            {item.metadata}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  },
)

QuickSearch.displayName = 'QuickSearch'
export { QuickSearch }
