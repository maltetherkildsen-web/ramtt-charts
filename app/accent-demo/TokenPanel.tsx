'use client'

import { cn, FONT, WEIGHT, RADIUS } from '@/lib/ui'
import { type AccentTokens, TOKEN_LABELS } from './accents'

interface TokenPanelProps {
  tokens: AccentTokens
  onCollapse?: () => void
}

/** Decide text color for legibility on a given background */
function contrastText(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.55 ? '#131211' : '#FDFCFA'
}

const TOKEN_ORDER: (keyof AccentTokens)[] = [
  'pressed',
  'hover',
  'primary',
  'toggleTrack',
  'text',
  'icon',
  'iconLight',
  'iconLightest',
  'border',
  'selection',
  'wash',
  'badgeBg',
]

const GRADIENT_STOPS: (keyof AccentTokens)[] = [
  'pressed',
  'primary',
  'iconLight',
  'border',
  'wash',
  'badgeBg',
]

export function TokenPanel({ tokens, onCollapse }: TokenPanelProps) {
  const gradientCss = GRADIENT_STOPS.map(
    (key, i) => `${tokens[key]} ${Math.round((i / (GRADIENT_STOPS.length - 1)) * 100)}%`,
  ).join(', ')

  return (
    <div
      className={cn(
        'sticky top-[72px] flex w-[200px] shrink-0 flex-col gap-3 self-start',
        FONT.body,
      )}
      style={{ height: 'calc(100vh - 72px - 32px)' }}
    >
      {/* Collapse button */}
      {onCollapse && (
        <button
          onClick={onCollapse}
          className={cn(
            'flex h-6 items-center justify-center gap-1.5',
            'rounded-full border-[0.5px] border-[var(--n300)] bg-[var(--n50)]',
            'text-[var(--n600)] transition-colors hover:bg-[var(--n100)]',
            'text-[10px]', WEIGHT.book,
          )}
          aria-label="Hide token panel"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.75 3.5L5.25 7L8.75 10.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Hide tokens
        </button>
      )}

      {/* Token bars */}
      <div className={cn('flex flex-col gap-0.5', RADIUS.lg, 'overflow-hidden')}>
        {TOKEN_ORDER.map((key) => {
          const color = tokens[key]
          const textColor = contrastText(color)
          return (
            <div
              key={key}
              className="flex h-[26px] items-center justify-between px-2"
              style={{
                backgroundColor: color,
                transition: 'background-color 150ms',
              }}
            >
              <span
                className={cn('text-[10px]', WEIGHT.book)}
                style={{ color: textColor, transition: 'color 150ms' }}
              >
                {TOKEN_LABELS[key]}
              </span>
              <span
                className={cn('text-[9px] tabular-nums', WEIGHT.normal)}
                style={{ color: textColor, opacity: 0.65, transition: 'color 150ms' }}
              >
                {color}
              </span>
            </div>
          )
        })}
      </div>

      {/* Gradient strip */}
      <div className="flex flex-col gap-1">
        <span className={cn('text-[10px]', WEIGHT.book, 'text-[var(--n600)]')}>
          Full ramp
        </span>
        <div
          className={cn('h-5 w-full', RADIUS.md)}
          style={{
            background: `linear-gradient(to right, ${gradientCss})`,
            transition: 'background 150ms',
          }}
        />
      </div>
    </div>
  )
}
