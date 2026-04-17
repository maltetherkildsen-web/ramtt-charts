// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * AthleteParamsPanel — chart-test page only.
 *
 * Manual override panel for FTP, CP, and body weight when the FIT file
 * doesn't include user_profile / zones_target data (Sauce, TCX→FIT,
 * Zwift, older Garmin firmware, etc.).
 */

import { useCallback, useRef, useState } from 'react'
import { cn, WEIGHT, BORDER, RADIUS, TRANSITION, LABEL_STYLE } from '@/lib/ui'
import { Input } from '@/components/ui/Input'

export type ParamSource = 'file' | 'manual' | 'missing'

export interface AthleteParamsState {
  ftp: { value: number | undefined; source: ParamSource }
  cp: { value: number | undefined; source: ParamSource }
  weightKg: { value: number | undefined; source: ParamSource }
  /** Threshold pace in seconds-per-km — running only. */
  thresholdPaceSecPerKm: { value: number | undefined; source: ParamSource }
}

export interface AthleteParamsPanelProps {
  state: AthleteParamsState
  onChange: (next: AthleteParamsState) => void
  /** When true, hides FTP/CP and exposes threshold pace instead. */
  isRunning?: boolean
  className?: string
}

function sourceLabel(source: ParamSource): string {
  switch (source) {
    case 'file': return 'from file'
    case 'manual': return 'manually entered'
    case 'missing': return 'missing'
  }
}

function sourceColor(source: ParamSource): string {
  switch (source) {
    case 'file': return 'var(--n600)'
    case 'manual': return 'var(--n800)'
    case 'missing': return 'var(--warning)'
  }
}

export function AthleteParamsPanel({ state, onChange, isRunning, className }: AthleteParamsPanelProps) {
  // 200ms debounce per field — keeps zone recolor "live" but avoids recalc on every keystroke
  const debounceTimers = useRef<{ [K in keyof AthleteParamsState]?: ReturnType<typeof setTimeout> }>({})

  const handleEdit = useCallback(
    (field: keyof AthleteParamsState, raw: string) => {
      if (debounceTimers.current[field]) clearTimeout(debounceTimers.current[field])
      debounceTimers.current[field] = setTimeout(() => {
        const trimmed = raw.trim()
        if (trimmed === '') {
          onChange({ ...state, [field]: { value: undefined, source: 'missing' } })
          return
        }
        const num = Number(trimmed)
        if (!Number.isFinite(num) || num <= 0) return
        onChange({ ...state, [field]: { value: num, source: 'manual' } })
      }, 200)
    },
    [state, onChange],
  )

  // Pace input accepts "4:30" mm:ss — parse to seconds before storing.
  const handlePaceEdit = useCallback(
    (raw: string) => {
      if (debounceTimers.current.thresholdPaceSecPerKm) clearTimeout(debounceTimers.current.thresholdPaceSecPerKm)
      debounceTimers.current.thresholdPaceSecPerKm = setTimeout(() => {
        const trimmed = raw.trim()
        if (trimmed === '') {
          onChange({ ...state, thresholdPaceSecPerKm: { value: undefined, source: 'missing' } })
          return
        }
        const m = /^(\d{1,2}):(\d{2})$/.exec(trimmed)
        let secs: number
        if (m) {
          secs = parseInt(m[1], 10) * 60 + parseInt(m[2], 10)
        } else {
          const num = Number(trimmed)
          if (!Number.isFinite(num) || num <= 0) return
          // Bare number ≤ 30 → minutes; otherwise seconds. 4 → 4:00; 240 → 4:00.
          secs = num <= 30 ? Math.round(num * 60) : Math.round(num)
        }
        if (secs < 60 || secs > 1800) return
        onChange({ ...state, thresholdPaceSecPerKm: { value: secs, source: 'manual' } })
      }, 200)
    },
    [state, onChange],
  )

  const paceDisplay = state.thresholdPaceSecPerKm.value
    ? `${Math.floor(state.thresholdPaceSecPerKm.value / 60)}:${(state.thresholdPaceSecPerKm.value % 60).toString().padStart(2, '0')}`
    : ''

  const [open, setOpen] = useState(false)

  return (
    <div className={cn('mb-2', BORDER.default, RADIUS.lg, 'bg-[var(--n50)]', className)}>
      <button
        onClick={() => setOpen(p => !p)}
        className={cn(
          'flex w-full items-center gap-1.5 px-4 py-2',
          LABEL_STYLE, TRANSITION.colors, 'hover:text-[var(--n800)]',
        )}
      >
        <span className={cn('text-[9px] transition-transform duration-150', open && 'rotate-90')}>▶</span>
        Athlete parameters
      </button>
      {open && (
        <div className="flex flex-wrap items-start gap-5 px-4 pb-3">
          {!isRunning && (
            <>
              <ParamField
                label="FTP"
                unit="W"
                source={state.ftp.source}
                value={state.ftp.value}
                onChange={(v) => handleEdit('ftp', v)}
              />
              <ParamField
                label="CP"
                unit="W"
                source={state.cp.source}
                value={state.cp.value}
                onChange={(v) => handleEdit('cp', v)}
              />
            </>
          )}
          {isRunning && (
            <PaceField
              label="Threshold pace"
              unit="/km"
              source={state.thresholdPaceSecPerKm.source}
              value={paceDisplay}
              onChange={handlePaceEdit}
            />
          )}
          <ParamField
            label="Weight"
            unit="kg"
            source={state.weightKg.source}
            value={state.weightKg.value}
            onChange={(v) => handleEdit('weightKg', v)}
          />
        </div>
      )}
    </div>
  )
}

