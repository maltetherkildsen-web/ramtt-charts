// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useId } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, FOCUS_RING_THIN, LABEL_STYLE } from '@/lib/ui'

export interface TextareaProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  rows?: number
  maxLength?: number
  showCount?: boolean
  disabled?: boolean
  className?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ value, onChange, placeholder, label, rows = 3, maxLength, showCount = false, disabled = false, className }, ref) => {
    const id = useId()
    const length = value?.length ?? 0
    const overLimit = maxLength !== undefined && length > maxLength

    return (
      <div className={cn('flex flex-col', disabled && 'opacity-50 pointer-events-none', className)}>
        {label && (
          <label htmlFor={id} className={cn(LABEL_STYLE, 'mb-1')}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          maxLength={maxLength}
          disabled={disabled}
          className={cn(
            'w-full bg-white outline-none resize-y',
            FONT.body,
            'text-[14px]',
            WEIGHT.normal,
            'text-[var(--n1150)]',
            RADIUS.md,
            BORDER.default,
            TRANSITION.colors,
            FOCUS_RING_THIN,
            'px-3 py-2',
            'placeholder:text-[var(--n600)] focus:border-[var(--n800)]',
          )}
        />
        {showCount && maxLength !== undefined && (
          <span
            className={cn(
              FONT.body,
              'text-[11px]',
              WEIGHT.normal,
              'mt-1 text-right',
              overLimit ? 'text-[var(--negative)]' : 'text-[var(--n600)]',
            )}
          >
            {length}/{maxLength}
          </span>
        )}
      </div>
    )
  },
)

Textarea.displayName = 'Textarea'
export { Textarea }
