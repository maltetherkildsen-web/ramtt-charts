// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCalendarDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="3" width="18" height="18" rx="3" fill={props.accent || 'currentColor'} opacity={0.15} stroke="none" />
    {/* Foreground */}

    <rect x="4" y="5" width="16" height="16" rx="2" />
    <path d="M8 2V5" />
    <path d="M16 2V5" />
    <path d="M4 10H20" />
    {/* Day dots */}
    <circle cx="8.5" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="14" r="1" fill="currentColor" stroke="none" />
    <circle cx="8.5" cy="17.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
    </IconBaseDuo>
))
IconCalendarDuo.displayName = 'IconCalendarDuo'
