// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconCadenceOptimalDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 18a9 9 0 1116 0H4z"/>
    </g>
    {/* Foreground */}
    <path d="M4 18a9 9 0 1116 0"/><path d="M8.5 16.5a5 5 0 017 0" strokeWidth="2.5" opacity="0.3"/><path d="M12 12V8"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
  </IconBaseDuo>
))
IconCadenceOptimalDuo.displayName = 'IconCadenceOptimalDuo'
