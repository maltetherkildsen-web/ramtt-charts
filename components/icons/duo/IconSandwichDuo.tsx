// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSandwichDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M3 14l9-10 9 10H3z"/>
    </g>
    {/* Foreground */}
    <path d="M3 14l9-10 9 10"/><path d="M3 14h18"/><rect x="3" y="14" width="18" height="3" rx="0.5"/><path d="M3 17h18v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z"/>
  </IconBaseDuo>
))
IconSandwichDuo.displayName = 'IconSandwichDuo'
