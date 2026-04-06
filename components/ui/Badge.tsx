import { forwardRef } from 'react'
import { cn, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, RADIUS, FONT } from '@/lib/ui'

const SEMANTIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  default:  { bg: 'var(--n200)',          text: 'var(--n1050)',            border: 'var(--n400)' },
  positive: { bg: 'var(--positive-soft)', text: 'var(--positive-on-soft)', border: 'var(--positive)' },
  negative: { bg: 'var(--negative-soft)', text: 'var(--negative-on-soft)', border: 'var(--negative)' },
  warning:  { bg: 'var(--warning-soft)',  text: 'var(--warning-on-soft)',  border: 'var(--warning)' },
  info:     { bg: 'var(--info-soft)',     text: 'var(--info-on-soft)',     border: 'var(--info)' },
}

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  color?: 'default' | 'positive' | 'negative' | 'warning' | 'info' | string
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
          'inline-flex items-center justify-center leading-none font-medium tracking-[0.04em] whitespace-nowrap uppercase min-w-5',
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
