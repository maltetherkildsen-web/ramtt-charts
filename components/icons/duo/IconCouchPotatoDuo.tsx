// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCouchPotatoDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M3 14h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z"/>
    </g>
    {/* Foreground */}
    <path d="M3 14h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z"/><path d="M5 14V10a2 2 0 012-2h10a2 2 0 012 2v4"/><circle cx="12" cy="5" r="2"/><path d="M9 14c0-1.5 1-2 3-2s3 .5 3 2"/>
  </IconBaseDuo>
))
IconCouchPotatoDuo.displayName = 'IconCouchPotatoDuo'
