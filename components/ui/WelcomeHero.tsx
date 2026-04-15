// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

// ─── Types ───

export interface WelcomeHeroProps {
  icon?: ReactNode
  heading: string
  subtitle?: string
  subtitleHref?: string
  italic?: boolean
  className?: string
}

// ─── Component ───

const WelcomeHero = forwardRef<HTMLDivElement, WelcomeHeroProps>(
  ({ icon, heading, subtitle, subtitleHref, italic = false, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        FONT.body,
        'flex flex-col gap-1 cursor-default',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && <span className="text-[28px] shrink-0">{icon}</span>}
        <h2
          className={cn(
            'text-[28px] leading-tight text-[var(--n1150)]',
            WEIGHT.strong,
            italic && 'italic',
          )}
        >
          {heading}
        </h2>
      </div>

      {subtitle && (
        subtitleHref ? (
          <a
            href={subtitleHref}
            className={cn(
              'text-[13px]',
              WEIGHT.normal,
              'text-[var(--n700)] hover:text-[var(--n900)]',
              'underline underline-offset-[0.25em] decoration-[1px]',
              TRANSITION.colors,
            )}
          >
            {subtitle}
          </a>
        ) : (
          <p
            className={cn(
              'text-[13px]',
              WEIGHT.normal,
              'text-[var(--n600)]',
            )}
          >
            {subtitle}
          </p>
        )
      )}
    </div>
  ),
)

WelcomeHero.displayName = 'WelcomeHero'
export { WelcomeHero }
