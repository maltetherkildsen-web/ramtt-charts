// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTrophyDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M6 4h12v6a6 6 0 01-12 0V4z"/>
    </g>
    {/* Foreground */}
    <path d="M6 4h12v6a6 6 0 01-12 0V4z"/><path d="M6 7H4a2 2 0 00-2 2v1a3 3 0 003 3h1.1"/><path d="M18 7h2a2 2 0 012 2v1a3 3 0 01-3 3h-1.1"/><path d="M9 17h6"/><path d="M10 21h4"/><path d="M12 14v3"/>
  </IconBaseDuo>
))
IconTrophyDuo.displayName = 'IconTrophyDuo'
