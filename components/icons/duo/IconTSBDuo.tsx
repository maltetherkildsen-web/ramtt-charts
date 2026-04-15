// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTSBDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="6" width="22" height="12" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M2 12h20"/><path d="M3 12c2-3 4-5 6-5s4 2 5 3 3 2 5 0 3-3 3-4"/><path d="M2 8h2"/><path d="M2 16h2"/><path d="M20 6l2 2"/><path d="M20 8l2-2"/>
  </IconBaseDuo>
))
IconTSBDuo.displayName = 'IconTSBDuo'
