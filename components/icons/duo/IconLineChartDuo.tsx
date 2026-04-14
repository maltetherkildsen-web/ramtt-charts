// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLineChartDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <path d="M3 20h18V4l-6 8-4-4-4 6-4 6Z" fill={props.accent || 'currentColor'} stroke="none" opacity={0.15}/>
    {/* Foreground */}
    <path d="M3 20H21" />
    <path d="M3 20V4" />
    <path d="M6 16L10 10L14 14L20 6" />
  </IconBaseDuo>
))
IconLineChartDuo.displayName = 'IconLineChartDuo'
