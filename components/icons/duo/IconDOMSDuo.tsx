// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDOMSDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="4" width="22" height="16" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M2 18h2c1 0 2 0 3-1s3-5 5-8 3-4 4-4 2 0 3 2 2 4 3 4"/><path d="M4 14v-2" opacity="0.4"/><path d="M10 6v-2" opacity="0.4"/><path d="M16 10v-2" opacity="0.4"/><circle cx="10" cy="5" r="1" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconDOMSDuo.displayName = 'IconDOMSDuo'
