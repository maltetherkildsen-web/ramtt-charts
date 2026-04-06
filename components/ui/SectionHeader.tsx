import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SectionHeaderProps {
  children: string
  action?: ReactNode
  className?: string
}

export function SectionHeader({ children, action, className }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between pb-[12px]',
        className,
      )}
      style={{ borderBottom: '0.5px solid var(--n200)' }}
    >
      <span
        className="text-[11px] uppercase"
        style={{
          fontFamily: 'var(--font-label)',
          fontWeight: 600,
          letterSpacing: '0.10em',
          color: 'var(--n600)',
        }}
      >
        {children}
      </span>
      {action && <div>{action}</div>}
    </div>
  )
}
