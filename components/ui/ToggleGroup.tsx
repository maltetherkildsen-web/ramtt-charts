'use client'

import { forwardRef, useRef, useCallback } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT, BORDER, TRANSITION, HOVER_SAND, ACTIVE_SAND, ACTIVE_UNDERLINE, FOCUS_RING } from '@/lib/ui'

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

const sizeStyles = {
  sm: cn(SIZE_HEIGHTS.sm, SIZE_TEXT.sm, SIZE_PADDING_X.sm),
  md: cn(SIZE_HEIGHTS.md, SIZE_TEXT.md, SIZE_PADDING_X.md),
  lg: cn(SIZE_HEIGHTS.lg, SIZE_TEXT.lg, SIZE_PADDING_X.lg),
}

const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
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
      if (!multi && variant !== 'underline') {
        onChange(normalized[nextIndex].value)
      }
    }, [normalized, multi, variant, onChange])

    const activeIndex = normalized.findIndex((o) => selected.has(o.value))
    const focusableIndex = activeIndex >= 0 ? activeIndex : 0

    const role = variant === 'underline' ? 'tablist' : multi ? 'toolbar' : 'radiogroup'
    const itemRole = variant === 'underline' ? 'tab' : multi ? undefined : 'radio'
    const checkedAttr = variant === 'underline' ? 'aria-selected' : multi ? 'aria-pressed' : 'aria-checked'

    // ─── Underline ───
    if (variant === 'underline') {
      return (
        <div ref={ref} role={role} aria-label={ariaLabel} className={cn('inline-flex gap-1', className)}>
          {normalized.map(({ value: val, label }, i) => {
            const isSel = selected.has(val)
            return (
              <button
                key={val}
                ref={(el) => { itemRefs.current[i] = el }}
                role={itemRole}
                {...{ [checkedAttr]: isSel }}
                tabIndex={i === focusableIndex ? 0 : -1}
                onClick={() => handleClick(val)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  FONT.label,
                  SIZE_HEIGHTS.md,
                  SIZE_TEXT.md,
                  SIZE_PADDING_X.sm,
                  TRANSITION.colors,
                  FOCUS_RING,
                  'inline-flex items-center justify-center',
                  isSel ? 'font-medium text-[var(--n1150)]' : 'font-normal text-[var(--n800)]',
                  isSel ? ACTIVE_UNDERLINE : 'border-b-2 border-transparent',
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      )
    }

    // ─── Pill ───
    if (variant === 'pill') {
      return (
        <div ref={ref} role={role} aria-label={ariaLabel} className={cn('inline-flex gap-1', className)}>
          {normalized.map(({ value: val, label }, i) => {
            const isSel = selected.has(val)
            return (
              <button
                key={val}
                ref={(el) => { itemRefs.current[i] = el }}
                role={itemRole}
                {...{ [checkedAttr]: isSel }}
                tabIndex={i === focusableIndex ? 0 : -1}
                onClick={() => handleClick(val)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  FONT.label,
                  sizeStyles[size],
                  RADIUS.md,
                  BORDER.default,
                  TRANSITION.background,
                  FOCUS_RING,
                  'inline-flex items-center justify-center',
                  isSel ? cn('font-medium text-[var(--n1150)]', ACTIVE_SAND) : cn('font-normal text-[var(--n800)] bg-transparent', HOVER_SAND),
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      )
    }

    // ─── Default connected ───
    return (
      <div ref={ref} role={role} aria-label={ariaLabel} className={cn('inline-flex overflow-hidden', BORDER.default, RADIUS.md, className)}>
        {normalized.map(({ value: val, label }, i) => {
          const isSel = selected.has(val)
          const isLast = i === normalized.length - 1
          return (
            <button
              key={val}
              ref={(el) => { itemRefs.current[i] = el }}
              role={itemRole}
              {...{ [checkedAttr]: isSel }}
              tabIndex={i === focusableIndex ? 0 : -1}
              onClick={() => handleClick(val)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                FONT.label,
                sizeStyles[size],
                TRANSITION.background,
                FOCUS_RING,
                'inline-flex items-center justify-center',
                !isLast && 'border-r-[0.5px] border-r-[var(--n400)]',
                isSel ? cn('font-medium text-[var(--n1150)]', ACTIVE_SAND) : cn('font-normal text-[var(--n800)]', HOVER_SAND),
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    )
  }
)

ToggleGroup.displayName = 'ToggleGroup'
export { ToggleGroup }
