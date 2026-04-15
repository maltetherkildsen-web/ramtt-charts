// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconMegaphoneDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M18 3v18l-8-6H4a1 1 0 01-1-1V10a1 1 0 011-1h6l8-6z"/>
    </g>
    {/* Foreground */}
    <path d="M18 3v18l-8-6H4a1 1 0 01-1-1V10a1 1 0 011-1h6l8-6z"/><path d="M18 9a4 4 0 010 6"/><path d="M6 15v4a1 1 0 001 1h2a1 1 0 001-1v-3"/>
  </IconBaseDuo>
))
IconMegaphoneDuo.displayName = 'IconMegaphoneDuo'
