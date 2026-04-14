// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'

// ─── Types ───

export interface FormLayoutProps {
  children: ReactNode
  /** Max width of the form */
  maxWidth?: string
  className?: string
}

interface FormSectionProps {
  title?: string
  description?: string
  children: ReactNode
  className?: string
}

interface FormFieldLayoutProps {
  label: string
  required?: boolean
  description?: string
  error?: string
  htmlFor?: string
  children: ReactNode
  className?: string
}

// ─── Section ───

function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <div
      className={cn(
        'first:mt-0 first:pt-0 first:border-t-0',
        'mt-6 pt-6 border-t-[0.5px] border-t-[var(--n400)]',
        className,
      )}
    >
      {title && (
        <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
          {title}
        </h3>
      )}
      {description && (
        <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mt-0.5')}>
          {description}
        </p>
      )}
      <div className={cn('flex flex-col gap-5', (title || description) && 'mt-4')}>
        {children}
      </div>
    </div>
  )
}
FormSection.displayName = 'FormLayout.Section'

// ─── Field ───

function FormFieldLayout({ label, required, description, error, htmlFor, children, className }: FormFieldLayoutProps) {
  return (
    <div className={cn(className)}>
      <label
        htmlFor={htmlFor}
        className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-1 block')}
      >
        {label}
        {required && <span className="text-[var(--negative)] ml-0.5">*</span>}
      </label>

      {children}

      {description && !error && (
        <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-1')}>
          {description}
        </p>
      )}
      {error && (
        <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--negative)] mt-1')}>
          {error}
        </p>
      )}
    </div>
  )
}
FormFieldLayout.displayName = 'FormLayout.Field'

// ─── Root ───

const FormLayoutRoot = forwardRef<HTMLDivElement, FormLayoutProps>(
  function FormLayout({ children, maxWidth = '600px', className }, ref) {
    return (
      <div
        ref={ref}
        className={cn(className)}
        style={{ maxWidth }}
      >
        {children}
      </div>
    )
  },
)
FormLayoutRoot.displayName = 'FormLayout'

// ─── Export ───

export const FormLayout = Object.assign(FormLayoutRoot, {
  Section: FormSection,
  Field: FormFieldLayout,
})
