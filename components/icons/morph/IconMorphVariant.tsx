// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, type ReactNode } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

// Line icon content (stroke-based, no fill)
import { IconToday } from '../line/IconToday'
import { IconCalendar } from '../line/IconCalendar'
import { IconAnalytics } from '../line/IconAnalytics'
import { IconFuel } from '../line/IconFuel'
import { IconSettings } from '../line/IconSettings'

// Solid icon content (fill-based, no stroke)
import { IconTodaySolid } from '../solid/IconTodaySolid'
import { IconCalendarSolid } from '../solid/IconCalendarSolid'
import { IconAnalyticsSolid } from '../solid/IconAnalyticsSolid'
import { IconFuelSolid } from '../solid/IconFuelSolid'
import { IconSettingsSolid } from '../solid/IconSettingsSolid'

type NavIcon = 'today' | 'calendar' | 'analytics' | 'fuel' | 'settings'

interface IconMorphVariantProps extends MorphIconProps {
  icon: NavIcon
  variant: 'line' | 'solid'
}

// Render just the SVG children (paths/circles) without wrapping in another SVG
const LINE_CHILDREN: Record<NavIcon, (color: string) => ReactNode> = {
  today: () => (
    <>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M4 17H20" />
      <path d="M12 3V4" />
      <path d="M17.5 9H18.5" />
      <path d="M5.5 9H6.5" />
      <path d="M15.5 5.5L16.2 4.8" />
      <path d="M7.8 4.8L8.5 5.5" />
    </>
  ),
  calendar: () => (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M8 2V5" />
      <path d="M16 2V5" />
      <path d="M4 10H20" />
      <circle cx="8.5" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="17.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  analytics: () => (
    <>
      <path d="M4 18L8 14L11 17L15 10L20 6" />
      <circle cx="20" cy="6" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  fuel: () => (
    <>
      <path d="M12 2C12 2 6 9 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 9 12 2 12 2Z" />
      <path d="M12 11C12 11 9.5 14 9.5 16C9.5 17.4 10.6 18.5 12 18.5C13.4 18.5 14.5 17.4 14.5 16C14.5 14 12 11 12 11Z" />
    </>
  ),
  settings: () => (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2V5" />
      <path d="M12 19V22" />
      <path d="M4.93 4.93L7.05 7.05" />
      <path d="M16.95 16.95L19.07 19.07" />
      <path d="M2 12H5" />
      <path d="M19 12H22" />
      <path d="M4.93 19.07L7.05 16.95" />
      <path d="M16.95 7.05L19.07 4.93" />
    </>
  ),
}

const SOLID_CHILDREN: Record<NavIcon, (color: string) => ReactNode> = {
  today: (c) => (
    <>
      <circle fill={c} cx="12" cy="9" r="3.5" stroke="none" />
      <path fill={c} d="M4 17H20" stroke="none" />
      <path fill={c} d="M12 3V4" stroke="none" />
      <path fill={c} d="M17.5 9H18.5" stroke="none" />
      <path fill={c} d="M5.5 9H6.5" stroke="none" />
      <path fill={c} d="M15.5 5.5L16.2 4.8" stroke="none" />
      <path fill={c} d="M7.8 4.8L8.5 5.5" stroke="none" />
    </>
  ),
  calendar: (c) => (
    <>
      <rect fill={c} x="4" y="5" width="16" height="16" rx="2" stroke="none" />
      <path fill={c} d="M8 2V5" stroke="none" />
      <path fill={c} d="M16 2V5" stroke="none" />
      <path fill={c} d="M4 10H20" stroke="none" />
      <circle fill={c} cx="8.5" cy="14" r="1" stroke="none" />
      <circle fill={c} cx="12" cy="14" r="1" stroke="none" />
      <circle fill={c} cx="15.5" cy="14" r="1" stroke="none" />
      <circle fill={c} cx="8.5" cy="17.5" r="1" stroke="none" />
      <circle fill={c} cx="12" cy="17.5" r="1" stroke="none" />
    </>
  ),
  analytics: (c) => (
    <>
      <path fill={c} d="M4 18L8 14L11 17L15 10L20 6" stroke="none" />
      <circle fill={c} cx="20" cy="6" r="1.5" stroke="none" />
    </>
  ),
  fuel: (c) => (
    <>
      <path fill={c} d="M12 2C12 2 6 9 6 14C6 17.3 8.7 20 12 20C15.3 20 18 17.3 18 14C18 9 12 2 12 2Z" stroke="none" />
      <path fill={c} d="M12 11C12 11 9.5 14 9.5 16C9.5 17.4 10.6 18.5 12 18.5C13.4 18.5 14.5 17.4 14.5 16C14.5 14 12 11 12 11Z" stroke="none" />
    </>
  ),
  settings: (c) => (
    <>
      <circle fill={c} cx="12" cy="12" r="3" stroke="none" />
      <path fill={c} d="M12 2V5" stroke="none" />
      <path fill={c} d="M12 19V22" stroke="none" />
      <path fill={c} d="M4.93 4.93L7.05 7.05" stroke="none" />
      <path fill={c} d="M16.95 16.95L19.07 19.07" stroke="none" />
      <path fill={c} d="M2 12H5" stroke="none" />
      <path fill={c} d="M19 12H22" stroke="none" />
      <path fill={c} d="M4.93 19.07L7.05 16.95" stroke="none" />
      <path fill={c} d="M16.95 7.05L19.07 4.93" stroke="none" />
    </>
  ),
}

export const IconMorphVariant = forwardRef<SVGSVGElement, IconMorphVariantProps>(
  ({ icon, variant, ...props }, ref) => {
    const isLine = variant === 'line'
    const color = props.color ?? 'currentColor'
    const transition = 'opacity var(--morph-duration) ease, transform var(--morph-duration) ease'

    return (
      <MorphBase ref={ref} {...props}>
        {/* Line variant */}
        <g
          style={{
            opacity: isLine ? 1 : 0,
            transform: isLine ? 'scale(1)' : 'scale(0.9)',
            transformOrigin: 'center',
            transition,
          }}
        >
          {LINE_CHILDREN[icon](color)}
        </g>
        {/* Solid variant */}
        <g
          style={{
            opacity: isLine ? 0 : 1,
            transform: isLine ? 'scale(0.9)' : 'scale(1)',
            transformOrigin: 'center',
            transition,
          }}
        >
          {SOLID_CHILDREN[icon](color)}
        </g>
      </MorphBase>
    )
  },
)
IconMorphVariant.displayName = 'IconMorphVariant'
