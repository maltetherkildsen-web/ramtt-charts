// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTaperDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="3" y="8" width="13" height="12"/>
    </g>
    {/* Foreground */}
    <path d="M3 6v14"/><path d="M3 8h4v4H3"/><path d="M7 10h3.5v4H7"/><path d="M10.5 12h3v4h-3"/><path d="M13.5 14h2.5v4h-2.5"/><path d="M19 10v10"/><path d="M19 10l3 2-3 2"/>
  </IconBaseDuo>
))
IconTaperDuo.displayName = 'IconTaperDuo'
