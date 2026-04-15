// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPulseDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="8" width="22" height="8" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M2 12h4l2-6 3 12 2-8 2 4h2l1.5-3 1.5 3H22"/>
  </IconBaseDuo>
))
IconPulseDuo.displayName = 'IconPulseDuo'
