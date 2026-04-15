// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCarboLoadingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="5" y="4" width="14" height="16" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="5" y="4" width="14" height="16" rx="2"/><rect x="7.5" y="14" width="2.5" height="4" rx="0.5"/><rect x="11" y="11" width="2.5" height="7" rx="0.5"/><rect x="14.5" y="8" width="2.5" height="10" rx="0.5"/><path d="M4 8l-2-1.5L4 5"/>
  </IconBaseDuo>
))
IconCarboLoadingDuo.displayName = 'IconCarboLoadingDuo'
