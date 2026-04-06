import { type ReactNode } from 'react'
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SettingsCard({ icon, title, description, onClick, className }: SettingsCardProps) {
  const Tag = onClick ? 'button' : 'div'

  return (
    <Tag
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-4 rounded-[var(--radius-lg)] bg-[var(--n50)] text-left transition-colors duration-150',
        onClick && 'cursor-pointer hover:bg-[var(--n200)]',
        className,
      )}
      style={{
        border: '0.5px solid var(--n400)',
        padding: '24px 28px',
      }}
    >
      {/* Icon */}
      {icon && (
        <div
          className="flex flex-shrink-0 items-center justify-center"
          style={{ color: 'var(--n600)', width: 36, height: 36 }}
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex-1">
        <div
          className="text-[15px]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, color: 'var(--n1150)' }}
        >
          {title}
        </div>
        {description && (
          <div
            className="mt-0.5 text-[13px]"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, color: 'var(--n800)' }}
          >
            {description}
          </div>
        )}
      </div>

      {/* Chevron */}
      {onClick && (
        <div className="ml-auto flex-shrink-0" style={{ color: 'var(--n600)' }}>
          <ChevronRight />
        </div>
      )}
    </Tag>
  )
}
