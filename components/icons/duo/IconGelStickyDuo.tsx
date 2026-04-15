// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGelStickyDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M6 7v5a6 6 0 006 6h-2a5 5 0 01-5-5v-2a1 1 0 012 0v1V7z"/>
    </g>
    {/* Foreground */}
    <path d="M8 12V6a1 1 0 012 0v5"/><path d="M10 10V5a1 1 0 012 0v5"/><path d="M12 10V6a1 1 0 012 0v5"/><path d="M14 11V8a1 1 0 012 0v6a6 6 0 01-6 6H9a5 5 0 01-5-5v-2a1 1 0 012 0v1"/><path d="M8 18l-.5 3" opacity="0.5"/><path d="M11 19v2.5" opacity="0.5"/><path d="M14 18l.5 2" opacity="0.5"/>
  </IconBaseDuo>
))
IconGelStickyDuo.displayName = 'IconGelStickyDuo'
