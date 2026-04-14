// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useMemo, type ReactNode } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'
import { Input } from './Input'
import { Accordion } from './Accordion'

// ─── Types ───

export interface HelpItem {
  question: string
  answer: string | ReactNode
  category?: string
}

export interface HelpSectionProps {
  title?: string
  items: HelpItem[]
  /** Show search input above questions */
  searchable?: boolean
  /** Group by category */
  grouped?: boolean
  /** Contact/support link at bottom */
  contactAction?: ReactNode
  className?: string
}

// ─── Search icon ───

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M9.25 9.25L12 12" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

// ─── Component ───

const HelpSection = forwardRef<HTMLDivElement, HelpSectionProps>(
  function HelpSection(
    {
      title = 'Help',
      items,
      searchable = false,
      grouped,
      contactAction,
      className,
    },
    ref,
  ) {
    const [query, setQuery] = useState('')
    const [openValues, setOpenValues] = useState<string[]>([])

    // Determine grouping: default true if any item has a category
    const shouldGroup = grouped ?? items.some((i) => i.category)

    // Filter items by search
    const filtered = useMemo(() => {
      if (!query.trim()) return items
      const q = query.toLowerCase()
      return items.filter((i) => i.question.toLowerCase().includes(q))
    }, [items, query])

    // Group items by category
    const groups = useMemo(() => {
      if (!shouldGroup) return [{ category: '', items: filtered }]

      const map = new Map<string, HelpItem[]>()
      for (const item of filtered) {
        const cat = item.category ?? ''
        const arr = map.get(cat)
        if (arr) {
          arr.push(item)
        } else {
          map.set(cat, [item])
        }
      }
      return Array.from(map, ([category, items]) => ({ category, items }))
    }, [filtered, shouldGroup])

    return (
      <div ref={ref} className={cn(className)}>
        {/* Title */}
        {title && (
          <h3 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)] mb-4')}>
            {title}
          </h3>
        )}

        {/* Search */}
        {searchable && (
          <div className="relative mb-5">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--n600)] pointer-events-none">
              <SearchIcon />
            </span>
            <Input
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="[&_input]:pl-8"
            />
          </div>
        )}

        {/* No results */}
        {filtered.length === 0 && query.trim() && (
          <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)] py-4')}>
            No results for &ldquo;{query}&rdquo;
          </p>
        )}

        {/* Groups */}
        {groups.map((group) => (
          <div key={group.category}>
            {/* Category header */}
            {shouldGroup && group.category && (
              <h4 className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mt-5 mb-2')}>
                {group.category}
              </h4>
            )}

            {/* Accordion */}
            <Accordion
              type="multiple"
              value={openValues}
              onChange={(val) => setOpenValues(val as string[])}
            >
              {group.items.map((item) => {
                const key = `${group.category}-${item.question}`
                return (
                  <Accordion.Item key={key} value={key}>
                    <Accordion.Trigger
                      className={cn('text-[14px]', WEIGHT.book)}
                    >
                      {item.question}
                    </Accordion.Trigger>
                    <Accordion.Content>
                      {typeof item.answer === 'string' ? (
                        <p className={cn(FONT.body, 'text-[14px]', WEIGHT.normal, 'text-[var(--n800)] leading-[1.6]')}>
                          {item.answer}
                        </p>
                      ) : (
                        item.answer
                      )}
                    </Accordion.Content>
                  </Accordion.Item>
                )
              })}
            </Accordion>
          </div>
        ))}

        {/* Contact action */}
        {contactAction && (
          <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)] text-center mt-6')}>
            {contactAction}
          </div>
        )}
      </div>
    )
  },
)

HelpSection.displayName = 'HelpSection'
export { HelpSection }
