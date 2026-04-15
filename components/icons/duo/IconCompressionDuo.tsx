// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCompressionDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="7" y="3" width="10" height="18" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="7" y="3" width="10" height="18" rx="2"/><path d="M3 8l3 1.5L3 11"/><path d="M3 13l3 1.5L3 16"/><path d="M21 8l-3 1.5L21 11"/><path d="M21 13l-3 1.5L21 16"/>
  </IconBaseDuo>
))
IconCompressionDuo.displayName = 'IconCompressionDuo'
