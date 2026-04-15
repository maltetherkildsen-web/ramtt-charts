// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, DOT_SIZES } from '@/lib/ui'

// ─── Semantic color map ───

const SEMANTIC_DOT_COLORS: Record<string, string> = {
  positive: 'var(--positive)',
  negative: 'var(--negative)',
  warning: 'var(--warning)',
  info: 'var(--info)',
}

// ─── Types ───

export interface ColorDotProps {
  /** Semantic name or any CSS color value */
  color: 'positive' | 'negative' | 'warning' | 'info' | (string & {})
  /** 6px, 8px, 10px */
  size?: 'sm' | 'md' | 'lg'
  /** Text after the dot */
  label?: string
  /** Gentle pulse for live indicators */
  pulse?: boolean
  className?: string
}

// ─── Component ───

const ColorDot = forwardRef<HTMLSpanElement, ColorDotProps>(
  ({ color, size = 'md', label, pulse = false, className }, ref) => {
    const resolvedColor = SEMANTIC_DOT_COLORS[color] ?? color
    const px = DOT_SIZES[size]

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center', className)}
      >
        <span
          className={cn(
            'inline-block shrink-0 rounded-[30%]',
            pulse && 'ramtt-dot-pulse',
          )}
          style={{
            width: px,
            height: px,
            backgroundColor: resolvedColor,
            animation: pulse ? 'ramtt-dot-pulse 2s ease-in-out infinite' : undefined,
          }}
          aria-hidden="true"
        />
        {label && (
          <span
            className={cn(
              FONT.body,
              WEIGHT.normal,
              'text-[12px] text-[var(--n800)] ml-1.5',
            )}
          >
            {label}
          </span>
        )}
      </span>
    )
  },
)

ColorDot.displayName = 'ColorDot'
export { ColorDot }
