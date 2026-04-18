// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { Popover } from '@/components/ui/Popover'
import { Kbd } from '@/components/ui/Kbd'
import { cn, WEIGHT, FOCUS_RING } from '@/lib/ui'

interface ChartShortcutsHintProps {
  align?: 'start' | 'end'
  side?: 'top' | 'bottom'
  compact?: boolean
  className?: string
}

const ROWS: Array<{ keys: string[]; label: string }> = [
  { keys: ['F'], label: 'Fullscreen' },
  { keys: ['←', '→'], label: 'Pan timeline' },
  { keys: ['+', '−'], label: 'Zoom in / out' },
  { keys: ['0'], label: 'Reset zoom' },
  { keys: ['Tab'], label: 'Next control' },
  { keys: ['Esc'], label: 'Exit / reset' },
]

export function ChartShortcutsHint({
  align = 'end',
  side = 'top',
  compact = false,
  className,
}: ChartShortcutsHintProps) {
  return (
    <Popover>
      <Popover.Trigger className={className}>
        <button
          type="button"
          aria-label="Keyboard shortcuts"
          className={cn(
            'inline-flex items-center justify-center rounded-full',
            compact ? 'h-5 w-5 text-[10px]' : 'h-6 w-6 text-[11px]',
            'bg-[var(--n100)] text-[var(--n800)] hover:bg-[var(--n200)]',
            WEIGHT.medium,
            FOCUS_RING,
            'transition-colors',
          )}
        >
          ?
        </button>
      </Popover.Trigger>
      <Popover.Content align={align} side={side} className="w-[220px] p-3">
        <div className={cn('mb-2 text-[11px] text-[var(--n800)]', WEIGHT.medium)}>Keyboard shortcuts</div>
        <ul className="flex flex-col gap-1.5">
          {ROWS.map((r) => (
            <li key={r.label} className="flex items-center justify-between gap-3">
              <span className={cn('text-[11px] text-[var(--n1050)]', WEIGHT.book)}>{r.label}</span>
              <span className="flex items-center gap-1">
                {r.keys.map((k) => (
                  <Kbd key={k}>{k}</Kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </Popover.Content>
    </Popover>
  )
}
