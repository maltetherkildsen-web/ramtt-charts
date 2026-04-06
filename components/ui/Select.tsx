'use client'

import { useState, useRef, useEffect, useCallback, useId, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  function Select({ options, value, onChange, placeholder, label, className }, ref) {
    const [open, setOpen] = useState(false)
    const [focusIdx, setFocusIdx] = useState(-1)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const listRef = useRef<HTMLUListElement>(null)
    const typeAheadRef = useRef('')
    const typeAheadTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
    const uid = useId()
    const listboxId = `${uid}-listbox`

    const selectedLabel = options.find((o) => o.value === value)?.label

    // Close on click outside
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

    // Focus selected option when opening
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

    // Type-ahead: typing letters jumps to matching option
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
          <label id={`${uid}-label`} style={{ fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)', marginBottom: 4 }}>
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
          className="flex w-full items-center justify-between bg-white outline-none transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-[var(--n600)] focus-visible:outline-offset-2"
          style={{
            border: '0.5px solid var(--n400)', borderRadius: 'var(--radius-md)',
            height: 32, padding: '0 10px',
            fontFamily: 'var(--font-sans)', fontWeight: 450, fontSize: 12,
            color: value ? 'var(--n1150)' : 'var(--n600)',
          }}
        >
          <span className="truncate">{selectedLabel ?? placeholder ?? ''}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-2 shrink-0" style={{ color: 'var(--n600)' }} aria-hidden="true">
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
            className="absolute left-0 z-50 mt-1 w-full"
            style={{
              top: '100%', background: '#1E1E1E', borderRadius: 'var(--radius-xl)',
              padding: '6px 0', listStyle: 'none', margin: 0,
              boxShadow: 'rgba(0,0,0,0.15) 0px 2px 5px 0px, rgba(0,0,0,0.12) 0px 10px 16px 0px, rgba(0,0,0,0.12) 0px 0px 0.5px 0px',
            }}
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
                  style={{
                    padding: '6px 12px', margin: '0 4px', borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 450,
                    color: 'rgba(255,255,255,0.9)',
                    background: isFocused || isSelected ? '#2A2A2A' : 'transparent',
                    transition: 'background 100ms',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  },
)
