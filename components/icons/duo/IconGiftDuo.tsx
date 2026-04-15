// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseDuo } from '../IconBaseDuo'
import type { IconDuoProps } from '../types'

export const IconGiftDuo = forwardRef<SVGSVGElement, IconDuoProps>((props, ref) => (
  <IconBaseDuo ref={ref} {...props}>
    {/* Background */}
    <g fill={props.accent || "currentColor"} stroke="none" opacity={0.15}>
      <rect x="3" y="10" width="18" height="10" rx="2"/>
    </g>
    {/* Foreground */}
    <rect x="3" y="10" width="18" height="10" rx="2"/><path d="M3 14h18"/><path d="M12 10v10"/><path d="M12 10c-2 0-4-1-4-3s2-3 4-3c-2 0-4-1-4-3" /><path d="M12 10c2 0 4-1 4-3s-2-3-4-3c2 0 4-1 4-3"/>
  </IconBaseDuo>
))
IconGiftDuo.displayName = 'IconGiftDuo'
