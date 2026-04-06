import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ─── Padding presets ─── */
const PADDING: Record<string, string> = {
  none: '',
  sm: 'p-3',
  md: 'p-6',
  lg: 'p-8',
}

/* ─── Card ─── */

export interface CardProps {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Card({ children, padding = 'md', className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] bg-[var(--n50)]',
        PADDING[padding],
        className,
      )}
      style={{ border: '0.5px solid var(--n400)' }}
    >
      {children}
    </div>
  )
}

/* ─── Card.Header ─── */

export interface CardHeaderProps {
  children: ReactNode
  className?: string
}

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={cn('flex items-center justify-between pb-4', className)}
      style={{ borderBottom: '0.5px solid var(--n200)' }}
    >
      {children}
    </div>
  )
}

/* ─── Card.Title ─── */

export interface CardTitleProps {
  children: ReactNode
  className?: string
}

function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3
      className={cn('text-[15px]', className)}
      style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--n1150)' }}
    >
      {children}
    </h3>
  )
}

/* ─── Card.Action ─── */

function CardAction({ children }: { children: ReactNode }) {
  return <div>{children}</div>
}

/* ─── Card.Body ─── */

function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('pt-4', className)}>{children}</div>
}

/* ─── Compound component ─── */

Card.Header = CardHeader
Card.Title = CardTitle
Card.Action = CardAction
Card.Body = CardBody
