// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

// ─── Color mappings ───

const SEMANTIC_COLORS: Record<string, string> = {
  default: 'var(--n600)',
  info: 'var(--info)',
  warning: 'var(--warning)',
  error: 'var(--negative)',
  success: 'var(--positive)',
}

const TINT_BG: Record<string, string> = {
  default: 'var(--n200)',
  info: 'var(--info-soft)',
  warning: 'var(--warning-soft)',
  error: 'var(--negative-soft)',
  success: 'var(--positive-soft)',
}

const TINT_BORDER: Record<string, string> = {
  default: 'var(--n400)',
  info: 'rgba(14, 165, 233, 0.2)',
  warning: 'rgba(245, 158, 11, 0.2)',
  error: 'rgba(244, 63, 94, 0.2)',
  success: 'rgba(132, 204, 22, 0.2)',
}

// ─── Types ───

export interface AlertProps {
  severity?: 'default' | 'info' | 'warning' | 'error' | 'success'
  /** @deprecated Use severity instead */
  variant?: 'default' | 'info' | 'warning' | 'error' | 'success'
  /** Visual approach: tinted bg, neutral card + dot, or top-edge accent */
  appearance?: 'tinted' | 'dot' | 'accent'
  title?: string
  children: ReactNode
  onDismiss?: () => void
  action?: { label: string; onClick: () => void }
  className?: string
}

// ─── Shared dismiss button ───

function DismissButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Dismiss"
      className={cn(
        'shrink-0 text-[var(--n600)] hover:text-[var(--n1150)]',
        TRANSITION.colors,
      )}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    </button>
  )
}

// ─── Shared action button ───

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        FONT.body,
        'text-[12px]',
        WEIGHT.medium,
        'text-[var(--n1150)]',
        'mt-2 px-2.5 py-1 border-[0.5px] border-[var(--n400)] rounded-[5px]',
        'hover:bg-[var(--n200)]',
        TRANSITION.background,
      )}
    >
      {label}
    </button>
  )
}

// ─── Shared content block ───

function AlertContent({ title, children, action }: { title?: string; children: ReactNode; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex-1 min-w-0">
      {title && (
        <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
          {title}
        </div>
      )}
      <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]', title && 'mt-0.5')}>
        {children}
      </div>
      {action && <ActionButton label={action.label} onClick={action.onClick} />}
    </div>
  )
}

// ─── Component ───

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ severity, variant, appearance = 'tinted', title, children, onDismiss, action, className }, ref) => {
    // Support both severity and legacy variant prop
    const sev = severity ?? variant ?? 'default'
    const dotColor = SEMANTIC_COLORS[sev]

    // ── Variant A: Tinted background ──
    if (appearance === 'tinted') {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn('rounded-[12px] px-4 py-3', className)}
          style={{
            backgroundColor: TINT_BG[sev],
            border: `0.5px solid ${TINT_BORDER[sev]}`,
          }}
        >
          <div className="flex items-start gap-2.5">
            <span
              className="shrink-0 rounded-full mt-1.5"
              style={{ width: 8, height: 8, backgroundColor: dotColor }}
            />
            <AlertContent title={title} action={action}>{children}</AlertContent>
            {onDismiss && <DismissButton onClick={onDismiss} />}
          </div>
        </div>
      )
    }

    // ── Variant B: Dot (neutral card + colored dot) ──
    if (appearance === 'dot') {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(
            'bg-[var(--n50)]',
            'border-[0.5px] border-[var(--n400)]',
            'rounded-[12px]',
            'px-4 py-3',
            className,
          )}
        >
          <div className="flex items-start gap-2.5">
            <span
              className="shrink-0 rounded-full mt-1.5"
              style={{ width: 8, height: 8, backgroundColor: dotColor }}
            />
            <AlertContent title={title} action={action}>{children}</AlertContent>
            {onDismiss && <DismissButton onClick={onDismiss} />}
          </div>
        </div>
      )
    }

    // ── Variant C: Accent (top-edge color line) ──
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'bg-[var(--n50)]',
          'border-[0.5px] border-[var(--n400)]',
          'rounded-[12px]',
          'px-4 py-3',
          'overflow-hidden',
          className,
        )}
        style={{ borderTopWidth: 2, borderTopColor: dotColor }}
      >
        <div className="flex items-start gap-2.5">
          <AlertContent title={title} action={action}>{children}</AlertContent>
          {onDismiss && <DismissButton onClick={onDismiss} />}
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
export { Alert }
