// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconFuelingWindowDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="12" r="9"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="12" r="9"/><path d="M12 12V7"/><path d="M12 12l4 4"/><path d="M12 3a9 9 0 014.24 1.08" strokeWidth="2.5" opacity="0.3"/>
  </IconBaseDuo>
))
IconFuelingWindowDuo.displayName = 'IconFuelingWindowDuo'
