// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGlycogenDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="3" y="8" width="16" height="8" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="3" y="8" width="16" height="8" rx="2"/>
    <path d="M19 11h2v2h-2"/>
    <rect x="5.5" y="10.5" width="7" height="3" rx=".5" fill="currentColor" fillOpacity={0.15} stroke="none"/>
  </IconBaseDuo>
))
IconGlycogenDuo.displayName = 'IconGlycogenDuo'
