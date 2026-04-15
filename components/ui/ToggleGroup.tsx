// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useCallback, type ReactNode } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT, BORDER, TRANSITION, HOVER_SAND, ACTIVE_SAND, ACTIVE_UNDERLINE, FOCUS_RING, WEIGHT } from '@/lib/ui'

type OptionItem = string | {
  value: string
  label: string
  icon?: ReactNode
  hasDropdown?: boolean
}

function normalizeOption(opt: OptionItem): { value: string; label: string; icon?: ReactNode; hasDropdown?: boolean } {
  return typeof opt === 'string' ? { value: opt, label: opt } : opt
}

export interface ToggleGroupProps {
  options: OptionItem[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'pill' | 'underline' | 'opacity'
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

    // ─── Opacity ───
    if (variant === 'opacity') {
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
                  TRANSITION.opacity,
                  FOCUS_RING,
                  'inline-flex items-center justify-center bg-transparent',
                  isSel ? cn(WEIGHT.strong, 'text-[var(--n1150)]') : cn(WEIGHT.strong, 'text-[var(--n600)]'),
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      )
    }

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
                  isSel ? cn(WEIGHT.strong, 'text-[var(--n1150)]') : cn(WEIGHT.normal, 'text-[var(--n600)] hover:text-[var(--n1150)]'),
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
          {normalized.map(({ value: val, label, icon, hasDropdown }, i) => {
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
                  'inline-flex items-center justify-center gap-1.5',
                  isSel ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_SAND) : cn(WEIGHT.normal, 'text-[var(--n800)] bg-transparent', HOVER_SAND),
                )}
              >
                {icon && (
                  <span
                    className={cn('shrink-0 flex items-center justify-center', isSel ? 'text-[var(--n1150)]' : 'text-[var(--n600)]')}
                    style={{ width: 16, height: 16 }}
                  >
                    {icon}
                  </span>
                )}
                {label}
                {hasDropdown && (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className={cn('shrink-0', isSel ? 'text-[var(--n1150)]' : 'text-[var(--n600)]')}
                  >
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
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
                isSel ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_SAND) : cn(WEIGHT.normal, 'text-[var(--n800)]', HOVER_SAND),
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
