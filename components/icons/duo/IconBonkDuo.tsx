// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBonkDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="4" y="7" width="14" height="10" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="4" y="7" width="14" height="10" rx="2"/><path d="M20 11v2"/><path d="M11 7l-1.5 5h3L11 17"/><path d="M8 10v4" strokeDasharray="1 1.5" opacity="0.4"/>
  </IconBaseDuo>
))
IconBonkDuo.displayName = 'IconBonkDuo'
