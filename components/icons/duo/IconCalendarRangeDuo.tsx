// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCalendarRangeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 10h16v11H4V10Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="4" y="5" width="16" height="16" rx="2"/>
    <path d="M8 2v3"/>
    <path d="M16 2v3"/>
    <path d="M4 10h16"/>
    <rect x="7" y="13" width="4" height="3" rx=".5" fill="currentColor" fillOpacity={0.15} stroke="none"/>
    <rect x="13" y="13" width="4" height="3" rx=".5" fill="currentColor" fillOpacity={0.15} stroke="none"/>
  </IconBaseDuo>
))
IconCalendarRangeDuo.displayName = 'IconCalendarRangeDuo'
