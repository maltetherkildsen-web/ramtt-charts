// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, BORDER, RADIUS, TRANSITION, HOVER_SAND, MUTED_STYLE, FOCUS_RING, WEIGHT } from '@/lib/ui'

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

const SettingsCard = forwardRef<HTMLDivElement, SettingsCardProps>(
  ({ icon, title, description, onClick, className }, ref) => (
    <div
      ref={ref}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } } : undefined}
      aria-label={onClick ? `${title}${description ? `: ${description}` : ''}` : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 bg-[var(--n50)] text-left',
        BORDER.default,
        RADIUS.lg,
        'py-3 px-4',
        onClick && cn(TRANSITION.background, HOVER_SAND, FOCUS_RING),
        className,
      )}
    >
      {icon && <div className="flex shrink-0 items-center justify-center text-[var(--n600)] w-[18px] h-[18px]">{icon}</div>}
      <div className="flex-1">
        <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{title}</div>
        {description && <div className={cn(MUTED_STYLE, 'mt-px text-[12px]')}>{description}</div>}
      </div>
      {onClick && <div className="ml-auto shrink-0 text-[var(--n600)]"><ChevronRight /></div>}
    </div>
  )
)

SettingsCard.displayName = 'SettingsCard'
export { SettingsCard }
