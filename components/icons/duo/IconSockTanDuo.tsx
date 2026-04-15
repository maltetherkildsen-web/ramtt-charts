// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconSockTanDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="8" y="2" width="8" height="20" rx="1"/>
    </g>
    {/* Foreground */}
    <path d="M10 2v20"/><path d="M14 2v20"/><path d="M8 2h8"/><path d="M8 22c0-2 1-3 2-3h4c1 0 2 1 2 3"/><path d="M10 14h4" strokeWidth="2.5" opacity="0.3"/><path d="M8 14h8" strokeDasharray="1 2" opacity="0.4"/>
  </IconBaseDuo>
))
IconSockTanDuo.displayName = 'IconSockTanDuo'
