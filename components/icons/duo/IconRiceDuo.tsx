// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRiceDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 12c0 4 3.5 7 8 7s8-3 8-7H4z"/>
    </g>
    {/* Foreground */}
    <path d="M4 12c0 4 3.5 7 8 7s8-3 8-7H4z"/><path d="M2 12h20"/><path d="M15 3l-3 9"/><path d="M17 3l-3 9"/>
  </IconBaseDuo>
))
IconRiceDuo.displayName = 'IconRiceDuo'
