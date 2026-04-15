// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRedBloodCellDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <ellipse cx="12" cy="12" rx="9" ry="5" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <ellipse cx="12" cy="12" rx="9" ry="5"/>
    <ellipse cx="12" cy="12" rx="4" ry="2"/>
  </IconBaseDuo>
))
IconRedBloodCellDuo.displayName = 'IconRedBloodCellDuo'
