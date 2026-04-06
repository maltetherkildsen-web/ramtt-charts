import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeaderProps {
  children: string
  action?: ReactNode
  className?: string
}

export function SectionHeader({ children, action, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between', className)} style={{ paddingBottom: 6 }}>
      <span style={{ fontFamily: 'var(--font-label)', fontWeight: 500, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)' }}>
        {children}
      </span>
      {action && <div>{action}</div>}
    </div>
  )
}
