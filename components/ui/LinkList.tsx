// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, RADIUS, TRANSITION } from '@/lib/ui'

export interface LinkListProps {
  links: { label: string; href: string; active?: boolean }[]
  /** Dark surfaces invert colors */
  dark?: boolean
  className?: string
}

const LinkList = forwardRef<HTMLUListElement, LinkListProps>(
  function LinkList({ links, dark = false, className }, ref) {
    return (
      <ul ref={ref} className={cn('list-none p-0 m-0 flex flex-col', FONT.body, className)}>
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={cn(
                'block text-[12px] no-underline px-2',
                TRANSITION.colors,
                RADIUS.sm,
                dark
                  ? link.active
                    ? cn(WEIGHT.medium, 'text-[var(--dark-text)] bg-[var(--dark-hover)]')
                    : 'text-[var(--dark-muted)] hover:text-[var(--dark-text)]'
                  : link.active
                    ? cn(WEIGHT.strong, 'text-[var(--n1150)] bg-[var(--n200)]')
                    : cn(WEIGHT.normal, 'text-[var(--n600)] hover:text-[var(--n1150)]'),
                'hover:underline',
              )}
              style={{
                padding: '4px 8px 8px',
                letterSpacing: '-0.02em',
                textUnderlineOffset: '0.25em',
                textDecorationThickness: '1px',
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    )
  },
)

LinkList.displayName = 'LinkList'
export { LinkList }
