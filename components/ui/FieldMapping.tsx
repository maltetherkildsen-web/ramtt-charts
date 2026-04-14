// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER } from '@/lib/ui'
import { Select } from './Select'

// ─── Types ───

export interface FieldMappingItem {
  source: string | null
  target: string | null
  status: 'mapped' | 'unmapped' | 'conflict'
}

export interface FieldMappingProps {
  title?: string
  sourceLabel?: string
  targetLabel?: string
  mappings: FieldMappingItem[]
  /** Called when user changes a mapping via dropdown */
  onMapChange?: (source: string | null, target: string | null) => void
  /** Available target fields for unmapped sources */
  availableTargets?: string[]
  className?: string
}

// ─── Status indicators ───

const STATUS_CONFIG = {
  mapped: { icon: '✓', color: 'text-[var(--positive)]' },
  unmapped: { icon: '!', color: 'text-[var(--warning)]' },
  conflict: { icon: '!', color: 'text-[var(--negative)]' },
} as const

// ─── Component ───

const FieldMapping = forwardRef<HTMLDivElement, FieldMappingProps>(
  function FieldMapping(
    {
      title,
      sourceLabel = 'Source',
      targetLabel = 'Target',
      mappings,
      onMapChange,
      availableTargets = [],
      className,
    },
    ref,
  ) {
    const targetOptions = availableTargets.map((t) => ({ value: t, label: t }))

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          className,
        )}
        style={{ padding: 20 }}
      >
        {/* Title */}
        {title && (
          <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)] mb-4')}>
            {title}
          </h3>
        )}

        {/* Column headers */}
        <div
          className="grid items-center border-b-[0.5px] border-b-[var(--n400)]"
          style={{ gridTemplateColumns: '1fr 40px 1fr 24px', paddingBottom: 8 }}
        >
          <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n600)] text-right pr-2')}>
            {sourceLabel}
          </span>
          <span />
          <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n600)] pl-2')}>
            {targetLabel}
          </span>
          <span />
        </div>

        {/* Mapping rows */}
        {mappings.map((mapping, i) => {
          const isLast = i === mappings.length - 1
          const config = STATUS_CONFIG[mapping.status]
          const isUnmappedSource = mapping.source && !mapping.target
          const isUnmappedTarget = !mapping.source && mapping.target

          return (
            <div
              key={`${mapping.source ?? ''}-${mapping.target ?? ''}-${i}`}
              className={cn(
                'grid items-center',
                !isLast && 'border-b-[0.5px] border-b-[var(--n200)]',
              )}
              style={{
                gridTemplateColumns: '1fr 40px 1fr 24px',
                padding: '8px 0',
                minHeight: 36,
              }}
            >
              {/* Source field */}
              <span
                className={cn(
                  FONT.body,
                  'text-[13px] tabular-nums text-right pr-2',
                  WEIGHT.book,
                  mapping.source ? 'text-[var(--n1150)]' : 'text-[var(--n400)]',
                )}
              >
                {mapping.source ?? '—'}
              </span>

              {/* Connecting line */}
              <div className="flex items-center justify-center">
                <div
                  className={cn(
                    'w-full',
                    mapping.status === 'mapped'
                      ? 'border-t-[1px] border-t-[var(--n400)]'
                      : 'border-t-[1px] border-dashed border-t-[var(--n400)]',
                  )}
                />
              </div>

              {/* Target field or Select */}
              <div className="pl-2">
                {isUnmappedSource && onMapChange && targetOptions.length > 0 ? (
                  <Select
                    options={targetOptions}
                    placeholder="Select field"
                    onChange={(val) => onMapChange(mapping.source, val)}
                  />
                ) : (
                  <span
                    className={cn(
                      FONT.body,
                      'text-[13px] tabular-nums',
                      WEIGHT.book,
                      mapping.target ? 'text-[var(--n1150)]' : 'text-[var(--n400)]',
                    )}
                  >
                    {isUnmappedTarget ? mapping.target : (mapping.target ?? '—')}
                  </span>
                )}
              </div>

              {/* Status */}
              <span
                className={cn(
                  FONT.body,
                  'text-[13px] text-center',
                  WEIGHT.medium,
                  config.color,
                )}
              >
                {config.icon}
              </span>
            </div>
          )
        })}
      </div>
    )
  },
)

FieldMapping.displayName = 'FieldMapping'
export { FieldMapping }
