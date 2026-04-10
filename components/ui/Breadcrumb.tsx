// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, Children, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

// ─── Item ───

interface BreadcrumbItemProps {
  href?: string
  children: ReactNode
  className?: string
}

function BreadcrumbItem({ href, children, className }: BreadcrumbItemProps) {
  if (href) {
    return (
      <li className="inline-flex items-center">
        <a
          href={href}
          className={cn(
            FONT.body,
            'text-[13px]',
            WEIGHT.normal,
            'text-[var(--n600)]',
            'hover:text-[var(--n1150)]',
            TRANSITION.colors,
            className,
          )}
        >
          {children}
        </a>
      </li>
    )
  }

  return (
    <li className="inline-flex items-center" aria-current="page">
      <span
        className={cn(
          FONT.body,
          'text-[13px]',
          WEIGHT.book,
          'text-[var(--n1150)]',
          className,
        )}
      >
        {children}
      </span>
    </li>
  )
}
BreadcrumbItem.displayName = 'Breadcrumb.Item'

// ─── Root ───

interface BreadcrumbProps {
  separator?: ReactNode
  children: ReactNode
  className?: string
}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ separator = '/', children, className }, ref) => {
    const items = Children.toArray(children)

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center">
          {items.map((child, i) => (
            <li key={i} className="inline-flex items-center">
              {child}
              {i < items.length - 1 && (
                <span
                  className={cn(
                    FONT.body,
                    'text-[13px] text-[var(--n400)] mx-1.5 select-none',
                  )}
                  aria-hidden
                >
                  {separator}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  },
)

BreadcrumbRoot.displayName = 'Breadcrumb'

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
})
