// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconIceBathDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="4" y="10" width="16" height="10" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="4" y="10" width="16" height="10" rx="2"/><path d="M12 6v3"/><path d="M10 7.5h4"/><path d="M7 14h2"/><path d="M11 14h2"/><path d="M15 14h2"/><path d="M8 17h8"/>
  </IconBaseDuo>
))
IconIceBathDuo.displayName = 'IconIceBathDuo'
