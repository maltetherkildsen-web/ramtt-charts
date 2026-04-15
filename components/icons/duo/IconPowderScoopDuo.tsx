// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPowderScoopDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 14h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z"/>
    </g>
    {/* Foreground */}
    <path d="M6 14c0-3 2.5-5 6-5s6 2 6 5"/><path d="M4 14h16v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2z"/><path d="M6 14c1-5 3-8 6-8s5 3 6 8" strokeDasharray="2 2" opacity="0.4"/>
  </IconBaseDuo>
))
IconPowderScoopDuo.displayName = 'IconPowderScoopDuo'
