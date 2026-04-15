// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconStickPackDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="8" y="2" width="8" height="20" rx="1"/>
    </g>
    {/* Foreground */}
    <rect x="8" y="2" width="8" height="20" rx="1"/><path d="M8 6h8"/><path d="M6 6l2-1"/><path d="M8 18h8"/><path d="M11 10v4" opacity="0.3"/><path d="M13 9v5" opacity="0.3"/>
  </IconBaseDuo>
))
IconStickPackDuo.displayName = 'IconStickPackDuo'
