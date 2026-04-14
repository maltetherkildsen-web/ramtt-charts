// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPowerDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 16l3-2 2.5 2L11 7l3 7 2.5-4 2 2.5L21 8v10H3Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M3 16L6 14L8.5 16L11 7L14 14L16.5 10L18.5 12.5L21 8" />
  </IconBaseDuo>
))
IconPowerDuo.displayName = 'IconPowerDuo'
