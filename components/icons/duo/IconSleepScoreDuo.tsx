// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSleepScoreDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z"/>
    </g>
    {/* Foreground */}
    <path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z"/><path d="M3 14h3v6H3z"/><path d="M7.5 12h3v8h-3z"/><path d="M12 16h3v4h-3z"/><path d="M16.5 10h3v10h-3z"/>
  </IconBaseDuo>
))
IconSleepScoreDuo.displayName = 'IconSleepScoreDuo'
