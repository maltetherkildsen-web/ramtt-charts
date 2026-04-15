// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconShameFridgeDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="5" y="2" width="14" height="20" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M5 10h14"/><path d="M16 6v2"/><path d="M16 13v4"/><path d="M11 5l1 1 1-1" opacity="0.4"/><path d="M11 7l1 1 1-1" opacity="0.4"/>
  </IconBaseDuo>
))
IconShameFridgeDuo.displayName = 'IconShameFridgeDuo'
