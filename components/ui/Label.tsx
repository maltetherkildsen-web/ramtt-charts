// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'

// ─── Types ───

export interface LabelProps {
  htmlFor?: string
  required?: boolean
  description?: string
  as?: 'label' | 'legend'
  children: ReactNode
  className?: string
}

// ─── Component ───

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ htmlFor, required, description, as = 'label', children, className }, ref) => {
    const labelClasses = cn(
      FONT.body,
      'text-[13px]',
      WEIGHT.strong,
      'text-[var(--n1150)]',
      'mb-1 block',
      className,
    )

    const content = (
      <>
        <span>
          {children}
          {required && (
            <span className="text-[var(--negative)] ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {description && (
          <span
            className={cn(
              FONT.body,
              'text-[12px]',
              WEIGHT.normal,
              'text-[var(--n600)]',
              'block mt-px',
            )}
          >
            {description}
          </span>
        )}
      </>
    )

    if (as === 'legend') {
      return (
        <legend className={labelClasses}>
          {content}
        </legend>
      )
    }

    return (
      <label ref={ref} htmlFor={htmlFor} className={labelClasses}>
        {content}
      </label>
    )
  },
)

Label.displayName = 'Label'
export { Label }
