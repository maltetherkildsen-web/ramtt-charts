import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface SettingsCardProps {
  icon?: ReactNode
  title: string
  description?: string
  onClick?: () => void
  className?: string
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const SettingsCard = forwardRef<HTMLDivElement, SettingsCardProps>(
  function SettingsCard({ icon, title, description, onClick, className }, ref) {
    return (
      <div
        ref={ref}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
        aria-label={onClick ? `${title}${description ? `: ${description}` : ''}` : undefined}
        className={cn(
          'flex w-full items-center gap-2.5 bg-[var(--n50)] text-left transition-colors duration-150',
          onClick && 'hover:bg-[var(--n200)]', className,
        )}
        style={{ border: '0.5px solid var(--n400)', borderRadius: 'var(--radius-lg)', padding: '12px 16px' }}
      >
        {icon && <div className="flex shrink-0 items-center justify-center" style={{ color: 'var(--n600)', width: 18, height: 18 }}>{icon}</div>}
        <div className="flex-1">
          <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13, color: 'var(--n1150)' }}>{title}</div>
          {description && <div className="mt-px" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 12, color: 'var(--n800)' }}>{description}</div>}
        </div>
        {onClick && <div className="ml-auto shrink-0" style={{ color: 'var(--n600)' }}><ChevronRight /></div>}
      </div>
    )
  },
)
