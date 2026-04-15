// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSkiingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M3 20l18-8v1.5L3 21.5V20z"/>
    </g>
    {/* Foreground */}
    <circle cx="14" cy="4" r="2"/><path d="M8 22L18 6"/><path d="M6 16l5-3 3 4"/><path d="M3 20l18-8"/><path d="M16 10l2-1"/>
  </IconBaseDuo>
))
IconSkiingDuo.displayName = 'IconSkiingDuo'
