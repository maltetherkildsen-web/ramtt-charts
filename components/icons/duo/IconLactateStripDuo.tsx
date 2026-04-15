// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLactateStripDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="9" y="2" width="6" height="20" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="9" y="2" width="6" height="20" rx="1"/>
    <rect x="10" y="14" width="4" height="5" rx=".5"/>
    <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconLactateStripDuo.displayName = 'IconLactateStripDuo'
