// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWatermelonDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M3 14a9 9 0 0118 0H3z"/>
    </g>
    {/* Foreground */}
    <path d="M3 14a9 9 0 0118 0H3z"/><path d="M3 14h18"/><circle cx="8" cy="11" r="0.75" fill="currentColor" stroke="none"/><circle cx="12" cy="9" r="0.75" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="0.75" fill="currentColor" stroke="none"/><circle cx="10" cy="12" r="0.75" fill="currentColor" stroke="none"/><circle cx="14" cy="12" r="0.75" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconWatermelonDuo.displayName = 'IconWatermelonDuo'
