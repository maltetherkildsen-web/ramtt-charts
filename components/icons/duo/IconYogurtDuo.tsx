// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconYogurtDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M6 6h12l-1.5 14H7.5L6 6z"/>
    </g>
    {/* Foreground */}
    <path d="M6 6h12l-1.5 14H7.5L6 6z"/><path d="M4 6h16"/><path d="M18 4c1 0 2 .5 2 1.5S19 7 18 7"/><path d="M9 10h6" opacity="0.3"/>
  </IconBaseDuo>
))
IconYogurtDuo.displayName = 'IconYogurtDuo'
