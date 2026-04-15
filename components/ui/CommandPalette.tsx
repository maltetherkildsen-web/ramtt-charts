// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useState, useRef, useEffect, useCallback, useId, forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, TRANSITION } from '@/lib/ui'

export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: ReactNode
  shortcut?: string
}

export interface CommandGroup {
  label: string
  items: CommandItem[]
}

export interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  groups: CommandGroup[]
  onSelect: (item: CommandItem) => void
  className?: string
}

const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  function CommandPalette({ open, onOpenChange, placeholder = 'Search...', groups, onSelect, className }, ref) {
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)
    const uid = useId()

    // Flatten filtered items for keyboard navigation
    const filtered = groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (item) =>
            !query ||
            item.label.toLowerCase().includes(query.toLowerCase()) ||
            item.description?.toLowerCase().includes(query.toLowerCase()),
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
        // Focus the input after mount
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
      (item: CommandItem) => {
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

    // Close on backdrop click
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
        className={cn('fixed inset-0 z-50 flex items-start justify-center pt-[20vh]', TRANSITION.opacity)}
        onClick={handleBackdropClick}
        style={{ backgroundColor: 'rgba(19, 18, 17, 0.3)' }}
      >
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onKeyDown={handleKeyDown}
          className={cn(
            'w-full max-w-[520px]',
            RADIUS.lg,
            FONT.body,
            'bg-[var(--n50)] border-[0.5px] border-[var(--n400)]',
            'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
            className,
          )}
          style={{
            boxShadow: '0 16px 48px rgba(19, 18, 17, 0.12)',
            maxHeight: 400,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search input */}
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
                'flex-1 bg-transparent outline-none border-none',
                'text-[14px] text-[var(--n1150)] placeholder:text-[var(--n600)]',
                WEIGHT.normal,
              )}
            />
          </div>

          {/* Results */}
          <div ref={listRef} id={resultsId} role="listbox" className="overflow-y-auto flex-1 p-1.5">
            {flatItems.length === 0 && query ? (
              <div className={cn('text-center py-6 text-[13px] text-[var(--n600)]', WEIGHT.normal)}>
                No results for &ldquo;{query}&rdquo;
              </div>
            ) : (
              filtered.map((group) => (
                <div key={group.label}>
                  <div className={cn('px-2.5 pt-2 pb-1 text-[11px] text-[var(--n600)]', WEIGHT.strong)}>
                    {group.label}
                  </div>
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
                          'flex items-center gap-2.5 px-2.5 py-2',
                          RADIUS.md,
                          TRANSITION.background,
                          isActive
                            ? 'bg-[var(--n1150)] text-[var(--n50)]'
                            : 'bg-transparent text-[var(--n1150)]',
                        )}
                      >
                        {item.icon && (
                          <span className="shrink-0 flex items-center justify-center" style={{ width: 16, height: 16 }}>
                            {item.icon}
                          </span>
                        )}
                        <span className={cn('flex-1 text-[13px] truncate', WEIGHT.book)}>
                          {item.label}
                        </span>
                        {item.description && (
                          <span className={cn(
                            'text-[11px] shrink-0',
                            WEIGHT.normal,
                            isActive ? 'text-[var(--n50)]/60' : 'text-[var(--n600)]',
                          )}>
                            {item.description}
                          </span>
                        )}
                        {item.shortcut && (
                          <span className={cn(
                            'text-[11px] tabular-nums shrink-0',
                            WEIGHT.book,
                            isActive ? 'text-[var(--n50)]/60' : 'text-[var(--n600)]',
                          )}>
                            {item.shortcut}
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

CommandPalette.displayName = 'CommandPalette'
export { CommandPalette }
export type { CommandItem as CommandPaletteItem, CommandGroup as CommandPaletteGroup }
