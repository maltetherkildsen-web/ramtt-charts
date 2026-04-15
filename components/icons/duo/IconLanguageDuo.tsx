// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconLanguageDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <circle cx="12" cy="12" r="10"/>
    </g>
    {/* Foreground */}
    <path d="M5 8l7 8"/><path d="M12 8l-7 8"/><path d="M2 8h16"/><path d="M3 12h10"/><path d="M14 4l3 8 3-8"/><path d="M15 8h4"/>
  </IconBaseDuo>
))
IconLanguageDuo.displayName = 'IconLanguageDuo'
