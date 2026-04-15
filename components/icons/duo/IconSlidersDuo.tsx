// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSlidersDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="3" y="2" width="18" height="20" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M4 5h6"/><path d="M14 5h6"/><circle cx="12" cy="5" r="2"/><path d="M4 12h2"/><path d="M10 12h10"/><circle cx="8" cy="12" r="2"/><path d="M4 19h10"/><path d="M18 19h2"/><circle cx="16" cy="19" r="2"/>
  </IconBaseDuo>
))
IconSlidersDuo.displayName = 'IconSlidersDuo'
