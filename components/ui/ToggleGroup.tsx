'use client'

import { forwardRef, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

type OptionItem = string | { value: string; label: string }

function normalizeOption(opt: OptionItem): { value: string; label: string } {
  return typeof opt === 'string' ? { value: opt, label: opt } : opt
}

export interface ToggleGroupProps {
  options: OptionItem[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'pill' | 'underline'
  multi?: boolean
  ariaLabel?: string
  className?: string
}

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  function ToggleGroup({ options, value, onChange, size = 'md', variant = 'default', multi = false, ariaLabel, className }, ref) {
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
    const selected = new Set(Array.isArray(value) ? value : [value])
    const normalized = options.map(normalizeOption)

    function handleClick(val: string) {
      if (multi) {
        const next = new Set(selected)
        if (next.has(val)) next.delete(val)
        else next.add(val)
        onChange(Array.from(next))
      } else {
        onChange(val)
      }
    }

    const handleKeyDown = useCallback((e: React.KeyboardEvent, currentIndex: number) => {
      let nextIndex = currentIndex
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          nextIndex = (currentIndex + 1) % normalized.length
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          nextIndex = (currentIndex - 1 + normalized.length) % normalized.length
          break
        case 'Home':
          e.preventDefault()
          nextIndex = 0
          break
        case 'End':
          e.preventDefault()
          nextIndex = normalized.length - 1
          break
        default:
          return
      }
      itemRefs.current[nextIndex]?.focus()
      // For single-select (radiogroup): also select on arrow
      if (!multi && variant !== 'underline') {
        onChange(normalized[nextIndex].value)
      }
    }, [normalized, multi, variant, onChange])

    // Determine the focused index for roving tabindex
    const activeIndex = normalized.findIndex((o) => selected.has(o.value))
    const focusableIndex = activeIndex >= 0 ? activeIndex : 0

    // ARIA role depends on variant/multi
    const role = variant === 'underline' ? 'tablist' : multi ? 'toolbar' : 'radiogroup'
    const itemRole = variant === 'underline' ? 'tab' : multi ? undefined : 'radio'
    const checkedAttr = variant === 'underline' ? 'aria-selected' : multi ? 'aria-pressed' : 'aria-checked'

    function renderItem(val: string, label: string, index: number, isSelected: boolean, style: React.CSSProperties, cls?: string) {
      return (
        <button
          key={val}
          ref={(el) => { itemRefs.current[index] = el }}
          role={itemRole}
          {...{ [checkedAttr]: isSelected }}
          tabIndex={index === focusableIndex ? 0 : -1}
          onClick={() => handleClick(val)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={cn('inline-flex items-center justify-center transition-colors duration-150', cls)}
          style={style}
        >
          {label}
        </button>
      )
    }

    // ─── Underline ───
    if (variant === 'underline') {
      return (
        <div ref={ref} role={role} aria-label={ariaLabel} className={cn('inline-flex gap-1', className)}>
          {normalized.map(({ value: val, label }, i) => {
            const isSel = selected.has(val)
            return renderItem(val, label, i, isSel, {
              height: 32, padding: '0 10px', fontSize: 13,
              fontFamily: 'var(--font-label)', fontWeight: isSel ? 500 : 400,
              color: isSel ? 'var(--n1150)' : 'var(--n800)',
              borderBottom: isSel ? '2px solid var(--n1150)' : '2px solid transparent',
            })
          })}
        </div>
      )
    }

    // ─── Pill ───
    if (variant === 'pill') {
      const h = size === 'sm' ? 24 : 28
      const fs = size === 'sm' ? 11 : 12
      return (
        <div ref={ref} role={role} aria-label={ariaLabel} className={cn('inline-flex gap-1', className)}>
          {normalized.map(({ value: val, label }, i) => {
            const isSel = selected.has(val)
            return renderItem(val, label, i, isSel, {
              height: h, padding: '0 10px', fontSize: fs, borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-label)', fontWeight: isSel ? 500 : 400,
              backgroundColor: isSel ? 'var(--n400)' : 'transparent',
              color: isSel ? 'var(--n1150)' : 'var(--n800)',
              border: '0.5px solid var(--n400)',
            }, !isSel ? 'hover:bg-[var(--n200)]' : undefined)
          })}
        </div>
      )
    }

    // ─── Default connected ───
    const h = size === 'sm' ? 24 : size === 'lg' ? 32 : 28
    const fs = size === 'sm' ? 11 : 12
    const px = size === 'sm' ? 8 : 10

    return (
      <div ref={ref} role={role} aria-label={ariaLabel} className={cn('inline-flex overflow-hidden', className)} style={{ border: '0.5px solid var(--n400)', borderRadius: 'var(--radius-md)' }}>
        {normalized.map(({ value: val, label }, i) => {
          const isSel = selected.has(val)
          const isLast = i === normalized.length - 1
          return renderItem(val, label, i, isSel, {
            height: h, padding: `0 ${px}px`, fontSize: fs,
            fontFamily: 'var(--font-label)', fontWeight: isSel ? 500 : 400,
            backgroundColor: isSel ? 'var(--n400)' : 'transparent',
            color: isSel ? 'var(--n1150)' : 'var(--n800)',
            borderRight: isLast ? 'none' : '0.5px solid var(--n400)',
          }, !isSel ? 'hover:bg-[var(--n200)]' : undefined)
        })}
      </div>
    )
  },
)
