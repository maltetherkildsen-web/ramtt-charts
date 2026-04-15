// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT, WEIGHT } from '@/lib/ui'

const SEMANTIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  default:   { bg: 'var(--n200)',                  text: 'var(--n1050)',                border: 'var(--n400)' },
  positive:  { bg: 'var(--positive-soft)',         text: 'var(--positive-on-soft)',     border: 'var(--positive)' },
  negative:  { bg: 'var(--negative-soft)',         text: 'var(--negative-on-soft)',     border: 'var(--negative)' },
  warning:   { bg: 'var(--warning-soft)',          text: 'var(--warning-on-soft)',      border: 'var(--warning)' },
  info:      { bg: 'var(--info-soft)',             text: 'var(--info-on-soft)',         border: 'var(--info)' },
  nutrition: { bg: 'var(--domain-nutrition-badge)', text: 'var(--domain-nutrition-text)', border: 'var(--domain-nutrition-border)' },
  training:  { bg: 'var(--domain-training-badge)', text: 'var(--domain-training-text)', border: 'var(--domain-training-border)' },
  body:      { bg: 'var(--domain-body-badge)',     text: 'var(--domain-body-text)',     border: 'var(--domain-body-border)' },
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  color?: 'default' | 'positive' | 'negative' | 'warning' | 'info' | 'nutrition' | 'training' | 'body' | string
  size?: 'sm' | 'md'
  className?: string
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ children, variant = 'filled', color = 'default', size = 'sm', className }, ref) {
    const semantic = SEMANTIC_COLORS[color]
    const colorStyle: React.CSSProperties = semantic
      ? variant === 'filled'
        ? { backgroundColor: semantic.bg, color: semantic.text }
        : { border: `0.5px solid ${semantic.border}`, color: semantic.text }
      : variant === 'filled'
        ? { backgroundColor: color, color: 'var(--n50)' }
        : { border: `0.5px solid ${color}`, color }

    return (
      <span
        ref={ref}
        className={cn(
          FONT.label,
          SIZE_HEIGHTS.xs,
          SIZE_TEXT.xs,
          SIZE_PADDING_X.xs,
          RADIUS.sm,
          WEIGHT.medium,
          'inline-flex items-center justify-center leading-none whitespace-nowrap min-w-[18px]',
          className
        )}
        style={colorStyle}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'
export { Badge }
