// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMilkDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M7 6l-1 2v12a2 2 0 002 2h8a2 2 0 002-2V8l-1-2H7z"/>
    </g>
    {/* Foreground */}
    <path d="M7 6V4h10v2"/><path d="M7 6l-1 2v12a2 2 0 002 2h8a2 2 0 002-2V8l-1-2H7z"/><path d="M7 12h10"/><path d="M10 4V2h4v2"/>
  </IconBaseDuo>
))
IconMilkDuo.displayName = 'IconMilkDuo'
