// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDeloadDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="4" y="5" width="12" height="12"/>
    </g>
    {/* Foreground */}
    <path d="M4 5h4v4H4z"/><path d="M8 9h4v4H8z"/><path d="M12 13h4v4h-4z"/><path d="M17 18l1.5 1.5L22 16"/>
  </IconBaseDuo>
))
IconDeloadDuo.displayName = 'IconDeloadDuo'
