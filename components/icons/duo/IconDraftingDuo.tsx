// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconDraftingDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <ellipse cx="11" cy="12" rx="10" ry="6"/>
    </g>
    {/* Foreground */}
    <circle cx="7" cy="10" r="2"/><path d="M5 13c0 1 .5 2 2 2s2-1 2-2"/><circle cx="15" cy="10" r="2"/><path d="M13 13c0 1 .5 2 2 2s2-1 2-2"/><path d="M19 8h3"/><path d="M19 11h3"/><path d="M19 14h2"/>
  </IconBaseDuo>
))
IconDraftingDuo.displayName = 'IconDraftingDuo'
