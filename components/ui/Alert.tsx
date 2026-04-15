// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

// ─── Color mappings ───

const SEMANTIC_COLORS: Record<string, string> = {
  default: 'var(--n1050)',
  info: 'var(--info)',
  warning: 'var(--warning)',
  error: 'var(--negative)',
  success: 'var(--positive)',
}

// ─── Types ───

export interface AlertProps {
  severity?: 'default' | 'info' | 'warning' | 'error' | 'success'
  /** @deprecated Use severity instead */
  variant?: 'default' | 'info' | 'warning' | 'error' | 'success'
  /** Visual approach: dot (default), edge-left, or edge-top */
  appearance?: 'dot' | 'edge-left' | 'edge-top'
  title?: string
  children: ReactNode
  onDismiss?: () => void
  action?: { label: string; onClick: () => void }
  className?: string
}

// ─── Shared sub-components ───

function DismissButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Dismiss"
      className={cn('shrink-0 text-[var(--n600)] hover:text-[var(--n1150)]', TRANSITION.colors)}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    </button>
  )
}

function ActionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        FONT.body, 'text-[12px]', WEIGHT.medium, 'text-[var(--n1150)]',
        'mt-2 px-2.5 py-1 border-[0.5px] border-[var(--n400)] rounded-[5px]',
        'hover:bg-[var(--n200)]', TRANSITION.background,
      )}
    >
      {label}
    </button>
  )
}

function AlertContent({ title, children, action }: { title?: string; children: ReactNode; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="flex-1 min-w-0">
      {title && <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{title}</div>}
      <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]', title && 'mt-0.5')}>{children}</div>
      {action && <ActionButton label={action.label} onClick={action.onClick} />}
    </div>
  )
}

// ─── Component ───

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ severity, variant, appearance = 'dot', title, children, onDismiss, action, className }, ref) => {
    const sev = severity ?? variant ?? 'default'
    const dotColor = SEMANTIC_COLORS[sev]

    // ── Variant A: Dot (neutral card + colored dot) — DEFAULT ──
    if (appearance === 'dot') {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(
            'bg-[var(--n50)] border-[0.5px] border-[var(--n400)] rounded-[12px] px-4 py-3',
            className,
          )}
        >
          <div className="flex items-start gap-2.5">
            <span className="shrink-0 rounded-[30%] mt-1.5" style={{ width: 8, height: 8, backgroundColor: dotColor }} />
            <AlertContent title={title} action={action}>{children}</AlertContent>
            {onDismiss && <DismissButton onClick={onDismiss} />}
          </div>
        </div>
      )
    }

    // ── Variant B: Edge-left (2px colored left border) ──
    if (appearance === 'edge-left') {
      return (
        <div
          ref={ref}
          role="alert"
          className={cn(
            'bg-[var(--n50)] border-[0.5px] border-[var(--n400)] rounded-[12px] px-4 py-3',
            className,
          )}
          style={{ borderLeftWidth: 2, borderLeftColor: dotColor, borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }}
        >
          <div className="flex items-start gap-2.5">
            <AlertContent title={title} action={action}>{children}</AlertContent>
            {onDismiss && <DismissButton onClick={onDismiss} />}
          </div>
        </div>
      )
    }

    // ── Variant C: Edge-top (2px colored top border) ──
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'bg-[var(--n50)] border-[0.5px] border-[var(--n400)] rounded-[12px] px-4 py-3',
          className,
        )}
        style={{ borderTopWidth: 2, borderTopColor: dotColor, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
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
