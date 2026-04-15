// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGroundContactDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M7 14c0-2 1-4 3-5s4-1 5.5 0 2 3 2 5H7z"/>
    </g>
    {/* Foreground */}
    <path d="M7 14c0-2 1-4 3-5s4-1 5.5 0 2 3 2 5"/><path d="M5 16h14"/><path d="M8 16v2"/><path d="M16 16v2"/><path d="M10 20h4" strokeDasharray="1 1"/>
  </IconBaseDuo>
))
IconGroundContactDuo.displayName = 'IconGroundContactDuo'
