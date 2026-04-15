// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useEffect, useCallback } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, HOVER_SAND, FOCUS_RING_THIN, LABEL_STYLE, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X } from '@/lib/ui'

// ─── Types ───

export interface ComboboxOption {
  value: string
  label: string
}

export interface ComboboxGroup {
  group: string
  items: ComboboxOption[]
}

export interface ComboboxProps {
  options: ComboboxOption[] | ComboboxGroup[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  label?: string
  multi?: boolean
  disabled?: boolean
  className?: string
}

function isGrouped(options: ComboboxOption[] | ComboboxGroup[]): options is ComboboxGroup[] {
  return options.length > 0 && 'group' in options[0]
}

function flattenOptions(options: ComboboxOption[] | ComboboxGroup[]): ComboboxOption[] {
  if (isGrouped(options)) return options.flatMap((g) => g.items)
  return options
}

// ─── Component ───

const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  ({ options, value, onChange, placeholder = 'Select...', label, multi = false, disabled = false, className }, ref) => {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [focusIdx, setFocusIdx] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const allOptions = flattenOptions(options)
    const selectedValues = Array.isArray(value) ? value : value ? [value] : []

    // Filter
    const matchesQuery = (opt: ComboboxOption) =>
      !query || opt.label.toLowerCase().includes(query.toLowerCase())

    const filteredFlat = allOptions.filter(matchesQuery)

    // Close on outside click
    useEffect(() => {
      if (!open) return
      function handlePointerDown(e: PointerEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
          setQuery('')
        }
      }
      document.addEventListener('pointerdown', handlePointerDown)
      return () => document.removeEventListener('pointerdown', handlePointerDown)
    }, [open])

    useEffect(() => {
      if (!open) return
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') { setOpen(false); setQuery('') }
      }
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open])

    const handleSelect = useCallback(
      (optValue: string) => {
        if (multi) {
          const arr = Array.isArray(value) ? value : []
          if (arr.includes(optValue)) {
            onChange(arr.filter((v) => v !== optValue))
          } else {
            onChange([...arr, optValue])
          }
        } else {
          onChange(optValue)
          setOpen(false)
          setQuery('')
        }
      },
      [multi, value, onChange],
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setFocusIdx((i) => (i < filteredFlat.length - 1 ? i + 1 : 0))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setFocusIdx((i) => (i > 0 ? i - 1 : filteredFlat.length - 1))
        } else if (e.key === 'Enter' && filteredFlat[focusIdx]) {
          e.preventDefault()
          handleSelect(filteredFlat[focusIdx].value)
        }
      },
      [filteredFlat, focusIdx, handleSelect],
    )

    useEffect(() => { setFocusIdx(0) }, [query])

    // Display
    const displayText = (() => {
      if (multi) return ''
      const opt = allOptions.find((o) => o.value === value)
      return opt?.label ?? ''
    })()

    const selectedTags = multi
      ? selectedValues.map((v) => allOptions.find((o) => o.value === v)).filter(Boolean)
      : []

    const renderOptions = (opts: ComboboxOption[], groupLabel?: string) => {
      const filtered = opts.filter(matchesQuery)
      if (filtered.length === 0) return null
      return (
        <div key={groupLabel}>
          {groupLabel && (
            <div className={cn(FONT.body, 'text-[11px]', WEIGHT.strong, 'text-[var(--n600)] px-2.5 py-1.5')}>
              {groupLabel}
            </div>
          )}
          {filtered.map((opt, i) => {
            const flatIdx = filteredFlat.indexOf(opt)
            const isSelected = selectedValues.includes(opt.value)
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={cn(
                  'flex w-full items-center justify-between px-2.5 py-1.5',
                  RADIUS.sm,
                  FONT.body,
                  'text-[13px]',
                  isSelected ? WEIGHT.strong : WEIGHT.normal,
                  'text-[var(--n1150)]',
                  TRANSITION.background,
                  HOVER_SAND,
                  flatIdx === focusIdx && 'bg-[var(--n200)]',
                )}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-[var(--n1150)]">
                    <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )
    }

    return (
      <div ref={containerRef} className={cn('relative', disabled && 'opacity-50 pointer-events-none', className)}>
        {label && <div className={cn(LABEL_STYLE, 'mb-1')}>{label}</div>}

        {/* Trigger */}
        <div
          ref={ref}
          role="combobox"
          aria-expanded={open}
          className={cn(
            'flex flex-wrap items-center gap-1.5 w-full bg-white',
            'min-h-[32px] px-2 py-1',
            BORDER.default,
            RADIUS.md,
            TRANSITION.colors,
            'focus-within:border-[1.5px] focus-within:border-[var(--accent)]',
          )}
          onClick={() => { setOpen(true); inputRef.current?.focus() }}
        >
          {selectedTags.map((opt) => (
            <span
              key={opt!.value}
              className={cn(
                'inline-flex items-center gap-1 bg-[var(--n200)] rounded-[4px] px-2 py-0.5',
                FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n1050)]',
              )}
            >
              {opt!.label}
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); handleSelect(opt!.value) }}
                className="text-[var(--n600)] hover:text-[var(--n1150)]"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            value={open ? query : displayText}
            onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true) }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={selectedValues.length === 0 ? placeholder : ''}
            className={cn(
              'flex-1 min-w-[60px] bg-transparent outline-none',
              FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]',
              'placeholder:text-[var(--n600)]',
            )}
          />
        </div>

        {/* Dropdown */}
        {open && (
          <div
            role="listbox"
            className={cn(
              'absolute z-50 top-full mt-1 left-0 right-0',
              'bg-[var(--n50)]',
              BORDER.default,
              'rounded-[8px]',
              'p-1 max-h-[240px] overflow-y-auto',
              'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
            )}
          >
            {isGrouped(options)
              ? options.map((g) => renderOptions(g.items, g.group))
              : renderOptions(options as ComboboxOption[])}
            {filteredFlat.length === 0 && (
              <div className={cn('py-4 text-center', FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                No results
              </div>
            )}
          </div>
        )}
      </div>
    )
  },
)

Combobox.displayName = 'Combobox'
export { Combobox }
