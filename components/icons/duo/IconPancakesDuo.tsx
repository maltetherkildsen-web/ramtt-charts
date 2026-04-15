// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPancakesDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <ellipse cx="12" cy="12" rx="8" ry="8"/>
    </g>
    {/* Foreground */}
    <ellipse cx="12" cy="18" rx="8" ry="2.5"/><ellipse cx="12" cy="14" rx="7" ry="2"/><ellipse cx="12" cy="10" rx="6" ry="2"/><ellipse cx="12" cy="6" rx="5" ry="2"/><path d="M17 6c1 1 1.5 2 .5 3" opacity="0.4"/><path d="M16 10c1.5.5 2 1.5 1 2.5" opacity="0.4"/>
  </IconBaseDuo>
))
IconPancakesDuo.displayName = 'IconPancakesDuo'
