// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconTanLinesDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M8 3h8l3 4v2h-3v11H8V9H5V7l3-4z"/>
    </g>
    {/* Foreground */}
    <path d="M8 3h8l3 4v2h-3v11H8V9H5V7l3-4z"/><path d="M8 9h8" strokeWidth="2" opacity="0.4"/><path d="M5 7h3v2H5z" opacity="0.3"/><path d="M16 7h3v2h-3z" opacity="0.3"/>
  </IconBaseDuo>
))
IconTanLinesDuo.displayName = 'IconTanLinesDuo'
