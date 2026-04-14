// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS } from '@/lib/ui'
import { Button } from './Button'
import { Spinner } from './Spinner'

// ─── Types ───

export interface ActionPanelProps {
  /** Pre-built save button */
  onSave?: () => void
  saveLabel?: string
  /** Pre-built cancel button */
  onCancel?: () => void
  cancelLabel?: string
  /** Danger mode — save button becomes destructive */
  danger?: boolean
  /** Description text alongside buttons */
  description?: string
  /** Visual variant */
  variant?: 'default' | 'well' | 'toggle'
  /** Custom content (for toggle/well variants) */
  children?: ReactNode
  /** Loading state on save button */
  saving?: boolean
  /** Disabled state */
  disabled?: boolean
  className?: string
}

// ─── Component ───

const ActionPanel = forwardRef<HTMLDivElement, ActionPanelProps>(
  function ActionPanel(
    {
      onSave,
      saveLabel = 'Save',
      onCancel,
      cancelLabel = 'Cancel',
      danger = false,
      description,
      variant = 'default',
      children,
      saving = false,
      disabled = false,
      className,
    },
    ref,
  ) {
    // Toggle variant — no save/cancel, just children
    if (variant === 'toggle') {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center justify-between gap-4',
            'border-t-[0.5px] border-t-[var(--n400)]',
            className,
          )}
          style={{ padding: '16px 0' }}
        >
          <div className="flex items-center gap-3">
            {children}
          </div>
        </div>
      )
    }

    // Buttons
    const buttons = (
      <div className="flex items-center gap-2 shrink-0">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} disabled={disabled}>
            {cancelLabel}
          </Button>
        )}
        {onSave && (
          <Button
            variant="primary"
            onClick={onSave}
            disabled={disabled || saving}
            className={cn(danger && 'bg-[var(--negative)] hover:opacity-90')}
          >
            {saving ? <Spinner size="sm" /> : saveLabel}
          </Button>
        )}
      </div>
    )

    // Well variant
    if (variant === 'well') {
      return (
        <div
          ref={ref}
          className={cn('bg-[var(--n200)]/50', RADIUS.lg, className)}
          style={{ padding: '16px 20px' }}
        >
          {children && <div className="mb-3">{children}</div>}
          {description && (
            <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mb-3')}>
              {description}
            </p>
          )}
          <div className="flex justify-end">{buttons}</div>
        </div>
      )
    }

    // Default variant
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center border-t-[0.5px] border-t-[var(--n400)]',
          description ? 'justify-between' : 'justify-end',
          className,
        )}
        style={{ padding: '16px 0' }}
      >
        {description && (
          <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
            {description}
          </p>
        )}
        {buttons}
      </div>
    )
  },
)

ActionPanel.displayName = 'ActionPanel'
export { ActionPanel }
