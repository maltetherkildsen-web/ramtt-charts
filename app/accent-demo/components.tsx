'use client'

import { cn, FONT, WEIGHT, RADIUS, TRANSITION, SWITCH_TRACK, SWITCH_THUMB, FOCUS_RING } from '@/lib/ui'
import { needsDarkTextOnFill } from './accents'

// ─── Shared accent transition ───

export const accentTransition: React.CSSProperties = {
  transition: 'background-color 150ms, color 150ms, border-color 150ms',
}

// ─── Toggle Switch ───

interface ToggleSwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  description?: string
}

export function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex flex-col">
        <span className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}>
          {label}
        </span>
        {description && (
          <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-0.5')}>
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex shrink-0 items-center rounded-full cursor-default',
          TRANSITION.background,
          FOCUS_RING,
        )}
        style={{
          width: SWITCH_TRACK.width,
          height: SWITCH_TRACK.height,
          backgroundColor: checked ? 'var(--accent-toggle)' : 'var(--n400)',
          ...accentTransition,
        }}
      >
        <span
          className={cn('block rounded-full', TRANSITION.transform)}
          style={{
            width: SWITCH_THUMB.size,
            height: SWITCH_THUMB.size,
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.12)',
            transform: checked
              ? `translateX(${SWITCH_TRACK.width - SWITCH_THUMB.size - SWITCH_THUMB.inset}px)`
              : `translateX(${SWITCH_THUMB.inset}px)`,
          }}
        />
      </button>
    </div>
  )
}

// ─── Status Dot ───

interface StatusDotProps {
  color: string
  label: string
  status: string
  muted?: boolean
}

export function StatusDot({ color, label, status, muted }: StatusDotProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color, ...accentTransition }}
      />
      <span className={cn(
        FONT.body, 'text-[12px]', WEIGHT.book,
        muted ? 'text-[var(--n600)]' : 'text-[var(--n1150)]',
      )}>
        {label}
      </span>
      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>
        {status}
      </span>
    </div>
  )
}

// ─── Accent Badge (inline) ───

interface AccentBadgeProps {
  children: React.ReactNode
  variant: 'filled' | 'soft' | 'outline'
  accentHex: string
}

export function AccentBadge({ children, variant, accentHex }: AccentBadgeProps) {
  const isDark = needsDarkTextOnFill(accentHex)
  const fillText = isDark ? 'var(--n1150)' : '#FDFCFA'

  const styles: Record<string, React.CSSProperties> = {
    filled: {
      backgroundColor: 'var(--accent)',
      color: fillText,
      ...accentTransition,
    },
    soft: {
      backgroundColor: 'var(--accent-badge)',
      border: '0.5px solid var(--accent-border)',
      color: 'var(--accent-text)',
      ...accentTransition,
    },
    outline: {
      border: '0.5px solid var(--accent-border)',
      color: 'var(--accent-text)',
      ...accentTransition,
    },
  }

  return (
    <span
      className={cn(
        FONT.label,
        'h-[18px] px-1.5 text-[11px]',
        WEIGHT.medium,
        RADIUS.sm,
        'inline-flex items-center justify-center leading-none whitespace-nowrap',
      )}
      style={styles[variant]}
    >
      {children}
    </span>
  )
}

// ─── Accent Button ───

interface AccentButtonProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'ghost'
  accentHex: string
  size?: 'sm' | 'md'
}

export function AccentButton({ children, variant, accentHex, size = 'md' }: AccentButtonProps) {
  const isDark = needsDarkTextOnFill(accentHex)
  const fillText = isDark ? 'var(--n1150)' : '#FDFCFA'

  const height = size === 'sm' ? 'h-7' : 'h-8'
  const px = size === 'sm' ? 'px-2.5' : 'px-3.5'
  const text = size === 'sm' ? 'text-[12px]' : 'text-[13px]'

  const base = cn(
    FONT.body, WEIGHT.medium, text, height, px,
    RADIUS.md, TRANSITION.colors, FOCUS_RING,
    'inline-flex items-center justify-center cursor-default',
  )

  if (variant === 'primary') {
    return (
      <button
        className={base}
        style={{
          backgroundColor: 'var(--accent)',
          color: fillText,
          ...accentTransition,
        }}
      >
        {children}
      </button>
    )
  }

  if (variant === 'secondary') {
    return (
      <button
        className={cn(base, 'bg-transparent')}
        style={{
          border: '0.5px solid var(--accent)',
          color: 'var(--accent-text)',
          ...accentTransition,
        }}
      >
        {children}
      </button>
    )
  }

  // ghost
  return (
    <button
      className={cn(base, 'bg-transparent hover:bg-[var(--n200)]')}
      style={{
        color: 'var(--accent-text)',
        ...accentTransition,
      }}
    >
      {children}
    </button>
  )
}

// ─── Diet Pill ───

interface DietPillProps {
  label: string
  selected: boolean
  onClick: () => void
  accentHex: string
}

export function DietPill({ label, selected, onClick, accentHex }: DietPillProps) {
  const isDark = needsDarkTextOnFill(accentHex)
  const fillText = isDark ? 'var(--n1150)' : '#FDFCFA'

  return (
    <button
      onClick={onClick}
      className={cn(
        FONT.label,
        'h-7 px-2.5 text-[12px]',
        RADIUS.md,
        TRANSITION.colors,
        FOCUS_RING,
        'inline-flex items-center justify-center cursor-default',
        !selected && cn(WEIGHT.normal, 'text-[var(--n1150)] bg-[var(--n50)]'),
        selected && WEIGHT.strong,
      )}
      style={
        selected
          ? {
              backgroundColor: 'var(--accent)',
              color: fillText,
              border: '1.5px solid var(--accent)',
              ...accentTransition,
            }
          : {
              border: '0.5px solid var(--n400)',
              ...accentTransition,
            }
      }
    >
      {label}
    </button>
  )
}

// ─── Integration Icon Box ───

interface IntegrationIconProps {
  letters: string
  color: string
  bgOpacity?: number
}

export function IntegrationIcon({ letters, color, bgOpacity = 0.08 }: IntegrationIconProps) {
  return (
    <div
      className={cn(
        'flex h-[30px] w-[30px] shrink-0 items-center justify-center',
        RADIUS.md,
        FONT.body, WEIGHT.strong, 'text-[11px]',
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${color} ${Math.round(bgOpacity * 100)}%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 18%, transparent)`,
        color,
      }}
    >
      {letters}
    </div>
  )
}
