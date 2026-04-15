// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDiamondDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M5 8l7-6 7 6-7 14L5 8z"/>
    </g>
    {/* Foreground */}
    <path d="M5 8l7-6 7 6-7 14L5 8z"/><path d="M5 8h14"/><path d="M8.5 2L5 8l7 14"/><path d="M15.5 2L19 8l-7 14"/>
  </IconBaseDuo>
))
IconDiamondDuo.displayName = 'IconDiamondDuo'
