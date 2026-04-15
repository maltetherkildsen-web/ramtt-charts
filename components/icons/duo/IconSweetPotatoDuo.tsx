// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSweetPotatoDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <ellipse cx="12" cy="12" rx="8" ry="5"/>
    </g>
    {/* Foreground */}
    <ellipse cx="12" cy="12" rx="8" ry="5"/><path d="M6 10c2 1 4 .5 5-1" opacity="0.3"/><path d="M13 14c2-.5 3-2 4-3" opacity="0.3"/><path d="M14 7c1-2 2-3 4-3"/>
  </IconBaseDuo>
))
IconSweetPotatoDuo.displayName = 'IconSweetPotatoDuo'
