// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'

/**
 * ComingSoon — full-screen placeholder used across ramtt.app, ramtt.com, ramtt.dev
 * while the product is offline for the public. Intentionally static: no animation,
 * no email-capture, no logo image, no countdown. Rendered as a <main> landmark so
 * screen readers announce it correctly on routes that no longer have a page chrome.
 *
 * Typography follows lib/ui.ts scale — do not hardcode fontFamily or fontWeight.
 */

export interface ComingSoonProps {
  /** Text locale. Only ramtt.com needs 'da'; ramtt.dev/ramtt.app stay on 'en'. */
  locale?: 'da' | 'en'
  className?: string
}

const TRANSLATIONS = {
  da: {
    status: 'Kommer snart',
    tagline: 'Træningsanalyse for udholdenhedsatleter.',
  },
  en: {
    status: 'Coming soon',
    tagline: 'Training analytics for endurance athletes.',
  },
} as const

const ComingSoon = forwardRef<HTMLElement, ComingSoonProps>(
  function ComingSoon({ locale = 'en', className }, ref) {
    const t = TRANSLATIONS[locale]

    return (
      <main
        ref={ref}
        className={cn(
          'min-h-screen w-full flex flex-col items-center justify-center',
          'bg-[var(--bg)] px-6',
          FONT.body,
          className,
        )}
      >
        <div className="flex flex-col items-center text-center">
          <h1 className={cn('text-[32px] tracking-normal text-[var(--n1150)]', WEIGHT.strong)}>
            RAMTT
          </h1>

          <p className={cn('mt-3 text-[15px] text-[var(--n800)]', WEIGHT.book)}>
            {t.status}
          </p>

          <div aria-hidden="true" className="mt-6 h-px w-6 bg-[var(--n400)]" />

          <p
            className={cn('mt-6 max-w-[280px] text-[13px] text-[var(--n600)]', WEIGHT.normal)}
            style={{ textWrap: 'balance' }}
          >
            {t.tagline}
          </p>
        </div>
      </main>
    )
  },
)

ComingSoon.displayName = 'ComingSoon'
export { ComingSoon }
