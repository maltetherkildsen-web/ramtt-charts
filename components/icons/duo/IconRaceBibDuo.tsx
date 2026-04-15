// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRaceBibDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="5" y="4" width="14" height="16" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="5" y="4" width="14" height="16" rx="1"/>
    <path d="M9 10h6M9 13h6"/>
    <circle cx="7" cy="6" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="17" cy="6" r=".75" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconRaceBibDuo.displayName = 'IconRaceBibDuo'
