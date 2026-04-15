// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconHikingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M3 21l5-8 4 3 4-10 5 15H3z"/>
    </g>
    {/* Foreground */}
    <path d="M3 21l5-8 4 3 4-10 5 15H3z"/><path d="M14 9l2-4"/><path d="M12 16l-4-3"/>
  </IconBaseDuo>
))
IconHikingDuo.displayName = 'IconHikingDuo'
