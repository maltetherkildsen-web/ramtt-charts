// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDecouplingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="5" width="22" height="14" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M3 16c3-1 6-2 9-3s6-2 9-3"/><path d="M3 16c3 0 6-1 9-3s6-4 9-6" strokeDasharray="3 2"/><circle cx="3" cy="16" r="1.5" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconDecouplingDuo.displayName = 'IconDecouplingDuo'
