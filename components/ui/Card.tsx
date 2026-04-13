// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, RADIUS, BORDER, FONT, TRANSITION, WHITE_LIFT, WEIGHT } from '@/lib/ui'

export type CardTint = 'positive' | 'negative' | 'warning' | 'info' | 'accent-purple' | 'accent-red'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg'
  tint?: CardTint
}

const paddingMap = {
  none: '',
  sm: 'p-2.5',
  md: 'p-3.5',
  lg: 'p-5',
}

const TINT_BG: Record<CardTint, string> = {
  positive: 'color-mix(in srgb, var(--positive-soft) 30%, var(--n50) 70%)',
  negative: 'color-mix(in srgb, var(--negative-soft) 30%, var(--n50) 70%)',
  warning: 'color-mix(in srgb, var(--warning-soft) 30%, var(--n50) 70%)',
  info: 'color-mix(in srgb, var(--info-soft) 30%, var(--n50) 70%)',
  'accent-purple': 'color-mix(in srgb, var(--accent-light) 40%, var(--n50) 60%)',
  'accent-red': 'color-mix(in srgb, var(--negative-soft) 20%, var(--n50) 80%)',
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'md', tint, className, children, onClick, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        !tint && 'bg-[var(--n50)]',
        BORDER.default,
        RADIUS.lg,
        paddingMap[padding],
        onClick && cn(TRANSITION.background, WHITE_LIFT, 'cursor-default'),
        className
      )}
      onClick={onClick}
      style={tint ? { backgroundColor: TINT_BG[tint], ...style } : style}
      {...props}
    >
      {children}
    </div>
  )
)
CardRoot.displayName = 'Card'

const CardHeader = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('flex items-center justify-between mb-3', className)}>{children}</div>
)
CardHeader.displayName = 'Card.Header'

const CardTitle = ({ children, className }: { children: ReactNode; className?: string }) => (
  <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]', className)}>{children}</h3>
)
CardTitle.displayName = 'Card.Title'

const CardBody = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn(className)}>{children}</div>
)
CardBody.displayName = 'Card.Body'

const CardAction = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn(className)}>{children}</div>
)
CardAction.displayName = 'Card.Action'

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Action: CardAction,
})
