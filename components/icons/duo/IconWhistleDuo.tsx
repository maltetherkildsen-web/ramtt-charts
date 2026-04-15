// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWhistleDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M3 5h6l2 3h7a3 3 0 010 6H11l-2 3H3a1 1 0 01-1-1V6a1 1 0 011-1z"/>
    </g>
    {/* Foreground */}
    <path d="M3 5h6l2 3h7a3 3 0 010 6H11l-2 3H3a1 1 0 01-1-1V6a1 1 0 011-1z"/><circle cx="15" cy="11" r="2"/><path d="M6 5v12"/>
  </IconBaseDuo>
))
IconWhistleDuo.displayName = 'IconWhistleDuo'
