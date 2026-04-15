// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDonutDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="12" r="8"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M4.5 10c1-3 4-5 7.5-5s6.5 2 7.5 5" strokeWidth="2" opacity="0.3"/><path d="M8 8l.5 1" opacity="0.5"/><path d="M14 7l.5 1.5" opacity="0.5"/><path d="M17 9l-.5 1" opacity="0.5"/>
  </IconBaseDuo>
))
IconDonutDuo.displayName = 'IconDonutDuo'
