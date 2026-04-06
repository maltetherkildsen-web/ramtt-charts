import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeaderProps {
  children: string
  action?: ReactNode
  className?: string
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  function SectionHeader({ children, action, className }, ref) {
    return (
      <div ref={ref} className={cn('flex items-center justify-between', className)} style={{ paddingBottom: 6 }}>
        <h2 style={{ fontFamily: 'var(--font-label)', fontWeight: 500, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)', margin: 0 }}>
          {children}
        </h2>
        {action && <div>{action}</div>}
      </div>
    )
  },
)
