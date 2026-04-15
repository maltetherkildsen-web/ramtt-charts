// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconAbsorptionRateDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M6 4l3 8v8a2 2 0 004 0v-8l3-8H6z"/>
    </g>
    {/* Foreground */}
    <path d="M4 4h16"/><path d="M6 4l3 8v8a2 2 0 004 0v-8l3-8"/><path d="M9 12h6"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconAbsorptionRateDuo.displayName = 'IconAbsorptionRateDuo'
