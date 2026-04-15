// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLactateThresholdDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 20C6 18 9 12 12 8c2-3 4-3 6-2V20Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M3 20C6 18 9 12 12 8c2-3 4-3 6-2"/>
    <path d="M3 6h18"/>
    <circle cx="12" cy="8" r="1.5"/>
  </IconBaseDuo>
))
IconLactateThresholdDuo.displayName = 'IconLactateThresholdDuo'
