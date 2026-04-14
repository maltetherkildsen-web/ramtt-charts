// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTrainingLoadDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <ellipse cx="12" cy="12" rx="8" ry="10" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 4v16"/>
    <ellipse cx="12" cy="8" rx="5" ry="1.5"/>
    <ellipse cx="12" cy="13" rx="6" ry="2"/>
    <ellipse cx="12" cy="18" rx="7" ry="2"/>
  </IconBaseDuo>
))
IconTrainingLoadDuo.displayName = 'IconTrainingLoadDuo'
