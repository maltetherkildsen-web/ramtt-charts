// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconOatsDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 10c0 5 3.5 8 8 8s8-3 8-8H4z"/>
    </g>
    {/* Foreground */}
    <path d="M4 10c0 5 3.5 8 8 8s8-3 8-8H4z"/><path d="M2 10h20"/><path d="M8 13c.5-.5 1-.5 1.5 0s1 .5 1.5 0"/><path d="M13 13c.5-.5 1-.5 1.5 0s1 .5 1.5 0"/><path d="M9 4l-1 3"/><path d="M12 3v4"/><path d="M15 4l1 3"/>
  </IconBaseDuo>
))
IconOatsDuo.displayName = 'IconOatsDuo'
