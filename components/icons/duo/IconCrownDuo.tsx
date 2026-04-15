// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCrownDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M2 17l3-10 4.5 5L12 4l2.5 8 4.5-5 3 10H2z"/>
    </g>
    {/* Foreground */}
    <path d="M2 17l3-10 4.5 5L12 4l2.5 8 4.5-5 3 10H2z"/><path d="M4 20h16"/>
  </IconBaseDuo>
))
IconCrownDuo.displayName = 'IconCrownDuo'
