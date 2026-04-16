// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'
import { DarkSection } from './DarkSection'
import { LinkGroup } from './LinkGroup'
import { SocialIcons } from './SocialIcons'

type Platform = 'linkedin' | 'x' | 'youtube' | 'github' | 'strava'

export interface FooterProps {
  columns: {
    groups: {
      title: string
      links: { label: string; href: string }[]
    }[]
  }[]
  /** Social media icon links */
  social?: { platform: Platform; href: string }[]
  className?: string
}

const Footer = forwardRef<HTMLElement, FooterProps>(
  function Footer({ columns, social, className }, ref) {
    return (
      <DarkSection className={cn('py-[70px]', className)}>
        <footer
          ref={ref}
          className={cn(FONT.body, 'max-w-[1200px] mx-auto px-8 flex gap-8')}
        >
          {/* Logo column */}
          <div className="flex flex-col justify-between shrink-0" style={{ width: 200 }}>
            <div>
              <span
                className={cn(
                  WEIGHT.strong,
                  'text-[18px] text-[var(--dark-text)]',
                )}
              >
                RAMTT
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {social && social.length > 0 && (
                <SocialIcons links={social} dark />
              )}
              <span
                className={cn(WEIGHT.normal, 'text-[12px] text-[var(--dark-muted)]')}
              >
                &copy; {new Date().getFullYear()} RAMTT
              </span>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid gap-8" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
            {columns.map((col, i) => (
              <div key={i} className="flex flex-col gap-11">
                {col.groups.map((group) => (
                  <LinkGroup
                    key={group.title}
                    title={group.title}
                    links={group.links}
                    dark
                  />
                ))}
              </div>
            ))}
          </div>
        </footer>
      </DarkSection>
    )
  },
)

Footer.displayName = 'Footer'
export { Footer }
