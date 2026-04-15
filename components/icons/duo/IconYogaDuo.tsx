// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconYogaDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="4" r="2"/>
    </g>
    {/* Foreground */}
    <circle cx="12" cy="4" r="2"/><path d="M12 6v6"/><path d="M8 10l4 2 4-2"/><path d="M10 22l2-8 2 14"/><path d="M8 18h8"/>
  </IconBaseDuo>
))
IconYogaDuo.displayName = 'IconYogaDuo'
