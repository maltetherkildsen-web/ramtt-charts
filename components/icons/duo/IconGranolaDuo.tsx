// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGranolaDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="2" y="4" width="20" height="18" rx="3"/>
    </g>
    {/* Foreground */}
    <circle cx="6" cy="10" r="2.5"/><circle cx="13" cy="8" r="3"/><circle cx="18" cy="12" r="2"/><circle cx="8" cy="16" r="2.5"/><circle cx="15" cy="15" r="2"/><circle cx="11" cy="19" r="1.5"/>
  </IconBaseDuo>
))
IconGranolaDuo.displayName = 'IconGranolaDuo'
