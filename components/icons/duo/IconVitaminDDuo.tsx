// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconVitaminDDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="7" y="8" width="10" height="14" rx="5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="7" y="8" width="10" height="14" rx="5"/>
    <path d="M7 15h10"/>
    <circle cx="12" cy="4" r="2"/>
  </IconBaseDuo>
))
IconVitaminDDuo.displayName = 'IconVitaminDDuo'
