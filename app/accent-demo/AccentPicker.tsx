'use client'

import { cn, FONT, WEIGHT, RADIUS, TRANSITION } from '@/lib/ui'
import { ACCENTS, ACCENT_FAMILIES, type AccentDefinition } from './accents'

interface AccentPickerProps {
  activeId: string
  onSelect: (accent: AccentDefinition) => void
}

export function AccentPicker({ activeId, onSelect }: AccentPickerProps) {
  const active = ACCENTS.find((a) => a.id === activeId)
  const grouped = ACCENT_FAMILIES.map((family) => ({
    family,
    accents: ACCENTS.filter((a) => a.family === family),
  })).filter((g) => g.accents.length > 0)

  return (
    <div
      className={cn(
        'sticky top-0 z-50 flex flex-col items-center gap-1.5 px-4 py-2.5',
        FONT.body,
      )}
      style={{ backgroundColor: 'var(--n1150)' }}
      role="toolbar"
      aria-label="Accent color picker"
    >
      {/* Swatch groups */}
      <div className="flex flex-wrap items-end justify-center gap-2.5">
        {grouped.map((group, gi) => (
          <div key={group.family} className="flex items-end gap-2.5">
            {gi > 0 && (
              <div
                className="h-6 w-px shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <span
                className={cn('text-[10px]', WEIGHT.normal)}
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                {group.family}
              </span>
              <div className="flex items-center gap-1">
                {group.accents.map((accent) => {
                  const isActive = accent.id === activeId
                  return (
                    <button
                      key={accent.id}
                      onClick={() => onSelect(accent)}
                      aria-label={`${accent.name} (${accent.hex})`}
                      aria-pressed={isActive}
                      className={cn(
                        'relative h-[18px] w-[18px] shrink-0',
                        RADIUS.full,
                        TRANSITION.opacity,
                        'focus-visible:outline-none',
                      )}
                      style={{
                        backgroundColor: accent.hex,
                        boxShadow: isActive
                          ? '0 0 0 2px var(--n1150), 0 0 0 3.5px rgba(255,255,255,0.9)'
                          : 'none',
                      }}
                    >
                      {accent.suggested && (
                        <span
                          className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active accent info */}
      {active && (
        <div className="flex items-center gap-2">
          <span
            className={cn('text-[12px]', WEIGHT.strong)}
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            {active.name}
          </span>
          <span
            className={cn('text-[11px] tabular-nums', WEIGHT.normal)}
            style={{ color: 'rgba(255,255,255,0.40)' }}
          >
            {active.hex}
          </span>
          {active.suggested && (
            <span
              className={cn('text-[10px]', WEIGHT.book)}
              style={{ color: 'rgba(255,255,255,0.30)' }}
            >
              Suggested
            </span>
          )}
        </div>
      )}
    </div>
  )
}
