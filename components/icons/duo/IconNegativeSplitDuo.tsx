// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconNegativeSplitDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="3" y="8" width="18" height="12"/>
    </g>
    {/* Foreground */}
    <path d="M3 20V8h3v12"/><path d="M8 20v-9h3v9"/><path d="M13 20v-6h3v6"/><path d="M18 20v-3h3v3"/><path d="M2 6l20 10" strokeDasharray="2 2" opacity="0.4"/>
  </IconBaseDuo>
))
IconNegativeSplitDuo.displayName = 'IconNegativeSplitDuo'
