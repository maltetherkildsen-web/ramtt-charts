// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDateFruitDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <ellipse cx="12" cy="12" rx="5" ry="8"/>
    </g>
    {/* Foreground */}
    <ellipse cx="12" cy="12" rx="5" ry="8"/><path d="M9 8c2 3 2 5 0 8" opacity="0.4"/><path d="M12 4v-2"/>
  </IconBaseDuo>
))
IconDateFruitDuo.displayName = 'IconDateFruitDuo'
