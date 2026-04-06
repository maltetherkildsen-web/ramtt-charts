import { forwardRef, type ReactNode } from 'react'
import { cn, LABEL_STYLE } from '@/lib/ui'

export interface SectionHeaderProps {
  children: string
  action?: ReactNode
  className?: string
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ children, action, className }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between pb-1.5', className)}>
      <h2 className={cn(LABEL_STYLE, 'font-medium')}>{children}</h2>
      {action && <div>{action}</div>}
    </div>
  )
)

SectionHeader.displayName = 'SectionHeader'
export { SectionHeader }
