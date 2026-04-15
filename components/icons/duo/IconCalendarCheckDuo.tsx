// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCalendarCheckDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 10h16v9a2 2 0 01-2 2H6a2 2 0 01-2-2v-9z"/>
    </g>
    {/* Foreground */}
    <rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 2v3"/><path d="M16 2v3"/><path d="M4 10h16"/><path d="M9 15l2 2 4-4"/>
  </IconBaseDuo>
))
IconCalendarCheckDuo.displayName = 'IconCalendarCheckDuo'