function PaceField({
  label, unit, value, source, onChange,
}: {
  label: string
  unit: string
  value: string
  source: ParamSource
  onChange: (raw: string) => void
}) {
  return (
    <div className="flex w-[140px] flex-col gap-1">
      <Input
        label={label}
        unit={unit}
        type="text"
        inputMode="numeric"
        defaultValue={value}
        placeholder="—:——"
        onChange={(e) => onChange(e.target.value)}
      />
      <span
        className={cn('text-[11px]', WEIGHT.book)}
        style={{ color: sourceColor(source) }}
      >
        {source === 'missing' && (
          <span
            className="mr-1 inline-block size-1.5 rounded-full align-middle"
            style={{ backgroundColor: 'var(--warning)' }}
          />
        )}
        {sourceLabel(source)}
      </span>
    </div>
  )
}

function ParamField({
  label, unit, value, source, onChange,
}: {
  label: string
  unit: string
  value: number | undefined
  source: ParamSource
  onChange: (raw: string) => void
}) {
  return (
    <div className="flex w-[120px] flex-col gap-1">
      <Input
        label={label}
        unit={unit}
        type="number"
        inputMode="numeric"
        min={1}
        defaultValue={value ?? ''}
        placeholder="—"
        onChange={(e) => onChange(e.target.value)}
      />
      <span
        className={cn('text-[11px]', WEIGHT.book)}
        style={{ color: sourceColor(source) }}
      >
        {source === 'missing' && (
          <span
            className="mr-1 inline-block size-1.5 rounded-full align-middle"
            style={{ backgroundColor: 'var(--warning)' }}
          />
        )}
        {sourceLabel(source)}
      </span>
    </div>
  )
}

// ─── State helpers ───

export function makeAthleteParamsState(initial: {
  ftp?: number
  cp?: number
  weightKg?: number
  thresholdPaceSecPerKm?: number
}): AthleteParamsState {
  const field = (v: number | undefined): AthleteParamsState['ftp'] =>
    v != null && v > 0 ? { value: v, source: 'file' } : { value: undefined, source: 'missing' }
  return {
    ftp: field(initial.ftp),
    cp: field(initial.cp),
    weightKg: field(initial.weightKg),
    thresholdPaceSecPerKm: field(initial.thresholdPaceSecPerKm),
  }
}

