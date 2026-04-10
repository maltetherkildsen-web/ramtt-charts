// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, TRANSITION } from '@/lib/ui'

// ─── Types ───

export interface InputGroupProps {
  children: ReactNode
  className?: string
}

export interface InputGroupPrefixProps {
  children: ReactNode
  className?: string
}

export interface InputGroupSuffixProps {
  children: ReactNode
  className?: string
}

// ─── Root ───

const InputGroupRoot = forwardRef<HTMLDivElement, InputGroupProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-stretch',
          'bg-[var(--n50)]',
          'border-[0.5px] border-[var(--n400)]',
          RADIUS.md,
          'overflow-hidden',
          TRANSITION.colors,
          'focus-within:border-[var(--n800)]',
          // Remove border/radius from child inputs
          '[&_input]:border-0 [&_input]:rounded-none [&_input]:bg-transparent [&_input]:outline-none',
          // Remove focus ring from inner input (the group border handles focus)
          '[&_input]:focus-visible:outline-none',
          className,
        )}
      >
        {children}
      </div>
    )
  },
)
InputGroupRoot.displayName = 'InputGroup'

// ─── Prefix ───

function InputGroupPrefix({ children, className }: InputGroupPrefixProps) {
  const isIconOnly = typeof children !== 'string'
  const isTextContent = typeof children === 'string'

  return (
    <div
      className={cn(
        'flex items-center shrink-0',
        'px-2.5',
        isTextContent && 'bg-[var(--n200)] border-r-[0.5px] border-r-[var(--n400)]',
        !isTextContent && isIconOnly && 'pl-2.5 pr-0',
        FONT.body,
        'text-[13px]',
        WEIGHT.book,
        'text-[var(--n600)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
InputGroupPrefix.displayName = 'InputGroup.Prefix'

// ─── Suffix ───

function InputGroupSuffix({ children, className }: InputGroupSuffixProps) {
  const isTextContent = typeof children === 'string'

  return (
    <div
      className={cn(
        'flex items-center shrink-0',
        'px-2.5',
        isTextContent && 'bg-[var(--n200)] border-l-[0.5px] border-l-[var(--n400)]',
        FONT.body,
        'text-[13px]',
        WEIGHT.book,
        'text-[var(--n600)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
InputGroupSuffix.displayName = 'InputGroup.Suffix'

// ─── Export ───

export const InputGroup = Object.assign(InputGroupRoot, {
  Prefix: InputGroupPrefix,
  Suffix: InputGroupSuffix,
})
