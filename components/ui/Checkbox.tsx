// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useId } from 'react'
import { cn, FONT, WEIGHT, TRANSITION, FOCUS_RING } from '@/lib/ui'

export interface CheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  indeterminate?: boolean
  disabled?: boolean
  className?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onChange, label, description, indeterminate = false, disabled = false, className }, ref) => {
    const id = useId()

    const box = (
      <span className="relative inline-flex shrink-0">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <span
          className={cn(
            'flex items-center justify-center',
            'border-[0.5px] rounded-[3px]',
            TRANSITION.colors,
            'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--n600)]',
            checked || indeterminate
              ? 'bg-[var(--n1150)] border-[var(--n1150)]'
              : 'bg-[var(--n50)] border-[var(--n400)] hover:border-[var(--n800)]',
            disabled && 'opacity-50',
          )}
          style={{ width: 16, height: 16 }}
        >
          {checked && !indeterminate && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {indeterminate && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 5h5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </span>
    )

    if (!label) return <div className={className}>{box}</div>

    return (
      <div className={cn('flex items-start gap-2', disabled && 'opacity-50 pointer-events-none', className)}>
        {box}
        <div className="flex flex-col">
          <label
            htmlFor={id}
            className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}
          >
            {label}
          </label>
          {description && (
            <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-0.5')}>
              {description}
            </span>
          )}
        </div>
      </div>
    )
  },
)

Checkbox.displayName = 'Checkbox'
export { Checkbox }
