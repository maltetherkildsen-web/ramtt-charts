// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCompassDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="12" r="9"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="12" r="9"/><path d="M16 8l-5.5 2.5L8 16l5.5-2.5L16 8z"/>
  </IconBaseDuo>
))
IconCompassDuo.displayName = 'IconCompassDuo'
