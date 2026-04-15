// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconKettlebellDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M9 11c0-4 6-4 6 0a5 5 0 1 1-6 0Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <circle cx="12" cy="15" r="5"/>
    <path d="M9 11c0-4 6-4 6 0"/>
  </IconBaseDuo>
))
IconKettlebellDuo.displayName = 'IconKettlebellDuo'
