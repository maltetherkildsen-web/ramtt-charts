// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, BORDER, RADIUS } from '@/lib/ui'

// ─── Types ───

export interface HexSwatchProps {
  /** The hex value to display. Passed as a prop — not a styling literal. */
  hex: string
  /** Optional token name shown above the hex (e.g. "--n50") */
  token?: string
  /** Optional label shown below the hex (e.g. "Canvas") */
  label?: string
  /** Optional usage description (e.g. "Page background") */
  usage?: string
  /** Swatch size in px. Default: 56. */
  size?: number
  className?: string
}

// ─── Component ───

const HexSwatch = forwardRef<HTMLDivElement, HexSwatchProps>(
  ({ hex, token, label, usage, size = 56, className }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)}>
        {token && (
          <span className={cn(FONT.body, 'text-[11px]', WEIGHT.strong, 'text-[var(--n600)]')}>
            {token}
          </span>
        )}
        <div
          className={cn(BORDER.default, RADIUS.md)}
          style={{ width: size, height: size, backgroundColor: hex }}
          aria-label={label ? `${label} swatch, hex ${hex}` : `Hex swatch ${hex}`}
        />
        <div className="flex flex-col gap-0.5">
          {label && (
            <span className={cn(FONT.body, 'text-[12px]', WEIGHT.medium, 'text-[var(--n1150)]')}>
              {label}
            </span>
          )}
          <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)] tabular-nums')}>
            {hex}
          </span>
          {usage && (
            <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n600)]')}>
              {usage}
            </span>
          )}
        </div>
      </div>
    )
  },
)

HexSwatch.displayName = 'HexSwatch'
export { HexSwatch }
