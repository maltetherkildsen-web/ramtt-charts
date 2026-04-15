// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSweatAngelDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <ellipse cx="12" cy="16" rx="9" ry="4"/>
    </g>
    {/* Foreground */}
    <ellipse cx="12" cy="16" rx="9" ry="4"/><path d="M12 12v-2"/><circle cx="12" cy="8" r="2"/><path d="M8 14c-2-1-3-3-2-5"/><path d="M16 14c2-1 3-3 2-5"/><path d="M10 18c0 .5.5 1 2 1s2-.5 2-1"/>
  </IconBaseDuo>
))
IconSweatAngelDuo.displayName = 'IconSweatAngelDuo'
