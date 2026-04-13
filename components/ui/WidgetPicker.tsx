// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useMemo } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION } from '@/lib/ui'
import { Modal } from './Modal'
import { Input } from './Input'
import { ToggleGroup } from './ToggleGroup'
import { Button } from './Button'

// ─── Types ───

export type WidgetCategory = 'training' | 'fuel' | 'body' | 'cross-domain' | 'performance'

export interface WidgetDefinition {
  id: string
  title: string
  description: string
  category: WidgetCategory
  preview?: React.ReactNode
  defaultSize: { w: number; h: number }
}

export interface WidgetPickerProps {
  open: boolean
  onClose: () => void
  onAdd: (widgetId: string) => void
  widgets?: WidgetDefinition[]
  installedWidgets?: string[]
  className?: string
}

// ─── Default widget definitions ───

const DEFAULT_WIDGETS: WidgetDefinition[] = [
  { id: 'capacity-chart', title: 'Capacity chart', description: 'CP/W\' progression over time with confidence bands', category: 'performance', defaultSize: { w: 12, h: 4 } },
  { id: 'peak-curves', title: 'Peak curves', description: 'Mean maximal power curves across selected periods', category: 'performance', defaultSize: { w: 6, h: 3 } },
  { id: 'zone-distribution', title: 'Zone distribution', description: 'Time in each training zone as segmented bar', category: 'training', defaultSize: { w: 6, h: 3 } },
  { id: 'durability-index', title: 'Durability index', description: 'CP decay per hour of riding', category: 'performance', defaultSize: { w: 6, h: 3 } },
  { id: 'acwr-trend', title: 'ACWR trend', description: 'Acute:chronic workload ratio over 28 days', category: 'training', defaultSize: { w: 6, h: 3 } },
  { id: 'cho-compliance', title: 'CHO compliance', description: 'Weekly carbohydrate target adherence', category: 'fuel', defaultSize: { w: 6, h: 3 } },
  { id: 'hydration-tracker', title: 'Hydration tracker', description: 'Daily fluid intake vs. target', category: 'fuel', defaultSize: { w: 6, h: 3 } },
  { id: 'macro-breakdown', title: 'Macro breakdown', description: 'CHO / protein / fat proportions', category: 'fuel', defaultSize: { w: 6, h: 2 } },
  { id: 'sleep-quality', title: 'Sleep quality', description: 'Sleep duration and quality ratings over time', category: 'body', defaultSize: { w: 6, h: 3 } },
  { id: 'body-composition', title: 'Body composition', description: 'Weight, body fat, and lean mass trends', category: 'body', defaultSize: { w: 6, h: 3 } },
  { id: 'fatigue-freshness', title: 'Fatigue & freshness', description: 'ATL / CTL / TSB fitness model', category: 'training', defaultSize: { w: 12, h: 4 } },
  { id: 'race-readiness', title: 'Race readiness', description: 'Multi-dimensional readiness assessment', category: 'cross-domain', defaultSize: { w: 6, h: 3 } },
  { id: 'daily-state', title: 'Daily state', description: 'Mood, stress, soreness, fatigue composite', category: 'cross-domain', defaultSize: { w: 6, h: 3 } },
  { id: 'gi-tracker', title: 'GI tracker', description: 'Gastrointestinal comfort during sessions', category: 'body', defaultSize: { w: 6, h: 2 } },
  { id: 'training-load', title: 'Training load', description: 'Weekly TSS and hours with rolling average', category: 'training', defaultSize: { w: 12, h: 3 } },
  { id: 'power-profile', title: 'Power profile', description: 'Radar chart of athlete strengths', category: 'performance', defaultSize: { w: 6, h: 4 } },
  { id: 'caffeine-timing', title: 'Caffeine timing', description: 'Pre-session caffeine doses and timing', category: 'fuel', defaultSize: { w: 6, h: 2 } },
  { id: 'session-compliance', title: 'Session compliance', description: 'Planned vs. executed workouts', category: 'training', defaultSize: { w: 6, h: 3 } },
  { id: 'recovery-score', title: 'Recovery score', description: 'Composite recovery metric from sleep + HRV + subjective', category: 'cross-domain', defaultSize: { w: 6, h: 3 } },
  { id: 'supplement-log', title: 'Supplement log', description: 'Daily supplement intake tracking', category: 'fuel', defaultSize: { w: 6, h: 2 } },
]

const CATEGORIES: { value: string; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'training', label: 'Training' },
  { value: 'fuel', label: 'Fuel' },
  { value: 'body', label: 'Body' },
  { value: 'cross-domain', label: 'Cross-domain' },
  { value: 'performance', label: 'Performance' },
]

// ─── Component ───

const WidgetPicker = forwardRef<HTMLDialogElement, WidgetPickerProps>(
  ({ open, onClose, onAdd, widgets, installedWidgets = [], className }, ref) => {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')

    const allWidgets = widgets ?? DEFAULT_WIDGETS
    const installed = new Set(installedWidgets)

    const filtered = useMemo(() => {
      let result = allWidgets
      if (category !== 'all') {
        result = result.filter((w) => w.category === category)
      }
      if (search.trim()) {
        const q = search.toLowerCase()
        result = result.filter(
          (w) => w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q),
        )
      }
      return result
    }, [allWidgets, category, search])

    return (
      <Modal ref={ref} open={open} onClose={onClose} size="lg" className={className}>
        <Modal.Header>
          <Modal.Title>Add widget</Modal.Title>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={cn('text-[var(--n600)] hover:text-[var(--n1150)]', TRANSITION.colors)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </Modal.Header>

        <Modal.Body>
          {/* Search */}
          <Input
            placeholder="Search widgets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category tabs */}
          <div className="mt-3 mb-4">
            <ToggleGroup
              options={CATEGORIES}
              value={category}
              onChange={(v) => setCategory(v as string)}
              variant="pill"
              size="sm"
            />
          </div>

          {/* Widget grid */}
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((widget) => {
              const isInstalled = installed.has(widget.id)
              return (
                <div
                  key={widget.id}
                  className={cn(
                    BORDER.default,
                    'rounded-[8px]',
                    'p-3',
                    'hover:bg-[var(--n200)]',
                    TRANSITION.background,
                  )}
                >
                  {/* Preview area */}
                  {widget.preview ? (
                    <div className="h-12 mb-2 flex items-center justify-center bg-[var(--n200)] rounded-[4px] overflow-hidden">
                      {widget.preview}
                    </div>
                  ) : (
                    <div className="h-12 mb-2 bg-[var(--n200)] rounded-[4px]" />
                  )}

                  <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] truncate')}>
                    {widget.title}
                  </div>
                  <div
                    className={cn(
                      FONT.body,
                      'text-[11px]',
                      WEIGHT.normal,
                      'text-[var(--n600)] mt-0.5 line-clamp-2',
                    )}
                  >
                    {widget.description}
                  </div>

                  <div className="mt-2">
                    {isInstalled ? (
                      <Button size="sm" variant="outline" disabled>
                        Added
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => onAdd(widget.id)}>
                        Add
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filtered.length === 0 && (
            <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)] text-center py-8')}>
              No widgets match your search.
            </div>
          )}
        </Modal.Body>
      </Modal>
    )
  },
)

WidgetPicker.displayName = 'WidgetPicker'
export { WidgetPicker }
