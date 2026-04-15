// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconUnicornDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M10 8c-3 0-5 2-5 5 0 2 1 4 3 5h5c2 0 4-1 5-3s1-4 0-6-3-3-5-3h-3z"/>
    </g>
    {/* Foreground */}
    <path d="M16 3l-2 5"/><path d="M10 8c-3 0-5 2-5 5 0 2 1 4 3 5h5c2 0 4-1 5-3s1-4 0-6-3-3-5-3h-3z"/><circle cx="10" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M8 16c1 1 2 1.5 3.5 1.5"/>
  </IconBaseDuo>
))
IconUnicornDuo.displayName = 'IconUnicornDuo'
