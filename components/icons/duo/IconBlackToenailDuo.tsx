// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconBlackToenailDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <path d="M4 16c0 2 2 4 6 4h4c4 0 6-2 6-4s-2-3-4-4-4-2-6-2-6 4-6 6z"/>
    </g>
    {/* Foreground */}
    <path d="M4 16c0 2 2 4 6 4h4c4 0 6-2 6-4s-2-3-4-4-4-2-6-2-6 4-6 6z"/><circle cx="8" cy="14" r="1.5"/><circle cx="11" cy="13" r="1.5"/><circle cx="14" cy="13" r="1.5" fill="currentColor" stroke="none"/><circle cx="17" cy="14" r="1.5"/><circle cx="12.5" cy="16" r="1"/>
  </IconBaseDuo>
))
IconBlackToenailDuo.displayName = 'IconBlackToenailDuo'
