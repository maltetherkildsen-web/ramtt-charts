import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const SEMANTIC_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  default:  { bg: 'var(--n200)',          text: 'var(--n1050)',         border: 'var(--n400)' },
  positive: { bg: 'var(--positive-soft)', text: 'var(--positive-on-soft)', border: 'var(--positive)' },
  negative: { bg: 'var(--negative-soft)', text: 'var(--negative-on-soft)', border: 'var(--negative)' },
  warning:  { bg: 'var(--warning-soft)',  text: 'var(--warning-on-soft)',  border: 'var(--warning)' },
  info:     { bg: 'var(--info-soft)',     text: 'var(--info-on-soft)',     border: 'var(--info)' },
}

export interface BadgeProps {
  children: ReactNode
  variant?: 'filled' | 'outline'
  color?: 'default' | 'positive' | 'negative' | 'warning' | 'info' | string
  size?: 'sm' | 'md'
  className?: string
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  function Badge({ children, variant = 'filled', color = 'default', size = 'sm', className }, ref) {
    const semantic = SEMANTIC_COLORS[color]

    const style: React.CSSProperties = semantic
      ? variant === 'filled'
        ? { backgroundColor: semantic.bg, color: semantic.text }
        : { border: `0.5px solid ${semantic.border}`, color: semantic.text }
      : variant === 'filled'
        ? { backgroundColor: color, color: 'var(--n50)' }
        : { border: `0.5px solid ${color}`, color }

    return (
      <span
        ref={ref}
        style={{
          ...style,
          fontFamily: 'var(--font-label)',
          letterSpacing: size === 'sm' ? '0.10em' : '0.08em',
        }}
        className={cn(
          'inline-flex items-center whitespace-nowrap uppercase',
          'rounded-[var(--radius-sm)]',
          size === 'sm'
            ? 'px-2.5 py-[3px] text-[10px] font-semibold'
            : 'px-2.5 py-[3px] text-[12px] font-semibold',
          className,
        )}
      >
        {children}
      </span>
    )
  },
)
