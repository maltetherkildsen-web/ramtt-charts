// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBananaDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M5 6c1-2 4-3 7-2s5 3 6 6c1 4 0 7-2 9-1 1-3 1-4 0-2-3-4-7-4-10 0-1-.5-2-1.5-2.5S6 5.5 5 6z"/>
    </g>
    {/* Foreground */}
    <path d="M5 6c1-2 4-3 7-2s5 3 6 6c1 4 0 7-2 9-1 1-3 1-4 0-2-3-4-7-4-10 0-1-.5-2-1.5-2.5S6 5.5 5 6z"/><path d="M12 4l1-2.5"/>
  </IconBaseDuo>
))
IconBananaDuo.displayName = 'IconBananaDuo'
