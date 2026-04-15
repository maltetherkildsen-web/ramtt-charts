// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconElectrolyteMixDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M7 4h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}

    <path d="M7 4h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4Z"/>
    <path d="M5 4h14"/>
    <circle cx="10" cy="13" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="14" cy="11" r=".75" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconElectrolyteMixDuo.displayName = 'IconElectrolyteMixDuo'
