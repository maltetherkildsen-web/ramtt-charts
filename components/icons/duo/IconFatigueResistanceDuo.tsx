// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconFatigueResistanceDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="7" width="22" height="12" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M2 10h20"/><path d="M2 10c4 0 8 2 12 5s6 4 8 5" strokeDasharray="3 2" opacity="0.5"/><path d="M2 6l2 2-2 2"/>
  </IconBaseDuo>
))
IconFatigueResistanceDuo.displayName = 'IconFatigueResistanceDuo'
