// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRunningDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="15" cy="4" r="2"/>
    </g>
    {/* Foreground */}
    <circle cx="15" cy="4" r="2"/><path d="M7 22l4-7"/><path d="M11 15l4-2 2 5"/><path d="M11 15l-3-4 4-3"/><path d="M4 17l4.5-2"/><path d="M16 9l-4 4"/>
  </IconBaseDuo>
))
IconRunningDuo.displayName = 'IconRunningDuo'
