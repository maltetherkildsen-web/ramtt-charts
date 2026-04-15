// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGaugeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="12" r="9"/>
    </g>
    {/* Foreground */}
    <path d="M12 21a9 9 0 110-18 9 9 0 010 18z"/><path d="M12 7v5l3 3"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M5.63 7.5L4 6"/><path d="M18.37 7.5L20 6"/>
  </IconBaseDuo>
))
IconGaugeDuo.displayName = 'IconGaugeDuo'
