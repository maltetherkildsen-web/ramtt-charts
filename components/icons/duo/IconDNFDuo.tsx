// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDNFDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="4" y="4" width="16" height="16"/>
    </g>
    {/* Foreground */}
    <path d="M4 4v16"/><path d="M20 4v16"/><path d="M4 8h6"/><path d="M14 10h6"/><path d="M10 8l2 1 2-1" strokeDasharray="1 1"/><path d="M9 12l1 .5"/><path d="M14 14l1-.5"/>
  </IconBaseDuo>
))
IconDNFDuo.displayName = 'IconDNFDuo'
