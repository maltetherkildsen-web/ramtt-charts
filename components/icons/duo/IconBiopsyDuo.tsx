// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBiopsyDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <rect x="10" y="2" width="4" height="6" rx="1" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <rect x="10" y="2" width="4" height="6" rx="1"/>
    <path d="M11 8h2v10h-2z"/>
    <path d="M11 18l1 4 1-4"/>
    <path d="M10.5 4h3M10.5 6h3"/>
  </IconBaseDuo>
))
IconBiopsyDuo.displayName = 'IconBiopsyDuo'
