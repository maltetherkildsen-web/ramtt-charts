// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSunriseDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M5 20a7 7 0 0114 0H5z"/>
    </g>
    {/* Foreground */}
    <path d="M12 2v4"/><path d="M4.93 5.93l2.83 2.83"/><path d="M19.07 5.93l-2.83 2.83"/><path d="M2 16h20"/><path d="M5 20a7 7 0 0114 0"/>
  </IconBaseDuo>
))
IconSunriseDuo.displayName = 'IconSunriseDuo'
