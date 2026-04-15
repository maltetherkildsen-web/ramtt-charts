// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconPacingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="8" width="22" height="8" rx="2"/>
    </g>
    {/* Foreground */}
    <path d="M2 12h20"/><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="10" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="20" cy="12" r="1.5" fill="currentColor" stroke="none"/><path d="M2 8h20" strokeDasharray="1 2" opacity="0.3"/><path d="M2 16h20" strokeDasharray="1 2" opacity="0.3"/>
  </IconBaseDuo>
))
IconPacingDuo.displayName = 'IconPacingDuo'
