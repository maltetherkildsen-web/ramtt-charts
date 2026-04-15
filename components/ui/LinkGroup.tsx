// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, DARK, TRANSITION } from '@/lib/ui'

export interface LinkGroupProps {
  title: string
  links: { label: string; href: string }[]
  /** Dark surfaces invert colors */
  dark?: boolean
  className?: string
}

const LinkGroup = forwardRef<HTMLDivElement, LinkGroupProps>(
  function LinkGroup({ title, links, dark = false, className }, ref) {
    return (
      <div ref={ref} className={cn(FONT.body, className)}>
        <h3
          className={cn(
            'text-[12px] mb-2',
            dark
              ? cn(WEIGHT.medium, 'text-[var(--dark-text)]')
              : cn(WEIGHT.strong, 'text-[var(--n800)]'),
          )}
        >
          {title}
        </h3>
        <ul className="list-none p-0 m-0 flex flex-col">
          {links.map((link) => (
            <li key={link.href} style={{ padding: '4px 0px 8px' }}>
              <a
                href={link.href}
                className={cn(
                  'text-[12px] no-underline',
                  WEIGHT.normal,
                  TRANSITION.colors,
                  dark
                    ? 'text-[var(--dark-muted)] hover:text-[var(--dark-text)]'
                    : 'text-[var(--n600)] hover:text-[var(--n1150)]',
                  'hover:underline',
                )}
                style={{
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
      </div>
    )
  },
)

LinkGroup.displayName = 'LinkGroup'
export { LinkGroup }
