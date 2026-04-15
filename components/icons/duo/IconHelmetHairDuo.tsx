// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconHelmetHairDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="13" r="7"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="13" r="7"/><path d="M7 10c1-3 3-5 5-5s4 2 5 5"/><path d="M8 7l1.5 3"/><path d="M11 5.5V9"/><path d="M14 6l-1 3"/><path d="M16 7.5l-1.5 2.5"/><path d="M9 11c0 1 1.5 1 1.5 0"/><path d="M13 11c0 1 1.5 1 1.5 0"/>
  </IconBaseDuo>
))
IconHelmetHairDuo.displayName = 'IconHelmetHairDuo'
