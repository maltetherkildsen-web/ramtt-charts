// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconAnatomicalHeartDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M12 20c-4-4-8-7-8-11 0-3 2-5 4.5-5S12 6 12 6s1.5-2 3.5-2S20 6 20 9c0 4-4 7-8 11Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M12 20c-4-4-8-7-8-11 0-3 2-5 4.5-5S12 6 12 6s1.5-2 3.5-2S20 6 20 9c0 4-4 7-8 11Z"/>
    <path d="M15 4c1-1.5 2.5-2.5 4.5-2"/>
    <path d="M9 4C8 2.5 6.5 1.5 4.5 2"/>
    <path d="M12 6v8"/>
  </IconBaseDuo>
))
IconAnatomicalHeartDuo.displayName = 'IconAnatomicalHeartDuo'
