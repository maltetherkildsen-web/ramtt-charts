// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconStormDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25 8 8 0 0020 16.58z"/>
    </g>
    {/* Foreground */}
    <path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/><path d="M13 12l-2 4h4l-2 5"/>
  </IconBaseDuo>
))
IconStormDuo.displayName = 'IconStormDuo'
