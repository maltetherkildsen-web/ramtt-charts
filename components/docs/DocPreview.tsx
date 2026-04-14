import { cn, BORDER, RADIUS } from '@/lib/ui'
import type { ReactNode } from 'react'

interface DocPreviewProps {
  children: ReactNode
  className?: string
}

export function DocPreview({ children, className }: DocPreviewProps) {
  return (
    <div className={cn(
      'bg-[var(--n50)]',
      BORDER.default,
      RADIUS.lg,
      'p-6',
      'flex items-center justify-center gap-3 flex-wrap',
      className,
    )}>
      {children}
    </div>
  )
}
