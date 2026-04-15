// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useState, useRef, useEffect, useCallback, useId, forwardRef } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT, BORDER, TRANSITION, FOCUS_RING_THIN, LABEL_STYLE, WEIGHT } from '@/lib/ui'

export interface SelectOption {
  value: string
  label: string
  color?: string
  description?: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

const Select = forwardRef<HTMLDivElement, SelectProps>(
  function Select({ options, value, onChange, placeholder, label, className }, ref) {
    const [open, setOpen] = useState(false)
    const [focusIdx, setFocusIdx] = useState(-1)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const listRef = useRef<HTMLUListElement>(null)
    const typeAheadRef = useRef('')
    const typeAheadTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const uid = useId()
    const listboxId = `${uid}-listbox`

    const selectedOption = options.find((o) => o.value === value)
    const selectedLabel = selectedOption?.label

    useEffect(() => {
      if (!open) return
      function handleClick(e: MouseEvent) {
        if (!triggerRef.current?.contains(e.target as Node) && !listRef.current?.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [open])

    useEffect(() => {
      if (open && listRef.current) {
        const idx = Math.max(0, options.findIndex((o) => o.value === value))
        setFocusIdx(idx)
        const items = listRef.current.querySelectorAll<HTMLLIElement>('[role="option"]')
        items[idx]?.focus()
      }
    }, [open, options, value])

    const selectAndClose = useCallback((val: string) => {
      onChange?.(val)
      setOpen(false)
      triggerRef.current?.focus()
    }, [onChange])

    const handleTypeAhead = useCallback((key: string) => {
      clearTimeout(typeAheadTimer.current)
      typeAheadRef.current += key.toLowerCase()
      typeAheadTimer.current = setTimeout(() => { typeAheadRef.current = '' }, 500)
      const match = options.findIndex((o) => o.label.toLowerCase().startsWith(typeAheadRef.current))
      if (match >= 0) {
        setFocusIdx(match)
        const items = listRef.current?.querySelectorAll<HTMLLIElement>('[role="option"]')
        items?.[match]?.focus()
      }
    }, [options])

    const handleTriggerKeyDown = useCallback((e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        setOpen(true)
      }
    }, [])

    const handleListKeyDown = useCallback((e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setFocusIdx((i) => {
            const next = Math.min(options.length - 1, i + 1)
            listRef.current?.querySelectorAll<HTMLLIElement>('[role="option"]')[next]?.focus()
            return next
          })
          break
        case 'ArrowUp':
          e.preventDefault()
          setFocusIdx((i) => {
            const next = Math.max(0, i - 1)
            listRef.current?.querySelectorAll<HTMLLIElement>('[role="option"]')[next]?.focus()
            return next
          })
          break
        case 'Home':
          e.preventDefault()
          setFocusIdx(0)
          listRef.current?.querySelectorAll<HTMLLIElement>('[role="option"]')[0]?.focus()
          break
        case 'End':
          e.preventDefault()
          setFocusIdx(options.length - 1)
          listRef.current?.querySelectorAll<HTMLLIElement>('[role="option"]')[options.length - 1]?.focus()
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (focusIdx >= 0 && focusIdx < options.length) selectAndClose(options[focusIdx].value)
          break
        case 'Escape':
          e.preventDefault()
          setOpen(false)
          triggerRef.current?.focus()
          break
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
            handleTypeAhead(e.key)
          }
      }
    }, [focusIdx, options, selectAndClose, handleTypeAhead])

    return (
      <div ref={ref} className={cn('relative flex flex-col', className)}>
        {label && (
          <label id={`${uid}-label`} className={cn(LABEL_STYLE, 'mb-1')}>
            {label}
          </label>
        )}

        {/* Trigger */}
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-labelledby={label ? `${uid}-label` : undefined}
          onClick={() => setOpen(!open)}
          onKeyDown={handleTriggerKeyDown}
          className={cn(
            'flex w-full items-center justify-between bg-white outline-none',
            FONT.body,
            SIZE_HEIGHTS.md,
            SIZE_TEXT.sm,
            SIZE_PADDING_X.sm,
            RADIUS.md,
            BORDER.default,
            TRANSITION.colors,
            FOCUS_RING_THIN,
            WEIGHT.normal,
            value ? 'text-[var(--n1150)]' : 'text-[var(--n600)]',
          )}
        >
          <span className="flex items-center gap-2 truncate">
            {selectedOption?.color && (
              <span
                className="shrink-0 rounded-[30%]"
                style={{ width: 8, height: 8, backgroundColor: selectedOption.color }}
              />
            )}
            {selectedLabel ?? placeholder ?? ''}
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-2 shrink-0 text-[var(--n600)]" aria-hidden="true">
            <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? `${uid}-label` : undefined}
            onKeyDown={handleListKeyDown}
            className={cn(
              'absolute left-0 top-full z-50 mt-1 w-full list-none m-0 p-1 min-w-[180px]',
              'bg-[var(--n50)] border-[0.5px] border-[var(--n400)] rounded-[8px]',
              'animate-[ramtt-dropdown-enter_120ms_var(--ease-out-expo)]',
            )}
            style={{ boxShadow: '0 8px 24px rgba(19, 18, 17, 0.08)' }}
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value
              const isFocused = i === focusIdx
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  id={`${uid}-option-${i}`}
                  tabIndex={-1}
                  onMouseEnter={() => setFocusIdx(i)}
                  onClick={() => selectAndClose(opt.value)}
                  className={cn(
                    FONT.body,
                    'flex items-center gap-2 py-1.5 px-2.5 rounded-[5px]',
                    'transition-[background-color] duration-150',
                    isSelected ? cn(WEIGHT.medium, 'text-[var(--n1150)]') : cn(WEIGHT.normal, 'text-[var(--n1150)]'),
                    isFocused ? 'bg-[var(--n200)]' : isSelected ? 'bg-[var(--n200)]' : 'bg-transparent',
                  )}
                >
                  {/* Checkmark for selected */}
                  <span className="shrink-0 flex items-center justify-center" style={{ width: 12, height: 12 }}>
                    {isSelected && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M3 6L5.5 8.5L9 4" stroke="var(--n1150)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>

                  {/* Color dot */}
                  {opt.color && (
                    <span
                      className="shrink-0 rounded-[30%]"
                      style={{ width: 8, height: 8, backgroundColor: opt.color }}
                    />
                  )}

                  {/* Label + description */}
                  <span className="flex-1 min-w-0">
                    <span className={cn('block truncate text-[13px]', isSelected ? WEIGHT.medium : WEIGHT.normal)}>
                      {opt.label}
                    </span>
                    {opt.description && (
                      <span className={cn('block truncate text-[11px] text-[var(--n600)]', WEIGHT.normal)}>
                        {opt.description}
                      </span>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
export { Select }
