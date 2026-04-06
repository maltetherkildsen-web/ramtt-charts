import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const PADDING: Record<string, string> = { none: '', sm: 'p-2.5', md: '', lg: 'p-5' }

export interface CardProps {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Card({ children, padding = 'md', className }: CardProps) {
  return (
    <div className={cn('bg-[var(--n50)]', PADDING[padding], className)} style={{
      border: '0.5px solid var(--n400)', borderRadius: 'var(--radius-lg)',
      ...(padding === 'md' ? { padding: '14px 16px' } : {}),
    }}>
      {children}
    </div>
  )
}

function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-between', className)} style={{ paddingBottom: 10, borderBottom: '0.5px solid var(--n200)' }}>{children}</div>
}

function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('', className)} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, color: 'var(--n1150)' }}>{children}</h3>
}

function CardAction({ children }: { children: ReactNode }) { return <div>{children}</div> }

function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('pt-2.5', className)}>{children}</div>
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Action = CardAction
Card.Body = CardBody
