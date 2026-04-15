// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWaterBottleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M8 5h8l1 3v11a2 2 0 01-2 2H9a2 2 0 01-2-2V8l1-3z"/>
    </g>
    {/* Foreground */}
    <path d="M9 2h6v3H9V2z"/><path d="M8 5h8l1 3v11a2 2 0 01-2 2H9a2 2 0 01-2-2V8l1-3z"/><path d="M8 13h8"/><path d="M11.5 5v-1"/>
  </IconBaseDuo>
))
IconWaterBottleDuo.displayName = 'IconWaterBottleDuo'
