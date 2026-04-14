// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'
import { Switch } from './Switch'

// ─── Types ───

export interface NotificationItem {
  id: string
  label: string
  description?: string
  enabled: boolean
  /** Disable the toggle (greyed out) */
  disabled?: boolean
  disabledReason?: string
}

export interface NotificationGroup {
  title: string
  items: NotificationItem[]
}

export interface NotificationPreferencesProps {
  groups: NotificationGroup[]
  onChange: (id: string, enabled: boolean) => void
  className?: string
}

// ─── Component ───

const NotificationPreferences = forwardRef<HTMLDivElement, NotificationPreferencesProps>(
  function NotificationPreferences({ groups, onChange, className }, ref) {
    return (
      <div ref={ref} className={cn(className)}>
        {groups.map((group, gi) => (
          <div key={group.title} className={cn(gi > 0 && 'mt-6')}>
            {/* Group title */}
            <h4 className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-2')}>
              {group.title}
            </h4>

            {/* Items */}
            {group.items.map((item, ii) => {
              const isLast = ii === group.items.length - 1

              return (
                <div
                  key={item.id}
                  className={cn(
                    'flex items-start justify-between gap-4',
                    !isLast && 'border-b-[0.5px] border-b-[var(--n200)]',
                    item.disabled && 'opacity-50',
                  )}
                  style={{ padding: '12px 0' }}
                >
                  {/* Label + description */}
                  <div className="min-w-0" style={{ maxWidth: 400 }}>
                    <span className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n1150)] block')}>
                      {item.label}
                    </span>
                    {item.description && (
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-0.5 block')}>
                        {item.description}
                      </span>
                    )}
                    {item.disabled && item.disabledReason && (
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] italic mt-0.5 block')}>
                        {item.disabledReason}
                      </span>
                    )}
                  </div>

                  {/* Switch — right-aligned, vertically centered with label */}
                  <div className="shrink-0 pt-0.5">
                    <Switch
                      checked={item.enabled}
                      onChange={(checked) => onChange(item.id, checked)}
                      disabled={item.disabled}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    )
  },
)

NotificationPreferences.displayName = 'NotificationPreferences'
export { NotificationPreferences }
