// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconEarlyBedtimeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="12" r="9"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/><path d="M19 3a3 3 0 01-2.5 4.5A4 4 0 0119 3z"/><path d="M3 3l1.5 1.5"/><path d="M4 7H2.5"/>
  </IconBaseDuo>
))
IconEarlyBedtimeDuo.displayName = 'IconEarlyBedtimeDuo'
