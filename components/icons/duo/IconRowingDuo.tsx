// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconRowingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M2 21c4-1 8-1.5 12-1.5s8 .5 12 1.5v1H2v-1z"/>
    </g>
    {/* Foreground */}
    <path d="M4 18l3-4 4 2 5-4 4-8"/><path d="M2 21c4-1 8-1.5 12-1.5s8 .5 12 1.5"/><path d="M20 6l-4 8"/><circle cx="20" cy="5" r="1.5" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconRowingDuo.displayName = 'IconRowingDuo'
