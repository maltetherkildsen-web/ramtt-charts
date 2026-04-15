// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWheyProteinDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="5" y="9" width="14" height="12" rx="2" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="5" y="9" width="14" height="12" rx="2"/>
    <path d="M6 5h12v4H6V5Z"/>
    <path d="M10 2.5a2 2 0 0 1 4 0"/>
  </IconBaseDuo>
))
IconWheyProteinDuo.displayName = 'IconWheyProteinDuo'
