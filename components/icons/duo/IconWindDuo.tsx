// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconWindDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="1" y="6" width="18" height="14" rx="3"/>
    </g>
    {/* Foreground */}
    <path d="M2 12h12a3 3 0 100-3"/><path d="M2 8h8a3 3 0 110 3"/><path d="M2 16h10a3 3 0 110 3"/>
  </IconBaseDuo>
))
IconWindDuo.displayName = 'IconWindDuo'
