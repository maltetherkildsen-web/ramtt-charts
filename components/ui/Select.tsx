'use client'

import { useState, useRef, useEffect, useCallback, forwardRef } from 'react'
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
    const listRef = useRef<HTMLDivElement>(null)

    const selectedLabel = options.find((o) => o.value === value)?.label

    useEffect(() => {
      if (!open) return
      function handleClick(e: MouseEvent) {
        if (
          !triggerRef.current?.contains(e.target as Node) &&
          !listRef.current?.contains(e.target as Node)
        ) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }, [open])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!open) {
          if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
            setFocusIdx(Math.max(0, options.findIndex((o) => o.value === value)))
          }
          return
        }
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault()
            setFocusIdx((i) => Math.min(options.length - 1, i + 1))
            break
          case 'ArrowUp':
            e.preventDefault()
            setFocusIdx((i) => Math.max(0, i - 1))
            break
          case 'Enter':
          case ' ':
            e.preventDefault()
            if (focusIdx >= 0 && focusIdx < options.length) {
              onChange?.(options[focusIdx].value)
              setOpen(false)
              triggerRef.current?.focus()
            }
            break
          case 'Escape':
            e.preventDefault()
            setOpen(false)
            triggerRef.current?.focus()
            break
        }
      },
      [open, focusIdx, options, value, onChange],
    )

    return (
      <div ref={ref} className={cn('relative flex flex-col', className)} onKeyDown={handleKeyDown}>
        {label && (
          <label style={{ fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--n600)', marginBottom: 4 }}>
            {label}
          </label>
        )}

        <button
          ref={triggerRef}
          type="button"
          onClick={() => { setOpen(!open); setFocusIdx(Math.max(0, options.findIndex((o) => o.value === value))) }}
          className="flex w-full items-center justify-between bg-white outline-none transition-colors duration-150 focus:border-[var(--n800)]"
          style={{
            border: '0.5px solid var(--n400)',
            borderRadius: 'var(--radius-md)',
            height: 32,
            padding: '0 10px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 450,
            fontSize: 12,
            color: value ? 'var(--n1150)' : 'var(--n600)',
          }}
        >
          <span className="truncate">{selectedLabel ?? placeholder ?? ''}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="ml-2 shrink-0" style={{ color: 'var(--n600)' }}>
            <path d="M2.5 3.75L5 6.25L7.5 3.75" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {open && (
          <div
            ref={listRef}
            role="listbox"
            className="absolute left-0 z-50 mt-1 w-full"
            style={{
              top: '100%',
              background: '#1E1E1E',
              borderRadius: 'var(--radius-xl)',
              padding: '6px 0',
              boxShadow: 'rgba(0,0,0,0.15) 0px 2px 5px 0px, rgba(0,0,0,0.12) 0px 10px 16px 0px, rgba(0,0,0,0.12) 0px 0px 0.5px 0px',
            }}
          >
            {options.map((opt, i) => {
              const isSelected = opt.value === value
              const isFocused = i === focusIdx
              return (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setFocusIdx(i)}
                  onClick={() => {
                    onChange?.(opt.value)
                    setOpen(false)
                    triggerRef.current?.focus()
                  }}
                  style={{
                    padding: '6px 12px',
                    margin: '0 4px',
                    borderRadius: 'var(--radius-md)',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 11,
                    fontWeight: 450,
                    color: 'rgba(255,255,255,0.9)',
                    background: isFocused || isSelected ? '#2A2A2A' : 'transparent',
                    transition: 'background 100ms',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{opt.label}</span>
                  {isSelected && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    )
  },
)
