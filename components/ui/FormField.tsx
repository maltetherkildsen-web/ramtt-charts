// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import {
  forwardRef,
  useId,
  isValidElement,
  cloneElement,
  type ReactNode,
  type ReactElement,
} from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'
import { Label } from './Label'

// ─── Types ───

export interface FormFieldProps {
  label: string
  required?: boolean
  description?: string
  error?: string
  children: ReactNode
  className?: string
}

// ─── Component ───

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ label, required, description, error, children, className }, ref) => {
    const autoId = useId()
    const errorId = `${autoId}-error`
    const descId = `${autoId}-desc`

    // Wire id, aria-describedby, and aria-invalid into the child input
    let child = children
    if (isValidElement(children)) {
      const extraProps: Record<string, unknown> = { id: autoId }
      const describedBy: string[] = []
      if (description) describedBy.push(descId)
      if (error) {
        describedBy.push(errorId)
        extraProps['aria-invalid'] = true
      }
      if (describedBy.length > 0) {
        extraProps['aria-describedby'] = describedBy.join(' ')
      }
      child = cloneElement(children as ReactElement<Record<string, unknown>>, extraProps)
    }

    return (
      <div ref={ref} className={cn('mb-4', className)}>
        <Label htmlFor={autoId} required={required}>
          {label}
        </Label>

        {description && (
          <p
            id={descId}
            className={cn(
              FONT.body,
              'text-[12px]',
              WEIGHT.normal,
              'text-[var(--n600)] mt-px mb-1',
            )}
          >
            {description}
          </p>
        )}

        <div
          className={cn(
            error && '[&_input]:border-[var(--negative)] [&_select]:border-[var(--negative)] [&_textarea]:border-[var(--negative)]',
          )}
        >
          {child}
        </div>

        {error && (
          <p
            id={errorId}
            role="alert"
            className={cn(
              FONT.body,
              'text-[12px]',
              WEIGHT.normal,
              'text-[var(--negative)] mt-1',
            )}
          >
            {error}
          </p>
        )}
      </div>
    )
  },
)

FormField.displayName = 'FormField'
export { FormField }
