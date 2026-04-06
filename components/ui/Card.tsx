import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

const PADDING: Record<string, string> = { none: '', sm: 'p-2.5', md: '', lg: 'p-5' }

export interface CardProps {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  function Card({ children, padding = 'md', className }, ref) {
    return (
      <div ref={ref} className={cn('bg-[var(--n50)]', PADDING[padding], className)} style={{
        border: '0.5px solid var(--n400)', borderRadius: 'var(--radius-lg)',
        ...(padding === 'md' ? { padding: '14px 16px' } : {}),
      }}>
        {children}
      </div>
    )
  },
)

const CardHeader = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  function CardHeader({ children, className }, ref) {
    return <div ref={ref} className={cn('flex items-center justify-between', className)} style={{ paddingBottom: 10, borderBottom: '0.5px solid var(--n200)' }}>{children}</div>
  },
)

const CardTitle = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
  function CardTitle({ children, className }, ref) {
    return <h3 ref={ref} className={cn('', className)} style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 14, color: 'var(--n1150)', margin: 0 }}>{children}</h3>
  },
)

function CardAction({ children }: { children: ReactNode }) { return <div>{children}</div> }
CardAction.displayName = 'Card.Action'

const CardBody = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  function CardBody({ children, className }, ref) {
    return <div ref={ref} className={cn('pt-2.5', className)}>{children}</div>
  },
)

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Action: CardAction,
  Body: CardBody,
})
