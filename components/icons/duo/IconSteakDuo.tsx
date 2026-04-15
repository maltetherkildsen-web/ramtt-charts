// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSteakDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <ellipse cx="12" cy="12" rx="9" ry="7"/>
    </g>
    {/* Foreground */}
    <ellipse cx="12" cy="12" rx="9" ry="7"/><path d="M7 10c2-1 4 0 5 1s3 2 5 1" opacity="0.4"/><path d="M8 14c1.5-.5 3 0 4 .5s3 1 4 0" opacity="0.4"/><ellipse cx="15" cy="11" rx="2" ry="1.5" opacity="0.3"/>
  </IconBaseDuo>
))
IconSteakDuo.displayName = 'IconSteakDuo'
