// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useId } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, FOCUS_RING, SWITCH_TRACK, SWITCH_THUMB } from '@/lib/ui'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
  className?: string
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onChange, label, description, disabled = false, className }, ref) => {
    const id = useId()

    const track = (
      <button
        ref={ref}
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={label ? `${id}-label` : undefined}
        aria-disabled={disabled || undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 items-center rounded-full',
          TRANSITION.background,
          FOCUS_RING,
          checked ? 'bg-[var(--n1150)]' : 'bg-[var(--n400)]',
          disabled && 'opacity-50 pointer-events-none',
          className,
        )}
        style={{
          width: SWITCH_TRACK.width,
          height: SWITCH_TRACK.height,
        }}
      >
        <span
          className={cn(
            'block rounded-full bg-white',
            TRANSITION.transform,
          )}
          style={{
            width: SWITCH_THUMB.size,
            height: SWITCH_THUMB.size,
            transform: checked
              ? `translateX(${SWITCH_TRACK.width - SWITCH_THUMB.size - SWITCH_THUMB.inset}px)`
              : `translateX(${SWITCH_THUMB.inset}px)`,
          }}
        />
      </button>
    )

    if (!label) return track

    return (
      <div className={cn('flex items-start justify-between gap-3', className)}>
        <div className="flex flex-col">
          <label
            id={`${id}-label`}
            htmlFor={id}
            className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}
          >
            {label}
          </label>
          {description && (
            <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-0.5')}>
              {description}
            </span>
          )}
        </div>
        {track}
      </div>
    )
  }
)

Switch.displayName = 'Switch'
export { Switch }
