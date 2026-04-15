// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMountainFlagDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 21l5-7 3 4 4-9 4 12H4z"/>
    </g>
    {/* Foreground */}
    <path d="M4 21l5-7 3 4 4-9 4 12H4z"/><path d="M15 5v8"/><path d="M15 5l5 3-5 3"/>
  </IconBaseDuo>
))
IconMountainFlagDuo.displayName = 'IconMountainFlagDuo'
