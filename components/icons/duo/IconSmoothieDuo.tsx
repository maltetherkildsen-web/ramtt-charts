// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSmoothieDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M7 4h10l-1.5 16H8.5L7 4z"/>
    </g>
    {/* Foreground */}
    <path d="M7 4h10l-1.5 16H8.5L7 4z"/><path d="M5 4h14"/><path d="M15 4l2-3"/><path d="M10 8h4" opacity="0.3"/><circle cx="14" cy="4" r="1.5"/>
  </IconBaseDuo>
))
IconSmoothieDuo.displayName = 'IconSmoothieDuo'
