// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconNerveDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm6-1h8v2h-8Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="7" cy="12" r="3"/>
    <path d="M10 12h8"/>
    <path d="M5 9L3 6M5 15l-2 3"/>
    <path d="M18 12l3-2.5M18 12h3M18 12l3 2.5"/>
  </IconBaseDuo>
))
IconNerveDuo.displayName = 'IconNerveDuo'
