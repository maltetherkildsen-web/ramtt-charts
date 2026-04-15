// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconActiveRecoveryDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M10 6l1.5 1.5L13 6a1.5 1.5 0 012.12 0 1.5 1.5 0 010 2.12L11.5 11.5 8 8.12a1.5 1.5 0 010-2.12A1.5 1.5 0 0110 6z"/>
    </g>
    {/* Foreground */}
    <path d="M2 14c3-2 4-2 5 0s2 2 5 0 4-2 5 0 2 2 5 0"/><path d="M10 6l1.5 1.5L13 6a1.5 1.5 0 012.12 0 1.5 1.5 0 010 2.12L11.5 11.5 8 8.12a1.5 1.5 0 010-2.12A1.5 1.5 0 0110 6z"/>
  </IconBaseDuo>
))
IconActiveRecoveryDuo.displayName = 'IconActiveRecoveryDuo'
