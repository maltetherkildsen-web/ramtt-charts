// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSpeedDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M4 18A9 9 0 0 1 20 18H4Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    {/* Speedometer arc */}
    <path d="M4 18A9 9 0 0 1 20 18" />
    {/* Needle pointing upper-right */}
    <path d="M12 18L16 8" />
    {/* Center pivot dot */}
    <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </IconBaseDuo>
))
IconSpeedDuo.displayName = 'IconSpeedDuo'
